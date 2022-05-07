/**
 * Set the class of the elements
 * 
 * @param {string} className - The class name to add or remove
 * @param {add|remove} type - The type of action to perform
 * @param  {...any} elements - The elements to add or remove the class from
 */

function setClass(className = "highlight", type = "add", elements) {
  elements.forEach((element) => {
    if (element !== undefined) {
      element.classList[type](className);
    }
  });
}

export default setClass;