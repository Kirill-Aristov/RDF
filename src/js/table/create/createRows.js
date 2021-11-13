function checkNameRows(item) {
  baseAutoComplite.forEach((nameElement) => {
    if (nameElement.HeaderName == item) {
      return lenghtСolumn(nameElement)
    };
  });
};
function lenghtСolumn(nameElement, rowsId) {
  let tr = bodyTable.insertRow(rowsId);
  tr.innerHTML += `
  ${tableCellRemove()}
  ${tableCellId()}
  ${tableCellName(nameElement)}
  ${tableCellInput()}
  ${tableCellInput()}
  ${tableCellInput()}
  ${tableCellInput()}
  `
  setTimeout(() => {
    autoCompliteCell(tr)
  }, 0);
  return numberRows();
};
function tableCellRemove() {
  return `
  <td>
  <input
    class="clearBtn"
    type="button"
    tabindex="-1"
    onclick="removeRows(this.parentNode.parentNode.rowIndex)">
  </td>
  `
};
function tableCellId() {
  return `
  <td>
  <div id="number_id"></div>
  </td>
  `
};
function tableCellName(nameElement) {

  return `
  <td>
  <input 
    class="input__name"
    type="text"
    list="list_name"
    value="${nameElement ? nameElement.name : ""}">
  </td>
  `
};
function tableCellInput() {
  return `
  <td>
  <input class="input__data" type="number">
  </td>
  `
};



