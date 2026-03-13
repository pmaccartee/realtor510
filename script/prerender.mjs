import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { pathToFileURL } from "url";

const ROUTES = ["/", "/buy", "/sell", "/reviews", "/waters", "/blog", "/neighborhoods"];

const ssrPath = path.resolve("dist/server/entry-server.js");
const { render } = await import(pathToFileURL(ssrPath).href);

const templatePath = path.resolve("dist/public/index.html");
const template = await readFile(templatePath, "utf-8");

for (const route of ROUTES) {
  const appHtml = render(route);
  const html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );

  if (route === "/") {
    await writeFile(templatePath, html);
    console.log(`  ✓ /`);
  } else {
    const slug = route.slice(1);
    const dir = path.resolve(`dist/public/${slug}`);
    await mkdir(dir, { recursive: true });
    await writeFile(path.resolve(dir, "index.html"), html);
    console.log(`  ✓ ${route}`);
  }
}

console.log("pre-rendering complete");
