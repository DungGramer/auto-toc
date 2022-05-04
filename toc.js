function toc(props) {
  const scope = props.scope || "body";
  const tocSelector = props.tocSelector;
  const from = props.from || 2;
  const to = props.to || 6;
  const scrollMargin = props.scrollMargin || 0;

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
      createTocElement(ul, heading);

      prevToc.scope.appendChild(ul);
      tocTree.push({ level: headingLevel, scope: ul });
    } else if (prevToc.level > headingLevel) {
      const parentToc = findParentScope(tocTree, headingLevel);

      createTocElement(parentToc, heading);
      tocTree.push({ level: headingLevel, scope: parentToc });
    } else {
      createTocElement(prevToc.scope, heading);
      tocTree.push({ level: headingLevel, scope: prevToc.scope });
    }
  });

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
      element.style.color = color;
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

    tocTree[tocTree.length - 1].selector = a;
  }

  function scrollHighLight() {
    // for (let i = 0; i < headings.length; i++) {
    //   const heading = headings[i];
    //   const elementToc = tocTree[i].selector;
    //   function highlight() {
    //     let { top, bottom } = heading.getBoundingClientRect();
    //     bottom = Math.round(bottom) + 1;
    //     top = Math.round(top);
    //     const windowHeight = (window.innerHeight * 0.7 + document.documentElement.scrollTop * 0.1) - scrollMargin;
    //     if (bottom <= windowHeight) {
    //       setsColor("red", heading, elementToc);
    //     }
    //     if (bottom <= 0 || top >= windowHeight) {
    //       setsColor("black", heading, elementToc);
    //     }
    //   }
    //   // Add event listener to scroll
    //   highlight(); // Run on load
    //   document.addEventListener("scroll", highlight);
    // }
    //   const observer = new IntersectionObserver(
    //     (entries) => {
    //       entries.forEach((entry) => {
    //         const tocLink = document.querySelector(`a[href="#${entry.target.id}"]`);
    //         // Show when over rangeView
    //         if (entry.intersectionRatio > 0) {
    //           setsColor("red", entry.target, tocLink);
    //         } else {
    //           setsColor("black", entry.target, tocLink);
    //         }
    //       });
    //     },
    //     {
    //       threshold: 0.5,
    //       rootMargin: `${scrollMargin}px`,
    //     }
    //   );
    //   headings.forEach((heading) => {
    //     observer.observe(heading);
    //   });
    // }

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
    
    for (let i = 0; i < headings.length; i++) {
      const heading = headings[i];
      const nextHeading = headings[(i + 1 < headings.length) ? i + 1 : i];
      const elementToc = tocTree[i].selector;

      function highlight() {
        const height = nextHeading.getBoundingClientRect().top - heading.getBoundingClientRect().bottom;
        const { bottom, top } = heading.getBoundingClientRect();
        console.log(`📕 bottom - 159:toc.js \n`, bottom);

        // const scope = ((bottom + height));
        if (bottom < window.innerHeight && top + height > 0) {
          setsColor("red", heading, elementToc);
        } else if (top + height < 0 || bottom > window.innerHeight) {
          setsColor("black", heading, elementToc);
        }
      }

      // Add event listener to scroll
      highlight(); // Run on load
      document.addEventListener("scroll", highlight);

    }
  }
}
