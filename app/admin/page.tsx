import FileUploader from '@/components/FileUploader';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="min-h-screen p-8 bg-muted/20">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Upload company knowledge base documents to populate the Pinecone vector index.
          </p>
        </div>
        
        <FileUploader />
        
        <div className="mt-12 p-6 bg-background rounded-lg border text-sm">
          <h3 className="font-bold mb-2">How it works:</h3>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Select a document (.pdf, .txt, .md).</li>
            <li>The server parses the text content.</li>
            <li>Text is chunked into 500-token chunks with 50-token overlap.</li>
            <li>Chunks are embedded (mocked locally) and upserted into the vector store.</li>
            <li>Once uploaded, the Chat Agent instantly has access to this data.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
