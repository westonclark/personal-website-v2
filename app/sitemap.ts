export const baseUrl = "https://www.westonclark.dev";

export default async function sitemap() {

  let routes = ["", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return routes;
}
