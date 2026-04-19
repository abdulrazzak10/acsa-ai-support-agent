"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UploadCloud, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first.');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || 'File uploaded successfully!');
        setFile(null);
      } else {
        toast.error(data.error || 'Upload failed');
      }
    } catch (err) {
      toast.error('An error occurred during upload.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardContent className="pt-6">
        <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center space-y-4 transition-colors hover:border-primary/50">
          <UploadCloud className="w-12 h-12 text-muted-foreground" />
          <div className="text-center">
            <p className="text-sm font-medium">Click to upload or drag and drop</p>
            <p className="text-xs text-muted-foreground mt-1">
              Supports .pdf, .txt, .md
            </p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            id="file-upload"
            accept=".pdf,.txt,.md"
            onChange={(e) => {
              if (e.target.files?.[0]) setFile(e.target.files[0]);
            }}
          />
          <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
            Select File
          </Button>
          {file && (
            <p className="text-sm font-semibold truncate max-w-full text-primary">
              Selected: {file.name}
            </p>
          )}
        </div>
        
        <Button 
          className="w-full mt-6" 
          onClick={handleUpload}
          disabled={!file || isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
             'Upload & Embed to Knowledge Base'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
