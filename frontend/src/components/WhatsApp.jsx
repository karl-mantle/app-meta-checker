import { normaliseMeta } from "../lib/normaliseMeta";

export default function WhatsApp({ meta }) {
  const { title, description, image, url } = normaliseMeta(meta);

  return (
    <div
      style={{
        width: 360,
        border: "1px solid #e0e0e0",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      {image && (
        <img
          src={image}
          alt="WhatsApp OG"
          style={{ width: "100%", height: 180, objectFit: "cover" }}
        />
      )}
      <div style={{ padding: 10 }}>
        <div style={{ fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: 13, color: "#555" }}>{description}</div>
        <div style={{ fontSize: 12, color: "#999" }}>{url}</div>
      </div>
    </div>
  );
}
