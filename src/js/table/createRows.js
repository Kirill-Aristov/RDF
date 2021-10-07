document.getElementById("btn_string").addEventListener("click", () => {
  lenghtСolumn();
  autoCompliteCell();
});
function lenghtСolumn() {
  const empTab = document.getElementById('empTable');
  let rowCnt = empTab.rows.length;
  let tr = empTab.insertRow(rowCnt);
  for (let c = 0; c < HeaderTable.length; c++) {
    let td = document.createElement('td');
    td = tr.insertCell(c);
    checkCell(td, c, rowCnt);
  };
};

function checkCell(td, c, rowCnt) {
  (c == 0) ?
    tableCellRemove(td)
    : (c == 1) ?
      tableCellId(rowCnt, td)
      : (c == 2) ?
        tableCellName(td)
        : tableCellInput(td)

};
function tableCellRemove(td) {
  const input = document.createElement("input");
  input.setAttribute("type", "button");
  input.setAttribute("class", "clearBtn");
  input.setAttribute("onclick", "RemoveRows(this)");
  input.setAttribute("tabindex", "-1");
  td.appendChild(input);
};
function tableCellId(rowCnt, td) {
  const div = document.createElement("div");
  div.textContent = rowCnt;
  div.setAttribute("class", "number_id");
  td.appendChild(div);
};
function tableCellName(td) {
  const input = document.createElement("input");
  input.setAttribute("list", "list_name");
  input.setAttribute("class", "input_name");
  input.setAttribute("type", "text");
  td.appendChild(input);
};
function tableCellInput(td,) {
  let ele1 = document.createElement("input");
  ele1.setAttribute("class", "input__data");
  ele1.setAttribute("type", "text");
  td.appendChild(ele1);
};






