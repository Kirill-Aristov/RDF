let HeaderTable = new Array(); //создание таблицы.
HeaderTable = ['', 'Название', 'Масса,Т', 'Влажность', 'Зольность'];
window.onload = function createTable() {
  let empTable = document.createElement('table');
  empTable.setAttribute('id', 'empTable'); // таблицы id.

  let tr = empTable.insertRow(-1);
  for (let h = 0; h < HeaderTable.length; h++) {
    let th = document.createElement('th'); //header таблицы
    th.innerHTML = HeaderTable[h];
    tr.appendChild(th);
  }

  let table = document.getElementById('table');
  table.appendChild(empTable);
}
