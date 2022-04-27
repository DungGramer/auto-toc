function toc(scope = "body", tocSelector, from = 2, to = 6) {
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
      // Create a new list item
      const ul = document.createElement("ul");
      createTocElement(ul, heading);

      // Add the list item to the list
      prevToc.scope.appendChild(ul);
      tocTree.push({ level: headingLevel, scope: ul });
    } else if (prevToc.level > headingLevel) {
      // Get the last list from the tree
      const parentToc = findParent(tocTree, headingLevel);

      createTocElement(parentToc, heading);
      tocTree.push({ level: headingLevel, scope: parentToc });
    } else {
      createTocElement(prevToc.scope, heading);
      tocTree.push({ level: headingLevel, scope: prevToc.scope });
    }
  });

  // Append the list to the toc element
  tocElement.appendChild(toc);

  function findParent(tocTree, level) {
    for (let i = tocTree.length - 1; i >= 0; i--) {
      if (Number(tocTree[i].level) === Number(level)) {
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

  // Add the li item to the list
  selector.appendChild(li);
}

toc("main", "#toc", 2);
