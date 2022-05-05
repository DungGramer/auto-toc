function toc(props) {
  const scope = props.scope || "body";
  const tocSelector = props.tocSelector;
  const from = props.from || 2;
  const to = props.to || 6;
  const scrollMargin = parseInt(props.scrollMargin) || 100;
  const parentHighlight = props.parentHighlight || false;

  const tocElement = document.querySelector(tocSelector);
  const scopeElement = document.querySelector(scope);

  // Get all h-from - h-to elements
  const headings = queryAllHeadings();

  // Create a list to hold the headings
  const toc = document.createElement("ol");
  const tocTree = [{ level: from, scope: toc }];

  headings.forEach((heading) => {
    const headingLevel = Number(heading.tagName.slice(1));
    const prevToc = tocTree[tocTree.length - 1];

    if (prevToc.level < headingLevel) {
      const ul = document.createElement("ul");
      const a = createTocElement(ul, heading);

      prevToc.scope.appendChild(ul);
      tocTree.push({ level: headingLevel, scope: ul, selector: a, parent: tocTree.at(-1).selector });
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
  tocElement.appendChild(toc);

  scrollHighLight();

  function findParentScope(tocTree, level) {
    for (let i = tocTree.length - 1; i >= 0; i--) {
      if (tocTree[i].level === level) {
        return tocTree[i].scope;
      }
    }

    return toc;
  }

  function setsColor(color, ...elements) {
    elements.forEach((element) => {
      if (element !== undefined) {
        element.style.color = color;
      }
    });
  }

  function queryAllHeadings() {
    let headingSelector = "";
    for (let i = from; i <= to; ++i) {
      headingSelector += `h${i},`;
    }

    return scopeElement.querySelectorAll(headingSelector.slice(0, -1));
  }

  function createTocElement(selector, heading) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = heading.textContent;

    heading.id ||= `${heading.textContent
      .replace(/\s/g, "-")
      .toLowerCase()}-${Math.random().toString(36).substring(2, 15)}`;

    a.href = `#${heading.id}`;

    // Add the link to the li item
    li.appendChild(a);
    selector.appendChild(li);

    return a;
  }

  function scrollHighLight() {

    /*< Debug
    const spacings = [];
    
    for (let i = 0; i < headings.length - 1; i++) {
      const current = headings[i];
      const next = headings[i + 1];
      spacings.push({
        height: next.getBoundingClientRect().top - current.getBoundingClientRect().bottom,
        bottom: current.getBoundingClientRect().bottom,
      });

    }
    console.log(`📕 spacings - 130:toc.js \n`, spacings);

    for (let i = 0; i < headings.length - 1; i++) {
      const div = document.createElement("div");
      div.className = "overlay";
      div.style.top = `${spacings[i].bottom}px`;
      div.style.height = `${spacings[i].height}px`;
      
      document.body.appendChild(div);
    }
    *///> Debug
    console.log(`📕 tocTree - 133:toc.js \n`, tocTree);
    
    for (let i = 0; i < headings.length; i++) {
      const heading = headings[i];
      const safeNextIndex = (i + 1 < headings.length) ? i + 1 : i;
      const nextHeading = headings[safeNextIndex];
      const elementToc = tocTree[i].selector;
      const parent = tocTree[i].parent;

      function highlight() {
        let { bottom, top } = heading.getBoundingClientRect();
        const {marginBottom, marginTop, paddingBottom, paddingTop} = window.getComputedStyle(heading);
        bottom = Math.round(bottom + parseInt(marginBottom) + parseInt(paddingBottom));
        top = Math.round(top + parseInt(marginTop) + parseInt(paddingTop));

        const scope = nextHeading.getBoundingClientRect().top - bottom;
        const scopeSplit = (scope * scrollMargin) / 100;
        const scopeCanView = scope - scopeSplit;
        const windowHeight = window.innerHeight;

        if (bottom + scopeCanView <= windowHeight && top + scopeSplit >= 0) {
          setsColor("red", heading, elementToc);
          if (parentHighlight && parent) {
            setsColor("red", parent);
          }
        } else if (top + scopeSplit <= 0 || bottom > windowHeight) {
          setsColor("black", heading, elementToc);
        }
      }

      // Add event listener to scroll
      highlight(); // Run on load
      document.addEventListener("scroll", highlight);

    }
  }
}
