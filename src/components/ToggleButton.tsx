import * as React from "react";
import { ViewMode } from "../types/manga";

interface ToggleButtonProps {
  viewMode: ViewMode;
  onToggle: () => void;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  viewMode,
  onToggle,
}) => {
  return (
    <div style={{ marginBottom: "20px", textAlign: "center" }}>
      <button
        onClick={onToggle}
        style={{
          background: "#f0c14b",
          border: "1px solid #a88734",
          padding: "10px 20px",
          borderRadius: "5px",
          color: "#111",
          fontSize: "0.9em",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "background 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#e0b13b";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#f0c14b";
        }}
      >
        {viewMode === "card"
          ? "📱 タイル表示に切り替え"
          : "📋 カード表示に切り替え"}
      </button>
    </div>
  );
};
