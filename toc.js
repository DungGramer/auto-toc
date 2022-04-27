function toc(props) {
  const scope = props.scope || "body";
  const tocSelector = props.tocSelector;
  const from = props.from || 2;
  const to = props.to || 6;
  const scrollMargin = props.scrollMargin || 100;

  const tocElement = document.querySelector(tocSelector);
  const scopeElement = document.querySelector(scope);

  // Get all h-from - h-to elements
  const headings = queryAllHeadings();

  headings.forEach(heading => {
    document.addEventListener('scroll', () => {
      if (heading.getBoundingClientRect().top > 300) {
        // window.scrollBy(0, heading.getBoundingClientRect().top - scrollMargin);
        heading.style.color = 'red';
      }
    })
  })

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

  function findParentScope(tocTree, level) {
    for (let i = tocTree.length - 1; i >= 0; i--) {
      if (tocTree[i].level === level) {
        return tocTree[i].scope;
      }
    }

    return toc;
  }

  function queryAllHeadings() {
    let headingSelector = "";
    for (let i = from; i <= to; ++i) {
      headingSelector += `h${i},`;
    }

    return scopeElement.querySelectorAll(headingSelector.slice(0, -1));
  }
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
}
