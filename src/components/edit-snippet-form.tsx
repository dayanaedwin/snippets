'use client';

import type { Snippet } from "@prisma/client";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import Link from "next/link";
import { editSnippet } from "@/actions";

const LANGUAGES = ['javascript', 'typescript', 'python', 'html', 'css', 'json', 'rust', 'go'];

interface EditSnippetFormProps {
    snippet: Snippet;
}

export default function EditSnippetForm({ snippet }: EditSnippetFormProps) {
    const [code, setCode] = useState(snippet.code);
    const [language, setLanguage] = useState(snippet.language);

    const editSnippetAction = editSnippet.bind(null, snippet.id, code, language);

    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link href={`/snippets/${snippet.id}`} className="text-zinc-400 hover:text-zinc-200 text-sm transition-colors">
                        ← Back
                    </Link>
                    <span className="text-zinc-700">|</span>
                    <h2 className="text-lg font-semibold text-zinc-50">{snippet.title}</h2>
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-sm text-zinc-400" htmlFor="language">Language</label>
                    <select
                        id="language"
                        value={language}
                        onChange={e => setLanguage(e.target.value)}
                        className="bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    >
                        {LANGUAGES.map(lang => (
                            <option key={lang} value={lang}>{lang}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-300">Code</label>
                <div className="rounded-md overflow-hidden border border-zinc-700">
                    <Editor
                        height="50vh"
                        theme="vs-dark"
                        language={language}
                        defaultValue={snippet.code}
                        options={{ minimap: { enabled: false }, fontSize: 14, padding: { top: 12 } }}
                        onChange={value => setCode(value ?? '')}
                    />
                </div>
            </div>

            <form action={editSnippetAction} className="flex justify-end">
                <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-5 py-2 rounded-md transition-colors"
                >
                    Save
                </button>
            </form>
        </div>
    );
}
