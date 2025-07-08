import { useState } from "react";

const defaultPreview = {
  title: "",
  description: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
  favicon: ""
};

export default function App() {
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [meta, setMeta] = useState(defaultPreview);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMetadata = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://app-meta-checker-production-6f68.up.railway.app/api/meta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, username, password })
      });
      const data = await response.json();
      if (response.ok) {
        setMeta(data);
      } else {
        setError(data.error || "Failed to fetch meta data");
      }
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const ogImgSrc = meta.ogImageBase64 || meta.ogImage;
  const twitterImgSrc = meta.twitterImageBase64 || meta.twitterImage;

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>app-meta-checker</h1>
      <p>Check OG and Twitter meta tags.</p>

      <div style={{ marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="https://www.something.com"
          value={url}
          onChange={e => setUrl(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Basic Auth Username (optional)"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
        />
        <input
          type="password"
          placeholder="Basic Auth Password (optional)"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
        />
        <button onClick={fetchMetadata} disabled={loading} style={{ padding: "0.5rem 1rem" }}>
          {loading ? "Loading..." : "Fetch Meta Tags"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginTop: "2rem" }}>
        <h2>Preview</h2>
        <div style={{ border: "1px dashed #ccc", padding: "1rem", marginBottom: "1rem" }}>
          <h3>{meta.ogTitle || meta.title}</h3>
          <p>{meta.ogDescription || meta.description}</p>
        {ogImgSrc && <img src={ogImgSrc} alt="og:image" style={{ maxWidth: "100%" }} />}
        </div>

        <div style={{ border: "1px dashed #ccc", padding: "1rem" }}>
          <h3>{meta.twitterTitle || meta.title}</h3>
          <p>{meta.twitterDescription || meta.description}</p>
        {twitterImgSrc && <img src={twitterImgSrc} alt="twitter:image" style={{ maxWidth: "100%" }} />}
        </div>
      </div>
    </div>
  );
}
