function showOrderListNumber(isShow) {
  if (!isShow) return;
  
  const style = document.createElement("style");
  style.textContent = `ol { list-style-type: decimal; }`;

  document.head.appendChild(style);
}

export default showOrderListNumber;