document.querySelectorAll(".dropdown-item").forEach(item => {
  item.addEventListener("click", () => {
    if (!item.classList.contains("strike")) {
      CreateHeader(item.textContent)
      disableHeaderSelect(item)
    }
  });
})
function CreateHeader(item) {
  let tr = tableBody.insertRow(-1);
  tr.innerHTML += `
  ${CreateRemoveHeaderTable()}
  ${CreateHeaderTable(item)}
  ${CreateBtnRowsPlus()}
  `
  checkNameRows(item); //проверка выбранного именни
}
function CreateHeaderTable(item) {
  return `
  <td colspan="6">
  <input 
    id="headingTable"
    value="${item == "Пустой заголовок" ? "Введите название" : item}"
  >
  </td>
        `
};
function CreateRemoveHeaderTable() {
  return `
  <td>
  <input
    type="button"
    class="clearBtn"
    onclick="removeHeaderRows(this.parentNode.parentNode)"
    tabindex="-1">
  </td>
  `
};
function CreateBtnRowsPlus() {
  return `
  <td>
  <button 
    class="rows-btn__plus"
    type="button"
    onclick="createRowsAdditional(this.parentNode.parentNode.rowIndex)">
    Добавить строку
  </button>
  </td>
  `
}



