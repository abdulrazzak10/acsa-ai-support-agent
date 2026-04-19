# AI Customer Support Agent (ACSA)

This is a complete, working, full-stack web application designed to serve as a customer support agent. It uses a RAG (Retrieval-Augmented Generation) approach to answer user questions against an uploaded knowledge base.

*Note: This specific deployment uses local memory Mock stores since API keys were not available, but the architecture reflects a scalable design.*

## Problem / Solution
**Problem:** Companies have extensive knowledge bases, but customers still struggle to find answers or contact support waitlists for simple questions.
**Solution:** ACSA provides a clean, modern, and instant conversational AI interface. You simply upload documents (.pdf, .txt, .md), and the system automatically chunks and indexes the content, enabling a fast and responsive helpdesk experience.

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Pinecone (Configured via mock layer for offline/free use)
- OpenAI GPT-4o-mini & Embeddings (Configured via Vercel AI SDK mock layers for offline/free use)

## Features
- **Admin Dashboard:** Drag-and-drop or select file uploads handling PDFs, text, and markdown files.
- **RAG Pipeline:** Intelligent chunking of documents (500 tokens / 50 overlap) and semantic retrieval.
- **Chat Interface:** Polished, responsive conversational UI with chat history streaming.
- **Live Metrics Setup:** Sidebar displaying the total knowledge base components loaded.
- **Dark Mode:** Beautiful deep dark UI tailored for a modern SaaS feel.

## Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/abdulrazzak10/acsa-ai-support-agent.git
   cd acsa-ai-support-agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

## Deployment
This project is configured out-of-the-box for [Vercel](https://vercel.com).
1. Push your code to your GitHub repo.
2. Go to Vercel, click "Add New Project", and select this repository.
3. Vercel will automatically build and deploy it globally.

## Live Demo
[Live Demo Link (Update upon deployment)]

## Author
Built by Abdul Razzak Ghouri
