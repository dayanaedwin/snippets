import Link from 'next/link';
import { notFound } from "next/navigation";
import { db } from "@/db";
import EditSnippetForm from "@/components/edit-snippet-form";

interface EditSnippetPageProps {
    params: Promise<{
        id: string;
    }>
}

export default async function EditSnippetPage(props: EditSnippetPageProps) {
    const { id } = await props.params;
    const snippetId = parseInt(id);

    const snippet = await db.snippet.findFirst({
        where: { id: snippetId },
    });

    if (!snippet) return notFound();

    return (
        <div className="">
            <div className="flex items-center gap-3 m-3">
                <h2 className="text-xl font-bold">Edit Snippet</h2>
                <Link href={`/snippets/${snippetId}`} className="p-2 border rounded text-sm">Back</Link>
            </div>
            <EditSnippetForm snippet={snippet} />
        </div>
    )
}