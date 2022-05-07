import queryAllHeadings from "./queryAllHeadings";
import findParentScope from "./findParentScope";
import createTocElement from "./createTocElement";
import scrollHighLight from "./scrollHighLight";

function tocGenerate(props) {
  const contentWrapperSelector = props.contentWrapperSelector || "body";
  const tocSelector = props.tocSelector;
  const headingLevelFrom = props.headingLevelFrom || 2;
  const headingLevelTo = props.headingLevelTo || 6;
  const viewablePercentToHighlight = props.viewablePercentToHighlight || 70;
  const showsHighLight = props.showsHighLight || false;
  const showsParentHighlight = props.showsParentHighlight || false;

  const tocElement = tocSelector && document.querySelector(tocSelector);
  const scopeElement = document.querySelector(contentWrapperSelector);

  // Get all h-from - h-to elements
  const headings = queryAllHeadings(headingLevelFrom, headingLevelTo, scopeElement);

  // Create a list to hold the headings
  const toc = document.createElement("ol");
  const tocTree = [{ level: headingLevelFrom, scope: toc }];

  headings.forEach((heading) => {
    const headingLevel = Number(heading.tagName.slice(1));
    const prevToc = tocTree[tocTree.length - 1];

    if (prevToc.level < headingLevel) {
      const ol = document.createElement("ol");
      const a = createTocElement(ol, heading);

      prevToc.scope.appendChild(ol);
      tocTree.push({ level: headingLevel, scope: ol, selector: a, parent: tocTree.at(-1).selector });
    } else if (prevToc.level > headingLevel) {
      const parentToc = findParentScope(tocTree, headingLevel);

      const a = createTocElement(parentToc, heading);
      tocTree.push({ level: headingLevel, scope: parentToc, selector: a });
    } else {
      const a = createTocElement(prevToc.scope, heading);
      tocTree.push({ level: headingLevel, scope: prevToc.scope, selector: a, ...(prevToc.parent && { parent: prevToc.parent })});
    }
  });

  tocTree.shift();

  // Append the list to the toc element
  if (tocElement) {
    tocElement.appendChild(toc);
  }

  if (showsHighLight) {
    scrollHighLight(headings, tocTree, viewablePercentToHighlight, showsParentHighlight);
  }

  return toc;
}


export default tocGenerate;