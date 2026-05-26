'use client';

export default function DeleteButton({ action }: { action: () => Promise<void> }) {
    const handleClick = async () => {
        if (!confirm('Are you sure you want to delete this snippet?')) return;
        await action();
    };

    return (
        <button onClick={handleClick} className="p-2 border rounded">
            Delete
        </button>
    );
}
