import { readFile, writeFile, mkdir, stat } from "fs/promises";
import path from "path";
import { pathToFileURL, fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");

const ROUTES = ["/", "/buy", "/sell", "/reviews", "/waters", "/blog", "/neighborhoods"];

const ssrPath = path.join(PROJECT_ROOT, "dist", "server", "entry-server.js");
const { render } = await import(pathToFileURL(ssrPath).href);

const templatePath = path.join(PROJECT_ROOT, "dist", "public", "index.html");
const template = await readFile(templatePath, "utf-8");

for (const route of ROUTES) {
  const appHtml = render(route);
  const html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );

  let outPath;
  if (route === "/") {
    outPath = templatePath;
  } else {
    const slug = route.slice(1);
    const dir = path.join(PROJECT_ROOT, "dist", "public", slug);
    await mkdir(dir, { recursive: true });
    outPath = path.join(dir, "index.html");
  }

  await writeFile(outPath, html);
  const info = await stat(outPath);
  console.log(`  ✓ ${route} → ${outPath} (${(info.size / 1024).toFixed(1)} kB)`);
}

console.log("pre-rendering complete");
