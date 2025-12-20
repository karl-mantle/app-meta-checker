import { normaliseMeta } from "../lib/normaliseMeta";

export default function Outlook({ meta }) {
  const { title, description, image, url } = normaliseMeta(meta);

  return (
    <div
      style={{
        width: 480,
        border: "1px solid #c8c8c8",
        padding: 12,
        fontFamily: "Segoe UI, Arial",
      }}
    >
      <div style={{ display: "flex", gap: 12 }}>
        {image && (
          <img
            src={image}
            alt="Outlook preview"
            style={{ width: 100, height: 100, objectFit: "cover" }}
          />
        )}
        <div>
          <div style={{ fontWeight: 600 }}>{title}</div>
          <div style={{ fontSize: 13, color: "#333", margin: "6px 0" }}>
            {description}
          </div>
          <div style={{ fontSize: 12, color: "#0078d4" }}>{url}</div>
        </div>
      </div>
    </div>
  );
}
