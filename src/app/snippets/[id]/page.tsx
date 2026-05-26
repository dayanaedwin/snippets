import Link from 'next/link';
import { notFound } from "next/navigation";
import { db } from "@/db";
import { deleteSnippet } from '@/actions';

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
        <div className="">
            <div className="flex m-4 justify-between items-center">
                <h1 className="text-xl font-bold">{snippet.title}</h1>
                <div className="flex gap-4">
                    <Link href={`/snippets/${snippet.id}/edit`} className="p-2 border rounded">Edit</Link>
                    <form action={deleteSnippetAction}>
                        <button className="p-2 border rounded">Delete</button>
                    </form>
                </div>
            </div>
            <pre className="p-3 border rounded bg-gray-200 border-gray-200">
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