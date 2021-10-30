function createRowsAdditional(element) {
  let rowsId = element.parentNode.parentNode.rowIndex;
  lenghtСolumn("", rowsId)
};
function rowsPlusNumber(rowNumber) {
  document.querySelectorAll("#number_id").forEach(element => {
    if (element.textContent >= rowNumber) {
      let num = Number(element.textContent);
      num++;
      element.textContent = num;
    }
  });
}
document.querySelector("#btn-row").addEventListener("click", () => {
  lenghtСolumn("", 0)
})