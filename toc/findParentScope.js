function findParentScope(tocTree, level) {
  for (let i = tocTree.length - 1; i >= 0; i--) {
    if (tocTree[i].level === level) {
      return tocTree[i].scope;
    }
  }

  return toc;
}

export default findParentScope;