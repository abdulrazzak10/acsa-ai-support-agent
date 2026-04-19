export type Vector = {
  id: string;
  values: number[]; // Normally embeddings, mocked here as empty arrays
  metadata: {
    text: string;
    source: string;
  };
};

// In-memory store
export const mockIndex: Vector[] = [];

export async function mockUpsert(vectors: Vector[]) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  mockIndex.push(...vectors);
}

export async function mockQuery(queryText: string) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  // Simple substring/keyword match instead of vector embedding cosine similarity
  const terms = queryText.toLowerCase().split(' ').filter(t => t.length > 3);
  
  const scored = mockIndex.map(vec => {
    let score = 0;
    const text = vec.metadata.text.toLowerCase();
    
    // Exact phrase match bonus
    if (text.includes(queryText.toLowerCase())) score += 10;
    
    for (const term of terms) {
        if (text.includes(term)) score += 1;
    }
    return { ...vec, score };
  });
  
  scored.sort((a,b) => b.score - a.score);
  return scored.slice(0, 3).map(match => ({
    metadata: match.metadata,
    score: match.score || 0.5
  }));
}

export function getStats() {
  return {
    namespaces: {
      '': {
        vectorCount: mockIndex.length
      }
    },
    dimension: 1536,
    indexFullness: 0
  };
}
