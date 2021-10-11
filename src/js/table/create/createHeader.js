const dataList = document.getElementById("btn_header")
dataList.addEventListener("change", (element) => {
  const table = document.getElementById('empTable');
  const tableBody = document.getElementById("bodyTable"); //создание внутренних заголовков
  let tr = tableBody.insertRow(-1);
  CreateRemoveHeaderTable(tr);
  CreateHeaderTable(tr, element.target.value);
  table.appendChild(tableBody);
  tableBody.appendChild(tr);
  checkNameRows(element.target.value);
  checkNumberRows()
  includeHeadrSelectChange();
  disableHeadrSelect(element.target.value);
});
function CreateHeaderTable(tr, element) {
  const td = document.createElement('td');
  td.setAttribute("colspan", 6) //заполнение во всю строку
  const input = document.createElement("input");
  input.setAttribute("id", "headingTable")
  input.setAttribute("value", (element == "Пустой заголовок") ? "Введите название" : element); //присваивание название
  tr.appendChild(td);
  td.appendChild(input);
};
function CreateRemoveHeaderTable(tr) {
  const td = document.createElement('td');
  const input = document.createElement("input");
  input.setAttribute("type", "button");
  input.setAttribute("class", "clearBtn");
  input.setAttribute("onclick", "removeHeaderRows(this.parentNode.parentNode)");
  input.setAttribute("tabindex", "-1");
  tr.appendChild(td);
  td.appendChild(input);
};
