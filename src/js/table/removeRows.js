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
function removeHeaderRows(getId) {
  const bodyTable = document.getElementById("bodyTable");
  let dataIdRows = [];// мастоположение всех заголовков индексы
  let closestRight;//ближайшее наибольшее число
  document.querySelectorAll("#headingTable").forEach((tableHeader) => {
    dataIdRows.push(tableHeader.parentNode.parentNode.rowIndex);// мастоположение всех заголовков индексы
  });
  for (var i = 0; i < dataIdRows.length; i++) { //опряделяет ближайшее наибольшее число
    if (dataIdRows[i] > getId.rowIndex && (closestRight === undefined || closestRight > dataIdRows[i])) {
      closestRight = dataIdRows[i];//ближайшее наибольшее число
    }
  };
  if (closestRight == undefined) { //есть ли ближайшее наибольшее число
    let bodyTableLength = bodyTable.childNodes.length; //длина всей таблицы
    for (let index = 0; index < (bodyTableLength - getId.rowIndex); index++) {
      removeRows(bodyTableLength - index);
    };
  } else {
    for (let index = 1; index < (closestRight - getId.rowIndex); index++) {
      removeRows(closestRight - index);
    };
  };
  bodyTable.deleteRow(getId.rowIndex - 1);
  includeHeadrSelect(getId);
};