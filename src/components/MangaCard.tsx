import * as React from "react";
import { MangaItem } from "../types/manga";

interface MangaCardProps {
  item: MangaItem;
}

export const MangaCard: React.FC<MangaCardProps> = ({ item }) => {
  const amazonUrl = `https://www.amazon.co.jp/dp/${item.asin}/?tag=hotoku66-22`;
  const imageUrl = `https://images-na.ssl-images-amazon.com/images/P/${item.asin}.09.LZZZZZZZ.jpg`;

  return (
    <div
      className="amazon-card"
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <div
        className="amazon-image"
        style={{ flex: "0 0 120px", marginRight: "15px" }}
      >
        <a href={amazonUrl} target="_blank" rel="noopener">
          <img
            src={imageUrl}
            alt={item.title}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </a>
      </div>
      <div className="amazon-info">
        <p style={{ margin: "0 0 10px 0", fontWeight: "bold" }}>
          <a
            href={amazonUrl}
            target="_blank"
            rel="noopener"
            style={{ textDecoration: "none", color: "#333" }}
          >
            {item.title}
          </a>
        </p>
        <a
          href={amazonUrl}
          target="_blank"
          rel="noopener"
          style={{
            background: "#f0c14b",
            border: "1px solid #a88734",
            padding: "5px 15px",
            borderRadius: "3px",
            color: "#111",
            textDecoration: "none",
            fontSize: "0.9em",
          }}
        >
          Amazonで見る
        </a>
      </div>
    </div>
  );
};
