import { normaliseMeta } from "../lib/normaliseMeta";

export default function Facebook({ meta }) {
  const { title, description, image, url } = normaliseMeta(meta);

  return (
    <div style={{ width: 500, border: "1px solid #dadde1" }}>
      {image && (
        <img
          src={image}
          alt="Facebook OG"
          style={{ width: "100%", height: 260, objectFit: "cover" }}
        />
      )}
      <div style={{ padding: 12, background: "#f0f2f5" }}>
        <div
          style={{ fontSize: 12, color: "#65676b", textTransform: "uppercase" }}
        >
          {url || "example.com"}
        </div>
        <div style={{ fontSize: 16, fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: 14, color: "#65676b" }}>{description}</div>
      </div>
    </div>
  );
}
