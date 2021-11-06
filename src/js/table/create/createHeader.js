document.querySelectorAll(".dropdown-item").forEach(item => {
  item.addEventListener("click", () => {
    if (!item.classList.contains("strike")) {
    //   let tr = tableBody.insertRow(-1)
    //   const createHeader = new CreateHeader(item.textContent)
    //   tr.innerHTML += `
    //  ${createHeader.CreateRemoveHeaderTable()} 
    //  ${createHeader.CreateHeaderRows()}
    //  ${createHeader.CreateBtnRowsPlus()}
    //   `;
      CreateHeader(item.textContent)
      // checkNameRows(item.textContent);
      disableHeaderSelect(item)
    }
  });
})

// class CreateHeader {
//   constructor(item) {
//     this.item = item;
//   }
//   CreateRemoveHeaderTable() {
//     return `
//       <td>
//           <input
//            type="button" 
//            class="clearBtn" 
//            tabindex="-1" 
//            onclick="removeHeaderRows(this.parentNode.parentNode)">
//       </td>
//           `
//   }
//   CreateHeaderRows() {
//     return `
//       <td 
//       colspan=6>
//           <input 
//           id="headingTable"
//           value="${this.item}" >
//       </td>
//           `
//   }
//   CreateBtnRowsPlus() {
//     return `
//       <td>
//          <button 
//           class="rows-btn__plus"
//           type="button"
//           onclick="createRowsAdditional(this)">
//            Добавить строку
//            </button>
//       </td>
//           `
//   }
// }
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
function CreateHeaderTable(tr, item) {
  const td = document.createElement('td');
  td.setAttribute("colspan", 6) //заполнение во всю строку
  const input = document.createElement("input");
  input.setAttribute("id", "headingTable")
  input.setAttribute("value", (item == "Пустой заголовок") ? "Введите название" : item); //присваивание название
  tr.appendChild(td);
  td.appendChild(input);
};
function CreateHeader(item) {
  let tr = tableBody.insertRow(-1);
  table.appendChild(tableBody);
  tableBody.appendChild(tr);
  CreateRemoveHeaderTable(tr); //создание мусорки у зоголовка
  CreateHeaderTable(tr, item);// сам заголовок 6 строк
  CreateBtnRowsPlus(tr) //создание кнопки для добавления строки
  checkNameRows(item); //проверка выбранного именни
}
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



