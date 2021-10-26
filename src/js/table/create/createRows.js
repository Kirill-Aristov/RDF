function checkNameRows(item) {
  baseAutoComplite.forEach((nameElement) => {
    if (nameElement.HeaderName == item) {
      lenghtСolumn(nameElement)
    };
  });
};
function lenghtСolumn(nameElement, rowsId) {
  const bodyTable = document.getElementById('bodyTable');
  let tr = bodyTable.insertRow(rowsId);
  for (let c = 0; c < HeaderTable.length; c++) {
    let td = document.createElement('td');
    td = tr.insertCell(c);
    checkCell(td, c, nameElement);
  };
  numberRows();
};

function checkCell(td, c, nameElement) {
    (c == 0) ?
    tableCellRemove(td)
    : (c == 1) ?
      tableCellId(td)
      : (c == 2) ?
        tableCellName(td, nameElement)
        : (c == 7) ?
          ""
          : tableCellInput(td)

};
function tableCellRemove(td) {
  const attribute = [
    ["class", "clearBtn"],
    ["type", "button"],
    ["tabindex", "-1"],
    ["onclick", "removeRows(this.parentNode.parentNode.rowIndex)"]
  ];
  cellAtributes(attribute, "input", td);
};
function tableCellId(td) {
  const attribute = [
    ["id", "number_id"],
  ];
  cellAtributes(attribute, "div", td);
};
function tableCellName(td, nameElement) {
  const attribute = [
    ["class", "input__name"],
    ["type", "text"],
    ["list", "list_name"],
    ["value", nameElement ? nameElement.name : ""]
  ];
  cellAtributes(attribute, "input", td);
};
function tableCellInput(td) {
  const attribute = [
    ["class", "input__data"],
    ["type", "text"],
  ];
  cellAtributes(attribute, "input", td);
};

function cellAtributes(attribute, teg, td) {
  let tegName = document.createElement(teg);
  for (let index = 0; index < attribute.length; index++) {
    tegName.setAttribute(attribute[index][0], attribute[index][1]);
  };
  td.appendChild(tegName);
  setTimeout(() => {
    if (tegName.getAttribute("value") !== null) {
      autoCompliteCell(tegName);
    }
  }, 0);
};



