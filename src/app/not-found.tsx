import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
            <h2 className="text-2xl font-bold">Page Not Found</h2>
            <p className="text-gray-500">Could not find the requested resource.</p>
            <Link href="/" className="p-2 border rounded">Go Home</Link>
        </div>
    );
}
