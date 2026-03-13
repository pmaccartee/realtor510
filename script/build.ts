import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile, mkdir, copyFile, writeFile } from "fs/promises";
import path from "path";
import { pathToFileURL } from "url";

const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

const PRERENDER_ROUTES = ["/", "/buy", "/sell", "/reviews", "/waters", "/blog", "/neighborhoods"];

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();

  console.log("building SSR bundle...");
  await viteBuild({
    build: {
      ssr: true,
      outDir: path.resolve("dist/server"),
      rollupOptions: {
        input: path.resolve("client/src/entry-server.tsx"),
        output: {
          format: "es",
          entryFileNames: "entry-server.js",
        },
      },
    },
  });

  console.log("pre-rendering pages...");
  const { execSync } = await import("child_process");
  execSync("node script/prerender.mjs", { stdio: "inherit" });

  console.log("creating neighborhood static routes...");
  const neighborhoodMap: Record<string, string> = {
    "crocker-highlands-guide": "crocker-highlands-guide.html",
    "piedmont-home-values": "piedmont-home-values.html",
    "temescal-guide": "temescal-guide.html",
    "sequoyah-hills-market-report": "sequoyah-hills-market-report.html",
    "rockridge-guide": "rockridge-guide.html",
    "oakmore-glenview-guide": "oakmore-glenview-guide.html",
    "montclair-guide": "montclair-guide.html",
    "berkeley-hills-guide": "berkeley-hills-guide.html",
    "trestle-glen-guide": "trestle-glen-guide.html",
    "alameda-neighborhood-guide": "alameda-neighborhood-guide.html",
    "berkeley-neighborhood-guide": "berkeley-neighborhood-guide.html",
    "oakland-neighborhood-guide": "oakland-neighborhood-guide.html",
    "piedmont-neighborhood-guide": "piedmont-neighborhood-guide.html",
    "piedmont-vs-rockridge": "piedmont-vs-rockridge.html",
    "crocker-highlands-trestle-glen-oakland": "crocker-highlands-trestle-glen-oakland.html",
    "selling-crocker-highlands-oakland": "selling-crocker-highlands-oakland.html",
    "piedmont-luxury-market": "piedmont-luxury-market.html",
  };

  for (const [slug, htmlFile] of Object.entries(neighborhoodMap)) {
    const srcFile = `dist/public/${htmlFile}`;
    const destDir = `dist/public/neighborhood/${slug}`;
    await mkdir(destDir, { recursive: true });
    await copyFile(srcFile, `${destDir}/index.html`);
  }

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  console.log("\n=== HTML files in dist/public/ ===");
  execSync('find dist/public -name "*.html" -exec ls -lh {} \\;', { stdio: "inherit" });
  console.log("=== end HTML listing ===\n");

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
