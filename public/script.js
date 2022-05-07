// import toc from './toc-generate/toc.js';
import tocGenerate from '../index';

document.addEventListener("DOMContentLoaded", () => {
  const tableOfContent = tocGenerate({
    contentWrapperSelector: "main",
    headingLevelFrom: 2,
    viewablePercentToHighlight: 70,
    showsHighLight: true,
    showsParentHighlight: true,
  });

  const tocSelector = document.querySelector("#toc");
  tocSelector.appendChild(tableOfContent);
});