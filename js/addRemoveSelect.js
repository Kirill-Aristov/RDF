function removeSelect(selectAnswer) {
  let numberSelect = select.options
  for (let i = 0; i < numberSelect.length; i++) {
    let selectValue = numberSelect[i].value
    if (selectAnswer == selectValue) {
      if (numberSelect[i].disabled == true) {
        numberSelect[i].disabled = false
      } else {
        numberSelect[i].disabled = true
      }
    }
  }
}
function addSelect(getId) {
  let rowId = getId.id
  const empTable = document.getElementById("empTable")
  empTable.deleteRow(getId.parentNode.parentNode.rowIndex)
  removeSelect(rowId)
}