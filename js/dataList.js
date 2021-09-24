function dataList() {
  var search = document.querySelectorAll('.input_name');
  var results = document.querySelector('#list_name');
  var templateContent = document.querySelector('#list_name__result').content;
  search.forEach(e => {
    e.addEventListener('keyup', function handler(event) {
      while (results.children.length) results.removeChild(results.firstChild);
      var inputVal = new RegExp(e.value.trim(), 'i');
      var clonedOptions = templateContent.cloneNode(true);
      var set = Array.prototype.reduce.call(clonedOptions.children, function searchFilter(frag, el) {
        if (inputVal.test(el.textContent) && frag.children.length < 5) frag.appendChild(el);
        return frag;
      }, document.createDocumentFragment());
      results.appendChild(set);
    });
  })
}