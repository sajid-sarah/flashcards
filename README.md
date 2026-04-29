# Flashcard Generator ✨

Paste your study notes, get 3 flashcards instantly. Powered by Groq.

**Live demo:** [https://flashcards-tau-pied.vercel.app/]

## Tech stack

- React + TypeScript (Vite)
- Vercel Serverless Functions
- Groq API (OpenAI-compatible)

## Running locally

Requires the [Vercel CLI](https://vercel.com/docs/cli) — `npm run dev` will not serve the API.

```bash
npm install
vercel dev
```

### Environment variables

Create a `.env.local` file at the project root:

```
GROQ_API_KEY=your_groq_api_key_here
```

Get a free API key at [console.groq.com](https://console.groq.com).

## API

`POST /api/flashcards`

**Request**
```json
{ "prompt": "Your study notes here" }
```

**Response**
```json
{
  "flashcards": [
    { "question": "...", "answer": "..." },
    { "question": "...", "answer": "..." },
    { "question": "...", "answer": "..." }
  ]
}
```

API keys are kept server-side only and never exposed to the client.
