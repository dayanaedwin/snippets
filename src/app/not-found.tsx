import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-64 gap-3">
            <p className="text-6xl font-bold text-zinc-700">404</p>
            <h2 className="text-xl font-semibold text-zinc-300">Page not found</h2>
            <p className="text-zinc-500 text-sm">The page you&apos;re looking for doesn&apos;t exist.</p>
            <Link
                href="/"
                className="mt-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
            >
                Go Home
            </Link>
        </div>
    );
}
