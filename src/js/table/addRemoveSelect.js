function RemoveRows(getId) {
  const empTable = document.getElementById("empTable");
  const idRows = getId.parentNode.parentNode.rowIndex;
  const numberRows = document.querySelectorAll(".number_id").forEach(element => {
    if (element.textContent > idRows) {
      let num = Number(element.textContent);
      num--;
      element.textContent = num;
    }
  });
  empTable.deleteRow(idRows);
};