import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";

const neighborhoodMap: Record<string, string> = {
  "crocker-highlands": "crocker-highlands-guide.html",
  "piedmont": "piedmont-home-values.html",
  "temescal": "temescal-guide.html",
  "sequoyah-hills": "sequoyah-hills-market-report.html",
  "rockridge": "rockridge-guide.html",
  "oakmore-glenview": "oakmore-glenview-guide.html",
  "montclair": "montclair-guide.html",
  "berkeley-hills": "berkeley-hills-guide.html",
  "trestle-glen": "trestle-glen-guide.html",
  "alameda": "alameda-neighborhood-guide.html",
  "berkeley": "berkeley-neighborhood-guide.html",
  "oakland": "oakland-neighborhood-guide.html",
  "piedmont-guide": "piedmont-neighborhood-guide.html",
  "piedmont-vs-rockridge": "piedmont-vs-rockridge.html",
  "crocker-highlands-trestle-glen": "crocker-highlands-trestle-glen-oakland.html",
  "selling-crocker-highlands": "selling-crocker-highlands-oakland.html",
  "piedmont-luxury-market": "piedmont-luxury-market.html",
};

function findHtmlFile(htmlFile: string): string | null {
  const devPath = path.join(process.cwd(), "client", "public", htmlFile);
  if (fs.existsSync(devPath)) return devPath;

  const prodPath = path.resolve(__dirname, "public", htmlFile);
  if (fs.existsSync(prodPath)) return prodPath;

  return null;
}

function getAllHtmlFiles(): string[] {
  const devDir = path.join(process.cwd(), "client", "public");
  if (fs.existsSync(devDir)) {
    try {
      return fs.readdirSync(devDir).filter((f) => f.endsWith(".html") && f !== "index.html");
    } catch {
      return [];
    }
  }
  try {
    const prodDir = path.resolve(__dirname, "public");
    return fs.readdirSync(prodDir).filter((f) => f.endsWith(".html") && f !== "index.html");
  } catch {
    return [];
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/neighborhood-html/:slug", (req, res) => {
    const slug = req.params.slug;
    const htmlFile = neighborhoodMap[slug];
    if (!htmlFile) {
      return res.status(404).send("Neighborhood not found");
    }
    const filePath = findHtmlFile(htmlFile);
    if (filePath) {
      return res.sendFile(filePath);
    }
    return res.status(404).send("Neighborhood not found");
  });

  const htmlFiles = getAllHtmlFiles();
  for (const htmlFile of htmlFiles) {
    const baseName = htmlFile.replace(".html", "");
    if (/[()[\]{}]/.test(baseName)) continue;
    app.get(`/${baseName}`, (_req, res) => {
      const filePath = findHtmlFile(htmlFile);
      if (filePath) {
        return res.sendFile(filePath);
      }
      return res.status(404).send("Page not found");
    });
  }

  return httpServer;
}
