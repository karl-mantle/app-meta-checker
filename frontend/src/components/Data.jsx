import { normaliseMeta } from "../lib/normaliseMeta";
import { resolveSiteName } from "../lib/resolveSiteName";

const sectionStyle = {
  border: "1px solid #ddd",
  padding: "1rem",
  marginBottom: "1.5rem",
};

const sectionTitle = {
  marginBottom: "0.75rem",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const cellLabel = {
  width: "30%",
  padding: "6px 8px",
  borderBottom: "1px solid #eee",
  color: "#555",
};

const cellValue = {
  padding: "6px 8px",
  borderBottom: "1px solid #eee",
  wordBreak: "break-all",
};

const imageBlock = {
  marginTop: "0.75rem",
};

const imageLabel = {
  fontSize: "12px",
  color: "#666",
  marginBottom: "4px",
};

const imageStyle = {
  maxWidth: "100%",
  border: "1px solid #ccc",
};

export default function Data({ meta, url }) {
  const {
    title,
    description,
    image,
    twitterTitle,
    twitterDescription,
    twitterImage,
  } = normaliseMeta(meta);

  const Row = ({ label, value }) => (
    <tr>
      <td style={cellLabel}>{label}</td>
      <td style={cellValue}>
        {value ? value : <span style={{ color: "#c00" }}>missing</span>}
      </td>
    </tr>
  );

  return (
    <div style={{ marginTop: "2rem", fontFamily: "monospace" }}>
      {/* Open Graph */}
      <section style={sectionStyle}>
        <h3 style={sectionTitle}>Open Graph (normalized)</h3>
        <table style={tableStyle}>
          <tbody>
            <Row label="og:title" value={title} />
            <Row label="og:description" value={description} />
            <Row label="og:image" value={image} />
            <Row label="og:url" value={url} />
            <Row label="domain" value={resolveSiteName(url)} />
          </tbody>
        </table>

        {image && (
          <div style={imageBlock}>
            <div style={imageLabel}>Resolved og:image</div>
            <img src={image} alt="og:image" style={imageStyle} />
          </div>
        )}
      </section>

      {/* Twitter */}
      <section style={sectionStyle}>
        <h3 style={sectionTitle}>Twitter Card (normalized)</h3>
        <table style={tableStyle}>
          <tbody>
            <Row label="twitter:title" value={twitterTitle} />
            <Row label="twitter:description" value={twitterDescription} />
            <Row label="twitter:image" value={twitterImage} />
          </tbody>
        </table>

        {twitterImage && (
          <div style={imageBlock}>
            <div style={imageLabel}>Resolved twitter:image</div>
            <img src={twitterImage} alt="twitter:image" style={imageStyle} />
          </div>
        )}
      </section>
    </div>
  );
}
