'use client'; // error.tsx MUST BE a client component

interface ErrorPageProps {
    error: Error,
    reset: () => void; //allows automatically refresh the route
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
    return (
        <div className="">{error.message}</div>
    );
}