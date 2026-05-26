import { codeToHtml } from 'shiki';

interface CodeBlockProps {
    code: string;
    language: string;
}

export default async function CodeBlock({ code, language }: CodeBlockProps) {
    const html = await codeToHtml(code, {
        lang: language,
        theme: 'github-dark',
    });

    return (
        <div
            className="rounded-lg overflow-x-auto border border-zinc-800 text-sm [&>pre]:p-5 [&>pre]:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
