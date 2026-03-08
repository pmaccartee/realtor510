import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import tailwindcss from "@tailwindcss/vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define our entry points
const inputs: Record<string, string> = {
  main: path.resolve(__dirname, 'client/index.html'),
};

// Create directories and HTML files for each page
const dirs = ['buy', 'sell', 'answers', 'reviews', 'trends', 'waters', 'julia', 'neighborhoods'];

const htmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
    <title>Patrick MacCartee | Realtor510</title>
    <script src="https://em.realscout.com/widgets/realscout-web-components.umd.js" type="module"></script>
    <style>
      realscout-your-listings {
        --rs-listing-divider-color: rgb(101, 141, 172);
        width: 100%;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
    <script>
      // Automatically route to the correct path based on folder
      var path = window.location.pathname;
      if (path.endsWith('/')) path = path.slice(0, -1);
      window.initialRoute = path;
    </script>
  </body>
</html>`;

dirs.forEach(dir => {
  const dirPath = path.resolve(__dirname, `client/${dir}`);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  const indexPath = path.resolve(dirPath, 'index.html');
  fs.writeFileSync(indexPath, htmlContent);
  inputs[dir] = indexPath;
});

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      input: inputs,
    },
  },
  server: {
    port: 5000,
    host: "0.0.0.0",
    allowedHosts: true
  }
});
