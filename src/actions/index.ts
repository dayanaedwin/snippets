'use server'; // this function needs to be server action

import { db } from "@/db";
import { redirect } from "next/navigation";

export async function editSnippet(id: number, code: string) {
    await db.snippet.update({
        where: { id },
        data: { code },
    });

    redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
    await db.snippet.delete({
        where: { id },
    });

    redirect('/');
}

export async function createSnippet(formState: { message: string }, formData: FormData): Promise<{ message: string }> {
    const title = formData.get('title') as string;
    const code = formData.get('code') as string;

    if (!title || title.trim().length < 3) {
        return { message: 'Title must be at least 3 characters.' };
    }
    if (!code || code.trim().length === 0) {
        return { message: 'Code is required.' };
    }

    try {
        await db.snippet.create({
            data: { title, code },
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return { message: err.message };
        }
        return { message: 'Something went wrong.' };
    }

    redirect('/');
}