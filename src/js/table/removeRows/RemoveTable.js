bodyTable.addEventListener("click", (element) => {
  if (element.target.closest(".clearBtn-Header")) {
    removeTable.removeHeader(element.target.parentNode.parentNode.rowIndex)
    disableSelect.unlock(element.target.parentNode.parentNode)
  }
  if (element.target.closest(".clearBtn-Rows")) {
    removeTable.removeRows(element.target.parentNode.parentNode.rowIndex)
  }
});

class RemoveTable extends CreateTable {
  removeRows(rowsId) {
    bodyTable.deleteRow(rowsId - 1);
    numberRows();
  }
  removeHeader(rowsId) {
    let arrayIdRows = [];// мастоположение всех заголовков индексы
    document.querySelectorAll(".headingTable").forEach((tableHeader) => {
      arrayIdRows.push(tableHeader.parentNode.parentNode.rowIndex);// мастоположение всех заголовков индексы
    });
    let firstArray = arrayNumber(arrayIdRows, rowsId);
    let lastArray = maxFromTheOrigin(arrayIdRows, rowsId);
    let index = firstArray;
    while (firstArray <= lastArray) {
      bodyTable.deleteRow(index - 1)
      firstArray++;
    };
    numberRows()
  }
}
const removeTable = new RemoveTable();


function arrayNumber(arrayIdRows, getIdIndex) {
  let left = 0;
  let right = arrayIdRows.length - 1;
  let mid;
  while (left <= right) {
    mid = Math.round((right - left) / 2) + left;
    if (getIdIndex === arrayIdRows[mid]) {
      return getIdIndex;
    } else if (getIdIndex < arrayIdRows[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    };
  };
  return -1;
}
function maxFromTheOrigin(arrayIdRows, getIdIndex) {
  let closestRight = Math.min(...arrayIdRows.filter(i => i > getIdIndex));//ближайшее наибольшее число
  if (closestRight == Infinity) {
    return closestRight = bodyTable.childNodes.length;
  }
  return closestRight - 1;
}