let HeaderTable = new Array(); //создание таблицы.
HeaderTable = ['', 'Название', 'Масса,Т', 'Влажность', 'Зольность'];
window.onload = function createTable() {
  const empTable = document.createElement('table');
  empTable.setAttribute('id', 'empTable');

  let tr = empTable.insertRow(-1);
  for (let h = 0; h < HeaderTable.length; h++) {
    const th = document.createElement('th');
    th.innerHTML = HeaderTable[h];
    tr.appendChild(th);
  }

  const table = document.getElementById('table');
  table.appendChild(empTable);
}
