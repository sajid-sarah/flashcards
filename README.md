# Flashcard Generator ✨

A simple flashcard generator that turns short notes into study-ready flashcards using a Large Language Model (LLM).

Built with React + TypeScript (Vite), deployed on Vercel, powered by a free LLM (Groq).

## Features

- Generate flashcards from plain text notes
- Always returns exactly 3 flashcards
- Structured JSON output (no fragile text parsing)
- Clean, swipeable flashcard UI
- Fast serverless backend

## Getting Started

### 1. Install dependencies
`npm install`

### 2. Set environment variables
Create a .env.local file at the project root:

GROQ_API_KEY=your_groq_api_key_here

### 3. Run locally with Vercel
`vercel dev`

## Tech Stack

Frontend: React, TypeScript, Vite

Backend: Vercel Serverless Functions

LLM Provider: Groq (OpenAI-compatible API)

Deployment: Vercel

## Notes

- API keys are server-side only
- No client-side parsing required
- Easy to swap LLM providers later

## API
POST /api/flashcards

```
Request body
{
  "prompt": "Your study notes here"
}

Response
{
  "flashcards": [
    { "question": "...", "answer": "..." },
    { "question": "...", "answer": "..." },
    { "question": "...", "answer": "..." }
  ]
}
