document.querySelectorAll(".btn-control__menu-item").forEach(item => {
  item.addEventListener("click", () => {
    if (!item.classList.contains("strike")) {
      disableSelect.disable(item.textContent);
      createTable.CreateHeader(item.textContent);
      createTable.chekNameHeader(item.textContent);
      numberRows();
    }
  });
})
class CreateTable {
  constructor(item, rowsId) {
    this.item = item;
    this.rowsId = rowsId
  }
  chekNameHeader(item) {
    baseAutoComplite.forEach((nameElement) => {
      if (nameElement.HeaderName === item) {
        createTable.createRowsTable(nameElement)
      }
    })
  }
  CreateHeader(item) {
    const tr = bodyTable.insertRow(-1)
    tr.innerHTML += `
      <td>
        <input type="button" class="clearBtn clearBtn-Header">
      </td>
      <td colspan="5">
        <input class="headingTable" value="${item == "Пустой заголовок" ? "Введите название" : item}">
      </td>
      <td>
        <button class="rows-btn__plus" type="button">
          Добавить строку
        </button>
      </td>
                  `
  }
  createRowsTable(nameElement, rowsId) {
    if (!checkBox.classList.contains("check-active") && nameElement) {
      nameElement.massa = ""
      nameElement.humidity = ""
      nameElement.ashContent = ""
      nameElement.heat = ""
    }
    let tr = bodyTable.insertRow(rowsId);
    tr.innerHTML += `
      <td>
        <input class="clearBtn clearBtn-Rows" type="button">
      </td>
      <td>
        <div class="number_id"></div>
      </td>
      <td>
        <input class="input__name" type="text" list="list_name" value="${nameElement ? nameElement.name : ""}">
      </td>
      <td>
        <input class="input__data content" type="number" value="${nameElement ? nameElement.massa : ""}">
      </td>
      <td>
        <input class="input__data humidity" type="number" value="${nameElement ? nameElement.humidity : ""}">
      </td>
      <td>
        <input class="input__data ashContent" type="number" value="${nameElement ? nameElement.ashContent : ""}">
      </td>
      <td>
        <input class="input__data heatСombustion" type="number" value="${nameElement ? nameElement.heat : ""}">
      </td>
                        `
    tr.classList.add("rows-active")
  };
}
const createTable = new CreateTable();

bodyTable.addEventListener("click", (element) => {
  if (element.target.closest(".rows-btn__plus")) {
    let targetElementId = element.target.parentNode.parentNode.rowIndex;
    createTable.createRowsTable("", targetElementId)
    numberRows();
  }
});
document.querySelector(".btn-rows__plus").addEventListener("click", () => {
  createTable.createRowsTable("", 0)
  numberRows();
})