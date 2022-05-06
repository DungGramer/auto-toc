import toc from './toc/toc.js';

document.addEventListener("DOMContentLoaded", () => {
  const tableOfContent = toc({
    contentWrapperSelector: 'main',
    headingLevelFrom: 2,
    viewablePercentToHighlight: 70,
    showsHighLight: true,
    showsParentHighlight: true,
  });

  const tocSelector = document.querySelector('#toc');
  tocSelector.appendChild(tableOfContent);
});