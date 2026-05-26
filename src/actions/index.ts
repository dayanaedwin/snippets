'use server'; // this function needs to be server action

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editSnippet(id: number, code: string, language: string) {
    await db.snippet.update({
        where: { id },
        data: { code, language },
    });

    // Purges the Full Route Cache for this specific snippet page so the updated
    // code is fetched fresh on the next visit instead of serving stale cached HTML.
    revalidatePath(`/snippets/${id}`);
    redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
    await db.snippet.delete({
        where: { id },
    });

    // Purges the Full Route Cache for '/' so the deleted snippet no longer appears.
    revalidatePath('/');
    redirect('/');
}

// formState is required by useActionState — React passes the previous state as the first arg.
// The return type must match the initial state shape so the form can display errors.
export async function createSnippet(formState: { message: string }, formData: FormData): Promise<{ message: string }> {
    const title = formData.get('title') as string;
    const code = formData.get('code') as string;

    // Validate before hitting the DB; return the error message to the form via useActionState.
    if (!title || title.trim().length < 3) {
        return { message: 'Title must be at least 3 characters.' };
    }
    if (!code || code.trim().length === 0) {
        return { message: 'Code is required.' };
    }

    // DB errors are caught and surfaced as form messages instead of crashing.
    // redirect() is intentionally outside this block — it throws a NEXT_REDIRECT
    // error internally, and catching it would silently cancel the redirect.
    const language = (formData.get('language') as string) || 'javascript';

    try {
        await db.snippet.create({
            data: { title, code, language },
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return { message: err.message };
        }
        return { message: 'Something went wrong.' };
    }

    // Purges the Full Route Cache for '/' so the homepage re-fetches fresh data
    // on the next visit instead of serving the previously cached HTML.
    revalidatePath('/');
    redirect('/');
}