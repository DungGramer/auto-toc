// import toc from './toc/toc.js';
import toc from './dist/toc.min.js';

document.addEventListener("DOMContentLoaded", () => {
  const tableOfContent = toc({
    contentWrapperSelector: "main",
    headingLevelFrom: 2,
    viewablePercentToHighlight: 70,
    showsHighLight: true,
    showsParentHighlight: true,
  });

  const tocSelector = document.querySelector("#toc");
  tocSelector.appendChild(tableOfContent);
});