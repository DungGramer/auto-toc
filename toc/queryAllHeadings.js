function queryAllHeadings(headingLevelFrom, headingLevelTo, scopeElement) {
  let headingSelector = "";
  for (let i = headingLevelFrom; i <= headingLevelTo; ++i) {
    headingSelector += `h${i},`;
  }

  return scopeElement.querySelectorAll(headingSelector.slice(0, -1));
}

export default queryAllHeadings;