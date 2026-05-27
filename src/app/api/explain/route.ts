import OpenAI from 'openai';

const groq = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: 'https://api.groq.com/openai/v1',
});

export async function POST(request: Request) {
    try {
        const { code, language } = await request.json();

        if (!code || code.trim() === '') {
            return Response.json({ error: 'No code provided' }, { status: 400 });
        }

        const stream = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            max_tokens: 1024,
            stream: true,
            messages: [
                {
                    role: 'system',
                    content: `You are a helpful coding tutor who explains ${language} code clearly. Always structure your response with these exact sections:\n\n**What it does**\n(1-2 sentence overview)\n\n**How it works**\n(numbered step-by-step breakdown)\n\n**Key concepts**\n(bullet list of ${language} concepts used)\n\nKeep it beginner-friendly but technically accurate.`,
                },
                {
                    role: 'user',
                    content: `Explain this ${language} code:\n\`\`\`${language}\n${code}\n\`\`\``,
                },
            ],
        });

        const encoder = new TextEncoder();

        // ReadableStream pushes each token to the client as it arrives
        // instead of waiting for the full response.
        const readable = new ReadableStream({
            async start(controller) {
                for await (const chunk of stream) {
                    const text = chunk.choices[0]?.delta?.content || '';
                    if (text) controller.enqueue(encoder.encode(text));
                }
                controller.close();
            },
        });

        return new Response(readable, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Transfer-Encoding': 'chunked',
            },
        });
    } catch (error) {
        return Response.json(
            { error: 'API error: ' + (error instanceof Error ? error.message : 'Unknown error') },
            { status: 500 }
        );
    }
}
