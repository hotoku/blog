async function main() {
  console.log("main start");
  const convertMermaidTag = (await import("./convertMermaidTag")).default;
  console.log("imported");
  convertMermaidTag();
  // window.addEventListener("load", () => {
  //   convertMermaidTag();
  // });
}

main();
