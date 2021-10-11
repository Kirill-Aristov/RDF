function checkNameRows(element) {
  baseAutoComplite.forEach((nameElement) => {
    if (nameElement.HeaderName == element) {
      lenghtСolumn(nameElement)
    };
  });
};
function lenghtСolumn(nameElement) {
  let headerTableLenght = document.querySelectorAll("#headingTable").length;
  const bodyTable = document.getElementById('bodyTable');
  let rowCnt = bodyTable.rows.length;
  let tr = bodyTable.insertRow(rowCnt);
  for (let c = 0; c < HeaderTable.length; c++) {
    let td = document.createElement('td');
    td = tr.insertCell(c);
    checkCell(td, c, rowCnt, headerTableLenght, nameElement);
  };
};

function checkCell(td, c, rowCnt, headerTableLenght, nameElement) {
  (c == 0) ?
    tableCellRemove(td)
    : (c == 1) ?
      tableCellId(rowCnt, td, headerTableLenght)
      : (c == 2) ?
        tableCellName(td, nameElement)
        : (c == 7) ?
          tableCreateRows()
          : tableCellInput(td)

};
function tableCellRemove(td) {
  const input = document.createElement("input");
  input.setAttribute("type", "button");
  input.setAttribute("class", "clearBtn");
  input.setAttribute("onclick", "removeRows(this.parentNode.parentNode.rowIndex)");
  input.setAttribute("tabindex", "-1");
  td.appendChild(input);
};
function tableCellId(rowCnt, td, headLenght) {
  const div = document.createElement("div");
  div.textContent = rowCnt - headLenght + 1;
  div.setAttribute("class", "number_id");
  td.appendChild(div);
};
function tableCellName(td, nameElement) {
  const input = document.createElement("input");
  input.setAttribute("list", "list_name");
  input.setAttribute("class", "input_name");
  input.setAttribute("type", "text");
  td.appendChild(input);
  if (nameElement) {
    input.value = nameElement.name
    setTimeout(() => {
      autoCompliteCell(input)
    }, 0);
  }
};
function tableCellInput(td) {
  let ele1 = document.createElement("input");
  ele1.setAttribute("class", "input__data");
  ele1.setAttribute("type", "text");
  td.appendChild(ele1);

};





