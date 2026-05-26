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
        <button onClick={handleCopy} className="p-2 border rounded text-sm">
            {copied ? 'Copied!' : 'Copy'}
        </button>
    );
}
