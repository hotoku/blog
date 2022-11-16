export const convertMermaidTag = () => {
  const nodes = document.querySelectorAll<HTMLElement>("code.language-mermaid");
  nodes.forEach((node) => {
    const pre = node.parentNode as ParentNode;
    const parent = pre.parentNode as ParentNode;
    const child = document.createElement("div");
    child.className = "language-mermaid";
    child.textContent = node.textContent;
    parent.replaceChild(child, pre);
  });
};

function main() {
  window.addEventListener("load", () => {
    convertMermaidTag();
  });
}

main();
