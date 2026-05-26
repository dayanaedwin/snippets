import Link from 'next/link';
import { notFound } from "next/navigation";
import { db } from "@/db";
import { deleteSnippet } from '@/actions';
import CopyButton from '@/components/copy-button';
import DeleteButton from '@/components/delete-button';

interface SnippetShowPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
    const { id } = await props.params;

    const snippet = await db.snippet.findFirst({
        where: { id: parseInt(id) },
    });

    if (!snippet) {
        return notFound(); //if we call notFound function, next will look for closest not-found.tsx page and display the same.
    }

    const deleteSnippetAction = deleteSnippet.bind(null, snippet.id);

    return (
        <div>
            <Link href="/" className="text-zinc-400 hover:text-zinc-200 text-sm transition-colors mb-6 inline-flex items-center gap-1">
                ← Back to snippets
            </Link>

            <div className="flex justify-between items-start mt-4 mb-5">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-zinc-50">{snippet.title}</h1>
                    <span className="text-xs font-mono text-indigo-400 bg-indigo-950 border border-indigo-900 px-2 py-0.5 rounded">
                        {snippet.language}
                    </span>
                </div>
                <div className="flex gap-2">
                    <CopyButton code={snippet.code} />
                    <Link
                        href={`/snippets/${snippet.id}/edit`}
                        className="px-3 py-1.5 text-sm border border-zinc-700 rounded-md text-zinc-300 hover:bg-zinc-800 transition-colors"
                    >
                        Edit
                    </Link>
                    <DeleteButton action={deleteSnippetAction} />
                </div>
            </div>

            <pre className="p-5 rounded-lg bg-zinc-900 border border-zinc-800 overflow-x-auto text-sm text-zinc-300 font-mono leading-relaxed">
                <code>{snippet.code}</code>
            </pre>
        </div>
    );
}

// Tells Next.js which [id] values to pre-render at build time as static pages.
// Without this, dynamic routes are rendered on-demand (SSR) for every request.
// The returned array of params causes Next.js to generate one static HTML file
// per snippet, enabling the Full Route Cache for each page.
export async function generateStaticParams() {
    const snippets = await db.snippet.findMany();

    // id must be a string — Next.js route params are always strings.
    return snippets.map(snippet => ({ id: snippet.id.toString() }));
}
