function removeHeaderRows(getId) {
  swutchedHeaderSelect(getId.childNodes[3].childNodes[1].value)
  let dataIdRows = [];// мастоположение всех заголовков индексы
  let getIdIndex = getId.rowIndex;//индекс выбранной строки
  let closestRight;//ближайшее наибольшее число
  document.querySelectorAll("#headingTable").forEach((tableHeader) => {
    dataIdRows.push(tableHeader.parentNode.parentNode.rowIndex);// мастоположение всех заголовков индексы
  });
  for (var i = 0; i < dataIdRows.length; i++) { //опряделяет ближайшее наибольшее число
    if (dataIdRows[i] > getIdIndex && (closestRight === undefined || closestRight > dataIdRows[i])) {
      closestRight = dataIdRows[i];//ближайшее наибольшее число
    }
  };
  if (closestRight === undefined) { //есть ли ближайшее наибольшее число
    let bodyTableLength = bodyTable.childNodes.length; //длина всей таблицы
    for (let index = 0; index <= bodyTableLength; index++) {
      if (getIdIndex > bodyTableLength - index) {
        return
      }
      removeRows(bodyTableLength - index)
    };
  } else {
    for (let index = 0; index <= (closestRight - getIdIndex); index++) {
      if (closestRight - index == getIdIndex) {
        return
      }
      removeRows(closestRight - index - 1)
    };
  };
};