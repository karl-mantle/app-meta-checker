export const normaliseMeta = (meta) => ({
  title: meta.ogTitle || meta.title || "",
  description: meta.ogDescription || meta.description || "",
  image: meta.ogImageBase64 || meta.ogImage || "",
  twitterTitle: meta.twitterTitle || meta.title || "",
  twitterDescription: meta.twitterDescription || meta.description || "",
  twitterImage: meta.twitterImageBase64 || meta.twitterImage || "",
  url: meta.ogUrl || meta.canonical || "",
  siteName: meta.ogSiteName || "",
});
