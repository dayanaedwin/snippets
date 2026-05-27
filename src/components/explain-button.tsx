'use client';

import { useState } from 'react';
import ExplanationRenderer from './explain-renderer';

export default function ExplainButton({ code, language }: { code: string; language: string }) {
    const [explanation, setExplanation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleExplain = async () => {
        setLoading(true);
        setError('');
        setExplanation('');

        try {
            const res = await fetch('/api/explain', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, language }),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.error || 'Something went wrong.');
                return;
            }

            // Read the streamed response chunk by chunk and append to state,
            // creating a live typing effect as tokens arrive.
            const reader = res.body!.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const text = decoder.decode(value, { stream: true });
                setExplanation(prev => prev + text);
            }
        } catch {
            setError('Network error. Is the dev server running?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-4">
            <div className="flex justify-end">
            <button
                onClick={handleExplain}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-md transition-colors"
            >
                {loading ? (
                    <>
                        <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                            <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        Analyzing...
                    </>
                ) : (
                    '✦ Explain this code'
                )}
            </button>
            </div>

            {error && (
                <div className="mt-3 p-3 bg-red-950 border border-red-800 rounded-md text-red-400 text-sm">
                    {error}
                </div>
            )}

            {explanation && (
                <div className="mt-4 rounded-lg border border-indigo-900/50 bg-indigo-950/20 overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-indigo-900/40 text-xs text-indigo-400 uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block animate-pulse" />
                        Explanation
                    </div>
                    <div className="p-5">
                        <ExplanationRenderer text={explanation} />
                        {loading && (
                            <span className="inline-block w-2 h-4 bg-indigo-400 ml-1 align-middle animate-pulse" />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
