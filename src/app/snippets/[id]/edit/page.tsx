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
            <EditSnippetForm snippet={snippet} />
        </div>
    )
}