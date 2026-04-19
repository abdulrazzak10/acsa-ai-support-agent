export function createMockStream(prompt: string, context: any[]) {
    const encoder = new TextEncoder();
    
    const stream = new ReadableStream({
        async start(controller) {
            const contextText = context.map(c => c.metadata.text).join('\n---\n');
            const intro = "Based on the provided knowledge base, here is the information:\n\n";
            
            let answer = "";
            if (contextText.length > 0) {
               answer = `I found some relevant details from the documents:\n\n> ${contextText.substring(0, 300)}...\n\nDoes this answer your question?`;
            } else {
               answer = "I couldn't find any specific information regarding your question in the uploaded knowledge base. Please try asking differently or upload more documents.";
            }

            const fullText = intro + answer;
            const words = fullText.split(' ');
            
            for (let i = 0; i < words.length; i++) {
                // Vercel AI SDK expects DataStream format (0 = text chunk)
                const chunk = `0:${JSON.stringify(words[i] + " ")}\n`;
                controller.enqueue(encoder.encode(chunk));
                await new Promise(resolve => setTimeout(resolve, 50)); 
            }
            
            controller.close();
        }
    });
    
    return new Response(stream, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'x-vercel-ai-data-stream': 'v1'
        }
    });
}
