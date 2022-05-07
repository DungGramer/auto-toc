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

  return li;
}

export default createTocElement;