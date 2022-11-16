export const convertMermaidTag = () => {
  const nodes = document.querySelectorAll<HTMLElement>("code.language-mermaid");
  nodes.forEach((node) => {
    const pre = node.parentNode as ParentNode;
    const parent = pre.parentNode as ParentNode;
    parent.replaceChild(
      document.createElement(
        "div",
        {}
        // `<div class="mermaid">${node.textContent}</div>`
      ),
      pre
    );
  });
};

function main() {
  convertMermaidTag();
}

main();
