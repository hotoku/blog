import * as React from "react";
import { useState } from "react";
import { MangaItem } from "../types/manga";

interface MangaTileProps {
  item: MangaItem;
}

export const MangaTile: React.FC<MangaTileProps> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const amazonUrl = `https://www.amazon.co.jp/dp/${item.asin}/?tag=hotoku66-22`;
  const imageUrl = `https://images-na.ssl-images-amazon.com/images/P/${item.asin}.09.LZZZZZZZ.jpg`;

  return (
    <div
      className="manga-tile"
      style={{
        position: "relative",
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        transition: "transform 0.2s ease",
        cursor: "pointer",
        transform: isHovered ? "scale(1.05)" : "scale(1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href={amazonUrl} target="_blank" rel="noopener">
        <img
          src={imageUrl}
          alt={item.title}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
        {isHovered && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "rgba(0, 0, 0, 0.8)",
              color: "white",
              padding: "8px",
              fontSize: "0.85em",
              lineHeight: "1.2",
            }}
          >
            {item.series_name}
          </div>
        )}
      </a>
    </div>
  );
};
