import { mockQuery } from '@/lib/mockPinecone';
import { createMockStream } from '@/lib/mockOpenAI';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const latestMessage = messages[messages.length - 1];
    
    // Simulate query process combining RAG
    const relevantChunks = await mockQuery(latestMessage.content);
    
    // Convert to custom stream 
    return createMockStream(latestMessage.content, relevantChunks);
  } catch (err: any) {
    console.error('Chat error', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
