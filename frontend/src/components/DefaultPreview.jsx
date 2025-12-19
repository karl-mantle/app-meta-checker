const DefaultPreview = ({ meta }) => {
  const ogImgSrc = meta.ogImageBase64 || meta.ogImage;
  const twitterImgSrc = meta.twitterImageBase64 || meta.twitterImage;

  return (
    <>
      <div style={{ marginTop: "2rem" }}>
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
    </>
  );
};

export default DefaultPreview;
