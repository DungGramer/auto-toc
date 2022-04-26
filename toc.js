function toc(scope, tocSelector) {
  let tocElement = document.querySelector(tocSelector);
  let scopeElement = document.querySelector(scope) || document.body;

  // Get all h1 - h6 elements
  let headings = scopeElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
  
  // Create a list to hold the headings
  let toc = document.createElement('ol');

  const tocTree = [{
    level: 0,
    scope: toc
  }];

  // Loop through each heading
  headings.forEach(heading => {
    let headingContent = heading.textContent;
    let headingLevel = heading.tagName.substr(1);

    let prevToc = tocTree[tocTree.length - 1];
    
    if (headingLevel > prevToc.level) {
      // Create a new list item
      let ol = document.createElement('ol');

      createTocElement(ol, headingContent);

      // Add the list item to the list
      tocTree[0].scope.appendChild(ol);

      // Add the list to the tree
      tocTree.push({
        level: headingLevel,
        scope: ol
      });
    } else if (headingLevel < prevToc.level) {
      // Remove the last list from the tree
      tocTree.pop();
      console.log(`📕 tocTree - 40:toc.js \n`, tocTree);

      // Get the last list from the tree
      let prevToc = tocTree[tocTree.length - 1];

      createTocElement(prevToc.scope, headingContent);

      // Add the list to the tree
      tocTree.push({
        level: headingLevel,
        scope: prevToc.scope
      });
    } else {
      createTocElement(prevToc.scope, headingContent);
    }


  });

  // Append the list to the toc element
  tocElement.appendChild(toc);
}

function createTocElement(selector, headingContent) {
  // Create a new list item
  let li = document.createElement('li');
  let heading = selector.tagName;

  // Create a link to the heading
  let a = document.createElement('a');
  a.textContent = headingContent;
  a.href = `#${selector?.id}`;

  // Add the link to the list item
  li.appendChild(a);

  // Add the list item to the list
  selector.insertAdjacentHTML('beforeend', li.outerHTML);
}

toc('main', '#toc');

