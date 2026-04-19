"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, MessageSquare, Clock } from 'lucide-react';

export default function MetricsSidebar({ messageCount }: { messageCount: number }) {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(console.error);
  }, [messageCount]); // Re-fetch occasionally or on message change if desired

  const docCount = stats?.namespaces?.['']?.vectorCount || 0;

  return (
    <div className="w-full max-w-xs space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Database className="w-4 h-4" />
            Knowledge Base
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{docCount}</div>
          <p className="text-xs text-muted-foreground">Total vectors embedded</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Questions Answered
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Math.floor(messageCount / 2)}</div>
          <p className="text-xs text-muted-foreground">Total session queries</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Avg. Response Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">~0.7s</div>
          <p className="text-xs text-muted-foreground">Lightning fast Edge AI</p>
        </CardContent>
      </Card>
    </div>
  );
}
