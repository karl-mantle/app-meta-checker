# app-meta-checker

A tool to **fetch, inspect, and preview website metadata** (Open Graph, Twitter Cards, favicon, and standard HTML metadata). Useful for SEO checks and social media preview testing.

## Features

- Fetch and normalize metadata from any URL.
- Preview tabs:
  - **Data** (technical metadata table)
  - **Facebook**
  - **Outlook**
  - **Teams**
  - **WhatsApp**
- Inline Base64 previews for OG and Twitter images.
- Detect missing metadata and provide fallbacks.
- Supports Basic Auth for protected pages.
- Two backend options:
  - **Node.js server** (local or self-hosted)
  - **Cloudflare Worker** (lightweight, GitHub Pages-friendly)

## Architecture

```

frontend/ # React app with preview tabs
backend/ # Node.js server
worker/ # Cloudflare Worker

```

- **Frontend:** React, handles user input, fetches metadata, renders preview tabs.
- **Cloudflare Worker:** \`/api/meta\` POST endpoint; parses HTML using \`HTMLRewriter\`, Base64 image conversion, optional Basic Auth.
- **Node.js backend:** \`/api/meta\` POST endpoint; parses HTML using \`cheerio\`, Base64 image conversion, optional Basic Auth.
- **GitHub Pages frontend:** Points to Cloudflare Worker for API requests.

## Installation

### Frontend

```bash
cd frontend
npm install
npm run dev
```

- By default, the frontend points to the Cloudflare Worker (\`/api/meta\`) for API requests. You'll need to update the fetch request to your own server, as it will be blocked by the Worker's CORS policy.

### Node.js Backend

```bash
cd backend
npm install
npm start
```

- Sends POST requests to \`/api/meta\` with JSON body:

```json
{
  "url": "https://example.com",
  "username": "optional",
  "password": "optional"
}
```

- Returns metadata JSON:

```json
{
  "title": "...",
  "description": "...",
  "ogTitle": "...",
  "ogDescription": "...",
  "ogImage": "...",
  "ogImageBase64": "...",
  "twitterTitle": "...",
  "twitterDescription": "...",
  "twitterImage": "...",
  "twitterImageBase64": "...",
  "favicon": "..."
}
```

### Cloudflare Worker

1. Configure \`wrangler.toml\`.
2. Deploy:

```bash
npx wrangler publish
```

- Worker exposes \`/api/meta\` for POST requests.
- Update CORS headers.

## Usage

1. Open the frontend (local dev or GitHub Pages).
2. Enter a URL and optional Basic Auth credentials.
3. Click **Fetch Meta Tags**.
4. View results in tabs:
   - **Data:** Technical metadata table with normalized values.
   - **Facebook / Outlook / Teams / WhatsApp:** Previews using fetched metadata.

## Folder Structure

```
frontend/
  └─ src/
      └─ App.jsx          # Main React frontend
backend/
  └─ index.js             # Node.js backend server
worker/
  ├─ worker.js            # Cloudflare Worker API
  └─ wrangler.toml        # Cloudflare configuration
```

## Example POST Request

```bash
curl -X POST https://your-worker-url/api/meta \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'
```

- Returns JSON metadata with normalized values and Base64 images.
