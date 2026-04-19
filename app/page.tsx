import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Bot, FileText, BarChart3, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Bot className="w-6 h-6 text-primary" />
            <span>ACSA</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/admin" className="text-sm font-medium hover:text-primary transition-colors">
              Admin Upload
            </Link>
            <Link href="/chat">
              <Button>Try Demo</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-24 space-y-8 flex flex-col items-center text-center container mx-auto px-4">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
            Powered by RAG & Pinecone
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl">
            AI Customer Support Agent <br/>
            <span className="text-muted-foreground">Automate Your Helpdesk</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Instantly resolve customer queries using your own company knowledge base. Upload documents and let the AI handle the rest.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/chat">
              <Button size="lg" className="h-12 px-8">
                Open Chat Demo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/admin">
              <Button variant="outline" size="lg" className="h-12 px-8">
                Upload Knowledge
              </Button>
            </Link>
          </div>
        </section>

        <section className="container mx-auto px-4 py-24 grid md:grid-cols-3 gap-12 border-t">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Vector Knowledge Base</h3>
            <p className="text-muted-foreground">
              Upload PDFs and Markdown files. ACSA automatically chunks, embeds, and stores them in Pinecone for semantic search.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">GPT-4o-mini Integration</h3>
            <p className="text-muted-foreground">
              Fast, cost-effective, and highly capable streaming responses using the latest OpenAI models in the Vercel AI SDK.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Live Metrics</h3>
            <p className="text-muted-foreground">
              Monitor customer questions and knowledge base statistics in real-time from the dashboard.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        Built by Abdul Razzak Ghouri &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
