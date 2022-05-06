import setClass from "./setClass";


function scrollHighLight(headings, tocTree, viewablePercentToHighlight, showsParentHighlight) {   
  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i];
    const safeNextIndex = (i + 1 < headings.length) ? i + 1 : i; // If the next heading is the last one, use the current heading
    const safePrevIndex = (i - 1 >= 0) ? i - 1 : 1; // First heading not have parent
    const nextHeading = headings[safeNextIndex];

    const parentToc = tocTree[i].parent;
    const elementToc = tocTree[i].selector;
    const prevElementToc = tocTree[safePrevIndex];

    function highlight() {
      let { bottom, top } = heading.getBoundingClientRect();

      const scope = nextHeading.getBoundingClientRect().top - bottom;
      const scopeSplit = (scope * viewablePercentToHighlight) / 100;
      const scopeCanView = scope - scopeSplit;

      const windowHeight = window.innerHeight;


      if (bottom + scopeCanView <= windowHeight && top + scopeSplit >= 0) {
        setClass("highlight",'add', [heading, elementToc]);

        if (showsParentHighlight && parentToc) {
          setClass("parent_highlight", 'add', [parentToc]);
        }
      } else if (top + scopeSplit <= 0 || bottom > windowHeight) {
        setClass("highlight", 'remove', [heading, elementToc]);

        if (showsParentHighlight && prevElementToc.parent) {
          setClass("parent_highlight", 'remove', [heading, elementToc, prevElementToc.selector]);
        }
      }
    }

    // Add event listener to scroll
    highlight(); // Run on load
    document.addEventListener("scroll", highlight);

  }
}

export default scrollHighLight;