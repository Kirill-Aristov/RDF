function numberRows() {
  let numberRows = document.querySelectorAll("#number_id")
  for (let index = 0; index < (numberRows.length + 1); index++) {
    if (numberRows[index] != undefined) {
      numberRows[index].textContent = index + 1
    }
  }
}