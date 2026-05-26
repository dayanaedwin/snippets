'use client';

import { useActionState, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { createSnippet } from '@/actions';

const LANGUAGES = ['javascript', 'typescript', 'python', 'html', 'css', 'json', 'rust', 'go'];

export default function SnippetCreatePage() {
    const [formState, action] = useActionState(createSnippet, { message: '' });
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('javascript');

    return (
        <form action={action}>
            <h3 className="font-bold m-3">Create a Snippet</h3>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                    <label className="w-20" htmlFor="title">Title</label>
                    <input name="title" className="border rounded p-2 w-full" id="title" />
                </div>

                <div className="flex gap-4 items-center">
                    <label className="w-20" htmlFor="language">Language</label>
                    <select
                        name="language"
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

                {/* Hidden input carries the Monaco editor value into the form submission */}
                <input type="hidden" name="code" value={code} />
                <Editor
                    height="40vh"
                    theme="vs-dark"
                    language={language}
                    options={{ minimap: { enabled: false } }}
                    onChange={value => setCode(value ?? '')}
                />

                {formState.message && (
                    <div className="my-2 p-2 bg-red-200 border rounded border-red-400">
                        {formState.message}
                    </div>
                )}

                <button type="submit" className="rounded p-2 bg-blue-200">
                    Create
                </button>
            </div>
        </form>
    );
}
