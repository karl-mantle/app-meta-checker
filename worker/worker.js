export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (
      request.method === "POST" &&
      new URL(request.url).pathname === "/api/meta"
    ) {
      return handleMetaRequest(request);
    }

    return new Response("Not found", { status: 404 });
  },
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://karl-mantle.github.io",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
};

async function handleMetaRequest(request) {
  const body = await request.json();
  const { url, username, password } = body;

  if (!url) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: corsHeaders,
    });
  }

  const headers = {};
  if (username && password) {
    headers["Authorization"] = "Basic " + btoa(`${username}:${password}`);
  }

  try {
    const res = await fetch(url, { headers });
    const html = await res.text();

    const metadata = {
      url,
      title: null,
      description: null,
      ogTitle: null,
      ogDescription: null,
      ogImage: null,
      ogImageBase64: null,
      twitterTitle: null,
      twitterDescription: null,
      twitterImage: null,
      twitterImageBase64: null,
      favicon: null,
    };

    const rewriter = new HTMLRewriter()
      .on("title", {
        text(text) {
          metadata.title = text.text;
        },
      })
      .on("meta", {
        element(el) {
          const name = el.getAttribute("name");
          const property = el.getAttribute("property");
          const content = el.getAttribute("content");

          if (!content) return;

          if (name === "description") metadata.description = content;
          if (property === "og:title") metadata.ogTitle = content;
          if (property === "og:description") metadata.ogDescription = content;
          if (property === "og:image") metadata.ogImage = content;
          if (name === "twitter:title") metadata.twitterTitle = content;
          if (name === "twitter:description")
            metadata.twitterDescription = content;
          if (name === "twitter:image") metadata.twitterImage = content;
        },
      })
      .on('link[rel="icon"]', {
        element(el) {
          metadata.favicon = el.getAttribute("href");
        },
      });

    await rewriter.transform(new Response(html)).text();

    if (metadata.ogImage) {
      metadata.ogImageBase64 = await fetchImageAsBase64(
        metadata.ogImage,
        headers
      );
    }

    if (metadata.twitterImage) {
      metadata.twitterImageBase64 = await fetchImageAsBase64(
        metadata.twitterImage,
        headers
      );
    }

    return new Response(JSON.stringify(metadata), {
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch meta data",
        details: err.message,
      }),
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}

async function fetchImageAsBase64(url, headers) {
  try {
    const response = await fetch(url, { headers });

    const arrayBuffer = await response.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);

    const binary = String.fromCharCode(...bytes);
    const base64 = btoa(binary);

    const contentType = response.headers.get("content-type") || "image/jpeg";

    return `data:${contentType};base64,${base64}`;
  } catch {
    return null;
  }
}
