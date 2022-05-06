import toc from './toc/toc.js';

document.addEventListener("DOMContentLoaded", () => {
  toc({
    scope: 'main',
    tocSelector: '#toc',
    from: 2,
    scrollMargin: '70%',
    parentHighlight: true,
    showLineNumbers: false,
  });
});