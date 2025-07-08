const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const app = express();

async function fetchImageAsBase64(url, username, password) {
  const headers = {};
  if (username && password) {
    headers.Authorization = "Basic " + Buffer.from(`${username}:${password}`).toString("base64");
  }

  const response = await axios.get(url, {
    headers,
    responseType: "arraybuffer",
  });

  const contentType = response.headers["content-type"] || "image/jpeg";
  const base64 = Buffer.from(response.data, "binary").toString("base64");
  return `data:${contentType};base64,${base64}`;
}

const corsOptions = {
  origin: 'https://karl-mantle.github.io',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.post("/api/meta", async (req, res) => {
  const { url, username, password } = req.body;

  if (!url) {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    const authHeader = username && password ? {
          Authorization: "Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
        } : {};

    const response = await axios.get(url, { headers: { ...authHeader } });
    const $ = cheerio.load(response.data);

    const getMeta = (name, attr = "name") => $(`meta[${attr}="${name}"]`).attr("content") || null;

    const ogImageUrl = getMeta("og:image", "property");
    const ogImageBase64 = ogImageUrl ? await fetchImageAsBase64(ogImageUrl, username, password).catch(() => null) : null;

    const twitterImageUrl = getMeta("twitter:image");
    const twitterImageBase64 = twitterImageUrl ? await fetchImageAsBase64(twitterImageUrl, username, password).catch(() => null) : null;

    const metadata = {
      url: url,
      title: $("title").text() || null,
      description: getMeta("description"),
      ogTitle: getMeta("og:title", "property"),
      ogDescription: getMeta("og:description", "property"),
      ogImage: ogImageUrl,
      ogImageBase64,
      twitterTitle: getMeta("twitter:title"),
      twitterDescription: getMeta("twitter:description"),
      twitterImage: twitterImageUrl,
      twitterImageBase64,
      favicon:
        $('link[rel="icon"]').attr("href") ||
        $('link[rel="shortcut icon"]').attr("href") ||
        null,
    };

    res.json(metadata);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch meta data", details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
