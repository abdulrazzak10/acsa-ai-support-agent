import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Message } from '@ai-sdk/react';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={cn("flex w-full items-start gap-4 py-4 border-b border-border/50", isUser ? "bg-background" : "bg-muted/30")}>
      <div className={cn("flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow", isUser ? "bg-background" : "bg-primary text-primary-foreground")}>
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div className="flex-1 space-y-2 overflow-hidden px-1">
        <div className="prose prose-sm dark:prose-invert max-w-none break-words">
          {message.content.split('\n').map((line, i) => (
             <span key={i}>
                {line}
                <br/>
             </span>
          ))}
        </div>
      </div>
    </div>
  );
}
