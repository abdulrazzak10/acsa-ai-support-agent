"use client";

import { useChat } from '@ai-sdk/react';
import { useRef, useEffect } from 'react';
import { ChatMessage } from '@/components/ChatMessage';
import MetricsSidebar from '@/components/MetricsSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });
  
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar sidebar */}
      <div className="hidden md:flex flex-col w-[300px] border-r bg-muted/10 p-4 pt-6 space-y-6">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        <div className="flex-1">
           <MetricsSidebar messageCount={messages.length} />
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex flex-col flex-1 h-full max-w-4xl mx-auto w-full">
        <header className="flex items-center p-4 border-b md:hidden">
          <Link href="/" className="inline-flex items-center text-sm font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> 
            Back
          </Link>
        </header>

        <ScrollArea className="flex-1 p-4 sm:p-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 pt-20">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <Send className="w-8 h-8 text-primary opacity-80" />
              </div>
              <h2 className="text-2xl font-bold">How can I help you today?</h2>
              <p className="text-muted-foreground max-w-sm">
                Ask me anything about the company. I search the uploaded knowledge base to find your answers.
              </p>
            </div>
          ) : (
            <div className="space-y-4 pb-4">
              {messages.map(m => (
                <ChatMessage key={m.id} message={m} />
              ))}
              {isLoading && (
                 <div className="flex items-center text-sm text-muted-foreground animate-pulse p-4">
                    ACSA is thinking...
                 </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </ScrollArea>

        <div className="p-4 bg-background border-t">
          <form onSubmit={handleSubmit} className="flex gap-4 max-w-3xl mx-auto">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your question..."
              className="flex-1 rounded-full px-6"
            />
            <Button type="submit" size="icon" className="rounded-full shrink-0" disabled={isLoading || !input.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
