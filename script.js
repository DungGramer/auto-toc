let main = document.querySelector("main");

// Create table of contents

let headings = [...document.querySelectorAll("h1, h2, h3, h4, h5, h6")];
let toc = document.createElement("ul");

headings.reduce((acc, heading) => {
  let ul = document.createElement("ul");
  console.log(ul);
  if (heading.tagName > acc.tagName) {
    createTOC(ul, heading);
    toc.appendChild(ul);
  } else if (heading.tagName === acc.tagName) {
    createTOC(toc, heading);
  } else {
    createTOC(toc, heading);
  }

  return heading;
}, headings[0]);

function createTOC(parent, content) {
  let li = document.createElement("li");
  let a = document.createElement("a");
  a.textContent = content.textContent;
  a.href = `#${content.id}`;
  li.appendChild(a);
  parent.appendChild(li);
}

main.insertAdjacentElement("afterbegin", toc);
