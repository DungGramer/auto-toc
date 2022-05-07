import tocGenerate from '../dist/toc-generate.module';

document.addEventListener("DOMContentLoaded", () => {
  const tableOfContent = tocGenerate({
    contentWrapperSelector: "main",
    headingLevelFrom: 2,
    viewablePercentToHighlight: 70,
    showsHighLight: true,
  });

  const tocSelector = document.querySelector("#toc");
  tocSelector.appendChild(tableOfContent);
});