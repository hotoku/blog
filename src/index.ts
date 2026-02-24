import * as React from "react";
import { createRoot } from "react-dom/client";
import { MangaItem } from "./types/manga";
import { MangaViewer } from "./components/MangaViewer";

async function main() {
  console.log("main start");

  // DOM の準備を待つ
  if (document.readyState === "loading") {
    console.log("Document still loading, waiting for DOMContentLoaded...");
    document.addEventListener("DOMContentLoaded", initializeAfterDOM);
  } else {
    console.log("Document already loaded, initializing immediately");
    await initializeAfterDOM();
  }
}

async function initializeAfterDOM() {
  // console.log("DOM is ready, initializing components");
  // // 既存のMermaid機能
  // const convertMermaidTag = (await import("./convertMermaidTag")).default;
  // console.log("imported convertMermaidTag");
  // convertMermaidTag();
  // // 新しいManga Viewer機能
  // console.log("About to initialize MangaViewer");
  // initializeMangaViewer();
}

function initializeMangaViewer() {
  // console.log("initializeMangaViewer called");
  // const container = document.getElementById("manga-viewer-container");
  // console.log("Container element:", container);
  // if (!container) {
  //   console.error("manga-viewer-container not found!");
  //   return;
  // }
  // // HTMLから埋め込まれたデータを取得
  // const dataElement = document.getElementById("manga-data");
  // console.log("Data element:", dataElement);
  // if (!dataElement || !dataElement.textContent) {
  //   console.error("manga-data element not found or empty!");
  //   return;
  // }
  // try {
  //   console.log("Parsing JSON data...");
  //   const mangaItems: MangaItem[] = JSON.parse(dataElement.textContent);
  //   console.log("Parsed manga items count:", mangaItems.length);
  //   console.log("First item:", mangaItems[0]);
  //   console.log("Creating React root...");
  //   const root = createRoot(container);
  //   console.log("Rendering MangaViewer...");
  //   root.render(React.createElement(MangaViewer, { items: mangaItems }));
  //   console.log("MangaViewer rendered successfully!");
  // } catch (error) {
  //   console.error("Failed to initialize MangaViewer:", error);
  // }
}

main();
