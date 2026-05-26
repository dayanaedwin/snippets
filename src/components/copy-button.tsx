'use client';

import { useState } from 'react';

export default function CopyButton({ code }: { code: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="px-3 py-1.5 text-sm border border-zinc-700 rounded-md text-zinc-300 hover:bg-zinc-800 transition-colors min-w-[72px]"
        >
            {copied ? '✓ Copied' : 'Copy'}
        </button>
    );
}
