import Link from 'next/link';
import { db } from '@/db';

export default async function Home() {
    const snippets = await db.snippet.findMany();

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-zinc-50">My Snippets</h1>
                <p className="text-zinc-400 text-sm mt-1">
                    {snippets.length} snippet{snippets.length !== 1 ? 's' : ''} saved
                </p>
            </div>

            {snippets.length === 0 ? (
                <div className="text-center py-24 text-zinc-600">
                    <p className="text-5xl mb-4">{'</>'}</p>
                    <p className="text-lg font-medium text-zinc-400">No snippets yet</p>
                    <p className="text-sm mt-1">Click &quot;+ New Snippet&quot; to get started.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    {snippets.map(snippet => (
                        <Link
                            key={snippet.id}
                            href={`/snippets/${snippet.id}`}
                            className="flex justify-between items-center p-4 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-600 hover:bg-zinc-800/70 transition-all group"
                        >
                            <span className="font-medium text-zinc-100 group-hover:text-white">
                                {snippet.title}
                            </span>
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-mono text-indigo-400 bg-indigo-950 border border-indigo-900 px-2 py-0.5 rounded">
                                    {snippet.language}
                                </span>
                                <span className="text-zinc-500 text-sm group-hover:text-zinc-300 transition-colors">
                                    View →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
