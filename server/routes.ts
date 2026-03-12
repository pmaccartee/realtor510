import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";

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

const oldSlugRedirects: Record<string, string> = {
  "crocker-highlands": "/neighborhood/crocker-highlands-guide",
  "piedmont": "/neighborhood/piedmont-home-values",
  "temescal": "/neighborhood/temescal-guide",
  "sequoyah-hills": "/neighborhood/sequoyah-hills-market-report",
  "rockridge": "/neighborhood/rockridge-guide",
  "oakmore-glenview": "/neighborhood/oakmore-glenview-guide",
  "montclair": "/neighborhood/montclair-guide",
  "berkeley-hills": "/neighborhood/berkeley-hills-guide",
  "trestle-glen": "/neighborhood/trestle-glen-guide",
  "alameda": "/neighborhood/alameda-neighborhood-guide",
  "berkeley": "/neighborhood/berkeley-neighborhood-guide",
  "oakland": "/neighborhood/oakland-neighborhood-guide",
  "piedmont-guide": "/neighborhood/piedmont-neighborhood-guide",
  "crocker-highlands-trestle-glen": "/neighborhood/crocker-highlands-trestle-glen-oakland",
  "selling-crocker-highlands": "/neighborhood/selling-crocker-highlands-oakland",
};

function findHtmlFile(htmlFile: string): string | null {
  const devPath = path.join(process.cwd(), "client", "public", htmlFile);
  if (fs.existsSync(devPath)) return devPath;

  const prodPath = path.resolve(__dirname, "public", htmlFile);
  if (fs.existsSync(prodPath)) return prodPath;

  return null;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/julia", (req, res) => {
    const filePath = findHtmlFile("julia-morgan_(1).html");
    if (filePath) {
      return res.sendFile(filePath);
    }
    return res.status(404).send("Page not found");
  });

  app.get("/neighborhood/:slug", (req, res) => {
    const slug = req.params.slug;

    const redirect = oldSlugRedirects[slug];
    if (redirect) {
      return res.redirect(301, redirect);
    }

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

  return httpServer;
}
