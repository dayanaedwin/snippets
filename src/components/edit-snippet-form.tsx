'use client';

import type { Snippet } from "@prisma/client";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
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
        <div className="">
            <div className="flex gap-4 items-center m-3">
                <label htmlFor="language">Language</label>
                <select
                    id="language"
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
                    className="border rounded p-2"
                >
                    {LANGUAGES.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                    ))}
                </select>
            </div>
            <Editor
                height="40vh"
                theme="vs-dark"
                language={language}
                defaultValue={snippet.code}
                options={{ minimap: { enabled: false } }}
                onChange={value => setCode(value ?? '')}
            />
            <form action={editSnippetAction}>
                <button type="submit" className="p-2 border rounded m-3">
                    Save
                </button>
            </form>
        </div>
    );
}
