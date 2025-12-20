import { normaliseMeta } from "../lib/normaliseMeta";

export default function Teams({ meta }) {
  const { title, description, image, url } = normaliseMeta(meta);

  return (
    <div
      style={{
        width: 420,
        border: "1px solid #e1e1e1",
        padding: 12,
        fontFamily: "Segoe UI, Arial",
        display: "flex",
        gap: 12,
      }}
    >
      {image && (
        <img
          src={image}
          alt="Teams preview"
          style={{
            width: 80,
            height: 80,
            objectFit: "cover",
            borderRadius: 4,
          }}
        />
      )}
      <div>
        <div style={{ fontWeight: 600, fontSize: 14 }}>{title}</div>
        <div style={{ fontSize: 13, color: "#444", margin: "4px 0" }}>
          {description}
        </div>
        <div style={{ fontSize: 12, color: "#6264a7" }}>{url}</div>
      </div>
    </div>
  );
}
