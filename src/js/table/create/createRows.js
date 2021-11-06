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
  for (let c = 0; c < 8; c++) {
    let td = document.createElement('td');
    td = tr.insertCell(c);
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
  numberRows();
};

function tableCellRemove(td) {
  const properties = {
    attribute: [
      "class", "type", "tabindex", "onclick"
    ],
    value: [
      "clearBtn", "button", "-1", "removeRows(this.parentNode.parentNode.rowIndex)"
    ],
  }

  cellAtributes(properties, "input", td);
};
function tableCellId(td) {
  const properties = {
    attribute: [
      "id"
    ],
    value: [
      "number_id"
    ],
  }
  cellAtributes(properties, "div", td);
};
function tableCellName(td, nameElement) {
  const properties = {
    attribute: [
      "class", "type", "list", "value",
    ],
    value: [
      "input__name", "text", "list_name", nameElement ? nameElement.name : "",
    ],
  }
  cellAtributes(properties, "input", td);
};
function tableCellInput(td) {
  const properties = {
    attribute: [
      "class", "type",
    ],
    value: [
      "input__data", "text",
    ],
  }
  cellAtributes(properties, "input", td);
};

function cellAtributes(properties, teg, td) {
  let tegName = document.createElement(teg);
  for (let index = 0; index < properties.value.length; index++) {
    tegName.setAttribute(properties.attribute[index], properties.value[index]);
  };
  td.appendChild(tegName);
  setTimeout(() => {
    if (tegName.getAttribute("value") !== null) {
      autoCompliteCell(tegName);
    }
  }, 0);
};



