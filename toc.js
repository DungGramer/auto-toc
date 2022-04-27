function toc(scope, tocSelector, from, to) {
  let tocElement = document.querySelector(tocSelector);
  let scopeElement = document.querySelector(scope) || document.body;

  let headingSelector = '';
  for (let i = from; i <= to; i++) {
    headingSelector += `h${i},`;
  }
  headingSelector = headingSelector.slice(0, -1);

  // Get all h1 - h6 elements
  let headings = scopeElement.querySelectorAll(headingSelector);
  
  // Create a list to hold the headings
  let toc = document.createElement('ol');

  const tocTree = [{
    level: from,
    scope: toc
  }];

  // Loop through each heading
  headings.forEach(heading => {
    let headingContent = heading.textContent;
    let headingLevel = heading.tagName.substr(1);

    let prevToc = tocTree[tocTree.length - 1];

    
    if (prevToc.level < headingLevel) {
      // Create a new list item
      let ol = document.createElement('ol');

      createTocElement(ol, headingContent);

      // Add the list item to the list
      prevToc.scope.appendChild(ol);

      // Add the list to the tree
      tocTree.push({
        level: +headingLevel,
        scope: ol
      });
    } else if (prevToc.level > headingLevel) {

      // Get the last list from the tree
      let parentToc = findParent(tocTree, headingLevel);
      console.log(parentToc);
      

      if (parentToc) {
        createTocElement(parentToc, headingContent);

        tocTree.push({
          level: +headingLevel,
          scope: parentToc
        });
      } else {
        let ol = document.createElement('ol');
        createTocElement(ol, headingContent);
        prevToc.scope.appendChild(ol);

        tocTree.push({
          level: +headingLevel,
          scope: ol
        });
      }

    } else {
      createTocElement(prevToc.scope, headingContent);

      // Add the list to the tree
      tocTree.push({
        level: +headingLevel,
        scope: prevToc.scope
      });
    }

    console.log(`📕 tocTree - 60:toc.js \n`, tocTree);

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
}

function createTocElement(selector, headingContent) {
  // Create a new list item
  let li = document.createElement('li');

  // Create a link to the heading
  let a = document.createElement('a');
  a.textContent = headingContent;
  a.href = `#${selector?.id}`;

  // Add the link to the list item
  li.appendChild(a);

  // Add the list item to the list
  selector.insertAdjacentHTML('beforeend', li.outerHTML);
}

toc('main', '#toc', 2, 6);

