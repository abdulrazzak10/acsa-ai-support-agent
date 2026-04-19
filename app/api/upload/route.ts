import { NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';
import { v4 as uuidv4 } from 'uuid';
import { chunkText } from '@/lib/chunker';
import { mockUpsert, Vector } from '@/lib/mockPinecone';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    
    let text = '';
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (file.type === 'application/pdf') {
      const data = await pdfParse(buffer);
      text = data.text;
    } else {
      text = buffer.toString('utf-8');
    }
    
    // Chunking
    const chunks = chunkText(text, 500, 50);
    
    // Create mock vectors
    const vectors: Vector[] = chunks.map((chunk, i) => ({
      id: `${file.name}-${uuidv4()}-${i}`,
      values: [], // Mock embedding
      metadata: {
        text: chunk,
        source: file.name
      }
    }));
    
    // Upsert
    await mockUpsert(vectors);
    
    return NextResponse.json({ 
       success: true, 
       message: `Processed ${file.name}: ${chunks.length} chunks added.`
    });
    
  } catch (err: any) {
    console.error('Upload error', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
