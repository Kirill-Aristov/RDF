let HeaderTable = new Array(); //создание таблицы.
HeaderTable = ["", '№', 'Название', 'Содержание, %', 'Влажность, %', 'Зольность на сухую м. %', 'Теплота сгорания на с/без.м., мДж/кг', ""];  //Массив шапки таблицы
function createTable() {
  const empTable = document.createElement('table');
  empTable.setAttribute('id', 'empTable'); //id таблицы
  const thead = document.createElement("thead");//header таблицы
  const tbody = document.createElement("tbody");//body таблицы
  tbody.setAttribute("id", "bodyTable");
  let tr = thead.insertRow(-1);
  for (let h = 0; h < HeaderTable.length; h++) {
    const th = document.createElement('th');
    th.innerHTML = HeaderTable[h];
    tr.appendChild(th);
  };
  const table = document.getElementById('table');
  table.appendChild(empTable);
  empTable.appendChild(thead);
  empTable.appendChild(tbody);
};
createTable();

