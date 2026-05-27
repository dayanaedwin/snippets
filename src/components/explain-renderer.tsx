export default function ExplanationRenderer({ text }: { text: string }) {
    const lines = text.split('\n');

    return (
        <div className="space-y-1">
            {lines.map((line, i) => {
                if (!line.trim()) return <div key={i} className="h-2" />;

                // Section headings: **text**
                const headingMatch = line.match(/^\*\*(.+)\*\*$/);
                if (headingMatch) {
                    return (
                        <p key={i} className="text-indigo-400 font-mono font-semibold text-xs uppercase tracking-widest mt-5 mb-1">
                            {headingMatch[1]}
                        </p>
                    );
                }

                // Inline bold parts
                const parts = line.split(/\*\*(.*?)\*\*/g);
                const formatted = parts.map((part, j) =>
                    j % 2 === 1
                        ? <strong key={j} className="text-zinc-100 font-semibold">{part}</strong>
                        : part
                );

                // Bullet lines
                if (line.trimStart().startsWith('- ') || line.trimStart().startsWith('• ')) {
                    return (
                        <div key={i} className="flex gap-2 text-zinc-300 text-sm leading-relaxed pl-2">
                            <span className="text-indigo-400 mt-1">▸</span>
                            <span>{formatted.map((p, j) => <span key={j}>{p}</span>)}</span>
                        </div>
                    );
                }

                // Numbered lines
                if (/^\d+\./.test(line.trim())) {
                    return (
                        <div key={i} className="flex gap-3 text-zinc-300 text-sm leading-relaxed pl-2">
                            <span className="text-indigo-400 font-mono font-bold min-w-[1.2rem]">
                                {line.match(/^(\d+)\./)![1]}.
                            </span>
                            <span>{formatted.map((p, j) => <span key={j}>{p}</span>)}</span>
                        </div>
                    );
                }

                return (
                    <p key={i} className="text-zinc-300 text-sm leading-relaxed">
                        {formatted.map((p, j) => <span key={j}>{p}</span>)}
                    </p>
                );
            })}
        </div>
    );
}