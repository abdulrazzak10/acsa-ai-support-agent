export function chunkText(text: string, maxTokens: number = 500, overlap: number = 50): string[] {
  // Rough approximation: 1 token ~= 4 characters
  const chunkSize = maxTokens * 4;
  const overlapSize = overlap * 4;
  
  if (text.length <= chunkSize) return [text];
  
  const chunks: string[] = [];
  let startIndex = 0;
  
  while (startIndex < text.length) {
    const endIndex = Math.min(startIndex + chunkSize, text.length);
    let chunk = text.slice(startIndex, endIndex);
    
    // Try to break at a newline if possible and we're not at the very end
    if (endIndex < text.length) {
      const lastNewline = chunk.lastIndexOf('\n');
      if (lastNewline > chunkSize * 0.5) {
        chunk = chunk.slice(0, lastNewline);
        startIndex += lastNewline;
        continue;
      }
      const lastSpace = chunk.lastIndexOf(' ');
      if (lastSpace > chunkSize * 0.8) {
         chunk = chunk.slice(0, lastSpace);
         startIndex += lastSpace;
         continue;
      }
    }
    
    chunks.push(chunk);
    startIndex += (chunk.length - overlapSize);
    if (startIndex < 0) startIndex = endIndex; // Fallback
  }
  
  return chunks;
}
