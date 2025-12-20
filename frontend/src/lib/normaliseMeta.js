const decodeHtmlEntities = (str = "") => {
  if (typeof document === "undefined") return str;

  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
};

export const normaliseMeta = (meta) => ({
  title: decodeHtmlEntities(meta.ogTitle || meta.title || ""),
  description: decodeHtmlEntities(meta.ogDescription || meta.description || ""),
  image: meta.ogImageBase64 || meta.ogImage || "",
  twitterTitle: decodeHtmlEntities(meta.twitterTitle || meta.title || ""),
  twitterDescription: decodeHtmlEntities(
    meta.twitterDescription || meta.description || ""
  ),
  twitterImage: meta.twitterImageBase64 || meta.twitterImage || "",
});
