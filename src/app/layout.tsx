import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
// @ts-ignore: side-effect CSS import declaration not present in this project setup
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'ClipCode',
    description: 'Save and manage your code snippets',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-zinc-950 text-zinc-50 min-h-screen`} suppressHydrationWarning>
                <header className="border-b border-zinc-800 bg-zinc-900">
                    <div className="container mx-auto px-6 h-14 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                            <span className="text-indigo-400 font-mono text-xl">&lt;/&gt;</span>
                            ClipCode
                        </Link>
                        <Link
                            href="/snippets/new"
                            className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-3 py-1.5 rounded-md transition-colors"
                        >
                            + New Snippet
                        </Link>
                    </div>
                </header>
                <main className="container mx-auto px-6 py-8">{children}</main>
            </body>
        </html>
    );
}
