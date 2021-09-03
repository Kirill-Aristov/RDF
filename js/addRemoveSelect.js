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
function RemoveRows(getId) {

  if (getId !== undefined) {
    const rowId = getId.id
    removeSelect(rowId)
  } else {
    return
  }
  const empTable = document.getElementById("empTable")
  const idRows = getId.parentNode.parentNode.rowIndex
  const numberRows = document.querySelectorAll(".number_id").forEach(element => {
    if (element.textContent > idRows) {
      let num = Number(element.textContent)
      num--
      element.textContent = num
    }
  })
  empTable.deleteRow(idRows)

}