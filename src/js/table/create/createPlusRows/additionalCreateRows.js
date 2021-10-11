function checkNumberRows() {
  let lastIndexRows;
  document.querySelectorAll("#headingTable").forEach((e) => {
    lastIndexRows = e.parentNode.parentNode;
  });
  const tableBodyHight = lastIndexRows.offsetTop;
  createRowsAdditional(tableBodyHight);
};
function createRowsAdditional(tableBodyHight) {
  const table = document.getElementById('empTable');
  const btnRows = document.createElement("button");
  btnRows.setAttribute("id", "btn_string");
  btnRows.style.top = (tableBodyHight) + "px";
  table.appendChild(btnRows);
};