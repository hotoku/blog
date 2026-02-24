import * as React from "react";
import { useState } from "react";
import { MangaItem, ViewMode } from "../types/manga";
import { MangaCard } from "./MangaCard";
import { MangaTile } from "./MangaTile";
import { ToggleButton } from "./ToggleButton";

interface MangaViewerProps {
  items: MangaItem[];
}

export const MangaViewer: React.FC<MangaViewerProps> = ({ items }) => {
  const [viewMode, setViewMode] = useState<ViewMode>("card");

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "card" ? "tile" : "card"));
  };

  return (
    <div className="manga-viewer">
      <ToggleButton viewMode={viewMode} onToggle={toggleViewMode} />

      <div className={`manga-container ${viewMode}-view`}>
        {viewMode === "card"
          ? items.map((item) => <MangaCard key={item.asin} item={item} />)
          : items.map((item) => <MangaTile key={item.asin} item={item} />)}
      </div>
    </div>
  );
};
