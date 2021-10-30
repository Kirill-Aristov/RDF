document.querySelectorAll(".dropdown-item").forEach(item => {
  item.addEventListener("click", () => {
    if (!item.classList.contains("strike")) {
      CreateHeader(item.textContent)
    }
    disableHeaderSelect(item)
  });
})
function CreateHeader(item) {
  const table = document.getElementById('empTable');
  const tableBody = document.getElementById("bodyTable"); //создание внутренних заголовков
  let tr = tableBody.insertRow(-1);
  CreateRemoveHeaderTable(tr); //создание мусорки у зоголовка
  CreateHeaderTable(tr, item);// сам заголовок 6 строк
  CreateBtnRowsPlus(tr) //создание кнопки для добавления строки
  table.appendChild(tableBody);
  tableBody.appendChild(tr);
  checkNameRows(item); //проверка выбранного именни
}
function CreateHeaderTable(tr, item) {
  const td = document.createElement('td');
  td.setAttribute("colspan", 6) //заполнение во всю строку
  const input = document.createElement("input");
  input.setAttribute("id", "headingTable")
  input.setAttribute("value", (item == "Пустой заголовок") ? "Введите название" : item); //присваивание название
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
function CreateBtnRowsPlus(tr) {
  const td = document.createElement('td');
  const button = document.createElement("button");
  button.setAttribute("class", "rows-btn__plus")
  button.setAttribute("type", "button")
  button.setAttribute("onclick", "createRowsAdditional(this)") //навешивание события на клик кнопки для добавления строки
  button.textContent = "Добавить строку"
  tr.appendChild(td);
  td.appendChild(button);
}