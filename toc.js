function toc(props) {
  const scope = props.scope || "body";
  const tocSelector = props.tocSelector;
  const from = props.from || 2;
  const to = props.to || 6;
  const scrollMargin = parseInt(props.scrollMargin) || 100;
  const parentHighlight = props.parentHighlight || false;
  const showLineNumbers = props.showLineNumbers || false;

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

  function setColor(className = 'highlight', ...elements) {
    elements.forEach((element) => {
      if (element !== undefined) {
        element.classList.add(className);
      }
    });
  }

  function unsetColor(className = 'highlight', ...elements) {
    elements.forEach((element) => {
      if (element !== undefined) {
        element.classList.remove(className);
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
    
    heading.id ||= `${heading.textContent
      .replace(/\s/g, "-")
      .toLowerCase()}-${Math.random().toString(36).substring(2, 15)}`;
      
    a.textContent = heading.textContent;
    a.href = `#${heading.id}`;

    // Add the link to the li item
    li.appendChild(a);
    selector.appendChild(li);

    return a;
  }

  function scrollHighLight() {   
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
          setColor("highlight", heading, elementToc);
          if (parentHighlight && parent) {
            setColor("highlight", parent);
          }
        } else if (top + scopeSplit <= 0 || bottom > windowHeight) {
          unsetColor("highlight", heading, elementToc);
        }
      }

      // Add event listener to scroll
      highlight(); // Run on load
      document.addEventListener("scroll", highlight);

    }
  }

  function showOrderListNumber() {
    const style = document.createElement("style");
    style.textContent = `ol { list-style-type: decimal; }`;

    document.head.appendChild(style);
  }

  if (showLineNumbers) showOrderListNumber();
}
