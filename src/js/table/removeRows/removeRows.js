function removeRows(getId) {
  let headerTableLenght = document.querySelectorAll("#headingTable").length; // определяет количество заголовков
  const bodyTable = document.getElementById("bodyTable");
  document.querySelectorAll(".number_id").forEach(element => {
    if (element.textContent > getId - headerTableLenght) {
      let num = Number(element.textContent);
      num--;
      element.textContent = num;
    }
  });
  bodyTable.deleteRow(getId - 1);
};
