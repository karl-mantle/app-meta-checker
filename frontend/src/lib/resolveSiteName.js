export const resolveSiteName = (url) => {
  if (!url) return "";

  try {
    const target = url.startsWith("http")
      ? new URL(url)
      : new URL(`https://${url}`);

    return target.host;
  } catch {
    return "";
  }
};
