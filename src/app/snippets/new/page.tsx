'use client';

import { useActionState, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import Link from 'next/link';
import { createSnippet } from '@/actions';

const LANGUAGES = ['javascript', 'typescript', 'python', 'html', 'css', 'json', 'rust', 'go'];

export default function SnippetCreatePage() {
    const [formState, action] = useActionState(createSnippet, { message: '' });
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('javascript');

    return (
        <div>
            <div className="flex items-center gap-3 mb-8">
                <Link href="/" className="text-zinc-400 hover:text-zinc-200 text-sm transition-colors">
                    ← Back
                </Link>
                <span className="text-zinc-700">|</span>
                <h1 className="text-xl font-bold text-zinc-50">New Snippet</h1>
            </div>

            <form action={action} className="flex flex-col gap-5 max-w-3xl">
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-zinc-300" htmlFor="title">
                        Title
                    </label>
                    <input
                        name="title"
                        id="title"
                        className="bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2.5 text-zinc-50 placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder="e.g. Debounce hook"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-zinc-300" htmlFor="language">
                        Language
                    </label>
                    <select
                        name="language"
                        id="language"
                        value={language}
                        onChange={e => setLanguage(e.target.value)}
                        className="bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2.5 text-zinc-50 focus:outline-none focus:border-indigo-500 transition-colors w-48"
                    >
                        {LANGUAGES.map(lang => (
                            <option key={lang} value={lang}>{lang}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-zinc-300">Code</label>
                    {/* Hidden input carries the Monaco editor value into the form submission */}
                    <input type="hidden" name="code" value={code} />
                    <div className="rounded-md overflow-hidden border border-zinc-700">
                        <Editor
                            height="40vh"
                            theme="vs-dark"
                            language={language}
                            options={{ minimap: { enabled: false }, fontSize: 14, padding: { top: 12 } }}
                            onChange={value => setCode(value ?? '')}
                        />
                    </div>
                </div>

                {formState.message && (
                    <div className="p-3 bg-red-950 border border-red-800 rounded-md text-red-400 text-sm">
                        {formState.message}
                    </div>
                )}

                <button
                    type="submit"
                    className="w-fit bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-5 py-2 rounded-md transition-colors"
                >
                    Create Snippet
                </button>
            </form>
        </div>
    );
}
