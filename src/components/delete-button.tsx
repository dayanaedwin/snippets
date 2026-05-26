'use client';

export default function DeleteButton({ action }: { action: () => Promise<void> }) {
    const handleClick = async () => {
        if (!confirm('Are you sure you want to delete this snippet?')) return;
        await action();
    };

    return (
        <button
            onClick={handleClick}
            className="px-3 py-1.5 text-sm border border-red-900 rounded-md text-red-400 hover:bg-red-950 transition-colors"
        >
            Delete
        </button>
    );
}
