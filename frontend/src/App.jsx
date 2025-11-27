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
  favicon: "",
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
      const response = await fetch(
        "https://app-meta-checker-worker.karlmantle.workers.dev/api/meta",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, username, password }),
        }
      );
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
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchMetadata();
        }}
      >
        <input
          id="url"
          type="text"
          placeholder="https://www.something.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          id="ba-username"
          type="text"
          placeholder="Basic Auth Username (optional)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          id="ba-password"
          type="password"
          placeholder="Basic Auth Password (optional)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Fetch Meta Tags"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <section>
        <div style={{ marginTop: "2rem" }}>
          <h2>Preview</h2>
          <div
            style={{
              border: "1px dashed #ccc",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <h3>{meta.ogTitle || meta.title}</h3>
            <p>{meta.ogDescription || meta.description}</p>
            {ogImgSrc && (
              <img src={ogImgSrc} alt="og:image" style={{ maxWidth: "100%" }} />
            )}
          </div>

          <div style={{ border: "1px dashed #ccc", padding: "1rem" }}>
            <h3>{meta.twitterTitle || meta.title}</h3>
            <p>{meta.twitterDescription || meta.description}</p>
            {twitterImgSrc && (
              <img
                src={twitterImgSrc}
                alt="twitter:image"
                style={{ maxWidth: "100%" }}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
