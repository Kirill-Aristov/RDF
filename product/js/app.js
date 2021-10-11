let HeaderTable = new Array(); //создание таблицы.
HeaderTable = ["", '№', 'Название', 'Содержание, %', 'Влажность, %', 'Зольность на сухую м. %', 'Теплота сгорания на сухую беззол.м. мДж/кг'];  //Массив шапки таблицы
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

;
function checkNameRows(element) {
  baseAutoComplite.forEach((nameElement) => {
    if (nameElement.HeaderName == element) {
      lenghtСolumn(nameElement)
    };
  });
};
function lenghtСolumn(nameElement) {
  let headerTableLenght = document.querySelectorAll("#headingTable").length;
  const bodyTable = document.getElementById('bodyTable');
  let rowCnt = bodyTable.rows.length;
  let tr = bodyTable.insertRow(rowCnt);
  for (let c = 0; c < HeaderTable.length; c++) {
    let td = document.createElement('td');
    td = tr.insertCell(c);
    checkCell(td, c, rowCnt, headerTableLenght, nameElement);
  };
};

function checkCell(td, c, rowCnt, headerTableLenght, nameElement) {
  (c == 0) ?
    tableCellRemove(td)
    : (c == 1) ?
      tableCellId(rowCnt, td, headerTableLenght)
      : (c == 2) ?
        tableCellName(td, nameElement)
        : (c == 7) ?
          tableCreateRows()
          : tableCellInput(td)

};
function tableCellRemove(td) {
  const input = document.createElement("input");
  input.setAttribute("type", "button");
  input.setAttribute("class", "clearBtn");
  input.setAttribute("onclick", "removeRows(this.parentNode.parentNode.rowIndex)");
  input.setAttribute("tabindex", "-1");
  td.appendChild(input);
};
function tableCellId(rowCnt, td, headLenght) {
  const div = document.createElement("div");
  div.textContent = rowCnt - headLenght + 1;
  div.setAttribute("class", "number_id");
  td.appendChild(div);
};
function tableCellName(td, nameElement) {
  const input = document.createElement("input");
  input.setAttribute("list", "list_name");
  input.setAttribute("class", "input_name");
  input.setAttribute("type", "text");
  td.appendChild(input);
  if (nameElement) {
    input.value = nameElement.name
    setTimeout(() => {
      autoCompliteCell(input)
    }, 0);
  }
};
function tableCellInput(td) {
  let ele1 = document.createElement("input");
  ele1.setAttribute("class", "input__data");
  ele1.setAttribute("type", "text");
  td.appendChild(ele1);

};





;
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
};;
const dataList = document.getElementById("btn_header")
dataList.addEventListener("change", (element) => {
  const table = document.getElementById('empTable');
  const tableBody = document.getElementById("bodyTable"); //создание внутренних заголовков
  let tr = tableBody.insertRow(-1);
  CreateRemoveHeaderTable(tr);
  CreateHeaderTable(tr, element.target.value);
  table.appendChild(tableBody);
  tableBody.appendChild(tr);
  checkNameRows(element.target.value);
  checkNumberRows()
  includeHeadrSelectChange();
  disableHeadrSelect(element.target.value);
});
function CreateHeaderTable(tr, element) {
  const td = document.createElement('td');
  td.setAttribute("colspan", 6) //заполнение во всю строку
  const input = document.createElement("input");
  input.setAttribute("id", "headingTable")
  input.setAttribute("value", (element == "Пустой заголовок") ? "Введите название" : element); //присваивание название
  tr.appendChild(td);
  td.appendChild(input);
};
function CreateRemoveHeaderTable(tr) {
  const td = document.createElement('td');
  const input = document.createElement("input");
  input.setAttribute("type", "button");
  input.setAttribute("class", "clearBtn");
  input.setAttribute("onclick", "removeHeaderRows(this.parentNode.parentNode)");
  input.setAttribute("tabindex", "-1");
  tr.appendChild(td);
  td.appendChild(input);
};
;
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
;
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
  removeBtn(getId)
};;
function removeBtn(getId) {
  console.log(getId)
};
function disableHeadrSelect(element) {
  dataList.getElementsByTagName("option");
  (element != "Пустой заголовок") ? checkHeaderSelect(element, true) : "";
  dataList.value = "Добавить";
};
function includeHeadrSelectChange() {
  document.querySelectorAll("#headingTable").forEach((head) => {
    head.addEventListener("click", (lastName) => {
      let headerLastNames = lastName.target.value;//запоминает последние название
      head.addEventListener("change", (FersName) => {
        if (FersName.target.value != headerLastNames) { //верно если имена не совподают
          checkHeaderSelect(headerLastNames, false);
        }
      });
    });
  });
};
function includeHeadrSelect(element) {
  element.childNodes.forEach(e => {
    select = e.querySelector("input").value;
    if (select != "") {
      checkHeaderSelect(select, false);
    }
  });
};
function checkHeaderSelect(select, boolean) {
  dataList.getElementsByTagName("option");
  for (let i = 0; i < dataList.length; i++) {
    (dataList[i].value == select) ? dataList[i].disabled = boolean : "";
  };
};;
const btn = document.getElementById("btn").addEventListener("click", () => {
  let database = [];
  const table = document.getElementById("empTable");
  for (let i = 1; row = table.rows[i]; i++) {
    if(row.cells[2]){
      database.push({
        id: row.cells[1].innerText,
        name: row.cells[2].querySelector('.input_name').value,
        massa: Number(row.cells[3].querySelector('.input__data').value.replace(/,/g, ".")),//содержание
        W: Number(row.cells[4].querySelector('.input__data').value.replace(/,/g, ".")),//влажность
        A: Number(row.cells[5].querySelector('.input__data').value.replace(/,/g, ".")),//зольность
        Q: Number(row.cells[6].querySelector('.input__data').value.replace(/,/g, "."))//теплота сгорания на сух массу
      });
    }
  };
  errorCheck(database);
});
;

function calck(bd) {
  const reducerPlus = (accumulator, currentValue) => accumulator + currentValue;
  //именна столбцов
  let fullMassa = 0;
  /////////////
  //Влажность переменные
  let massTimesMoisture = [];// Массив данных влажность умноженная на содержание
  let humidity = 0; // общая Влажность ТКО
  ////////////////////////////////////////////////
  //Зольность переменные
  let leftAshContentTop = []; //левое уравнение верхней части дроби
  let leftAshContentBottom = []; //левое уравнение нижней части дроби 
  let ashContent = 0; //зольность
  //////////////////////////////////////////////////////
  //Теплота сгорания переменные
  let heat = 0; // Теплота сгорания 
  let leftHeat = []; //первая часть уравнения
  let leftPlusHeat = 0; //сложенеие левого массива
  /////////////////////////////////////////////////
  bd.forEach(element => {
    //грфик построенния на содержание
    fullMassa += element.massa;
    //Расчет общей влажности //////////////////
    massTimesMoisture.push(element.massa * element.W);
    humidity = massTimesMoisture.reduce(reducerPlus);
    /////////////////////////////////////
    //Расчёт общей Зольности //////////////////////
    leftAshContentTop.push(element.massa * element.A * (100 - element.W));
    leftAshContentBottom.push(element.massa * (100 - element.W));
    ashContent = (leftAshContentTop.reduce(reducerPlus) / leftAshContentBottom.reduce(reducerPlus)) * (1 - (humidity / 100 / 100));
    ////////////////////////////////////////////////////////////
    //Удельная теплота сгорания 
    leftHeat.push(element.massa * (1 - element.W / 100) * (1 - element.A / 100) * element.Q);
    leftPlusHeat = leftHeat.reduce(reducerPlus);
    heat = (leftPlusHeat - 0.02442 * humidity) / 100;
    ////////////////////////////////////////////////////////
  });
  const main = document.getElementById("main");
  main.innerHTML = `
  <div id="piechart_3d" style="width: 100%; height: 400px; cursor: pointer"></div> 
  <div class="container-calculations">
    <div>
      1. Общая влажность ТКО: ${(humidity / 100).toFixed(2)} %
    </div>
    <div>
      2. Зольность на рабочию массу ТКО: ${ashContent.toFixed(2)} %
    </div>
    <div>
      3. Удельная теплота сгорания ТКО: ${heat.toFixed(3)} мДж
    </div>
  </div>
  `;
  charts(bd, fullMassa);
  main.scrollIntoView();
};;
function charts(bd, fullMassa) {
  let jsonData = {
    "cols": [
      { "id": "", "label": "Название", "type": "string" },
      { "id": "", "label": "Количество", "type": "number" }
    ],
    "rows": []
  }
  bd.forEach(e => {
    jsonData.rows.push({ "c": [{ "v": [e.name, e.massa + "%"] }, { "v": e.massa }] });
  })
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = new google.visualization.DataTable(jsonData);
    var options = {
      title: 'Содержание ' + fullMassa.toFixed(0) + "%",
      is3D: true,
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
    chart.draw(data, options);
  }
};
function checkAshContentErorr(ashContent, span) {
  let ashContentMax = Math.max.apply(Math, ashContent); //максимальное число в массиве у зольности
  let ashContentIndex = ashContent.indexOf(ashContentMax); //индекс максимального чилсва в массиве
  if (ashContentMax > 100) {
    const text = "Зольность содержимого не может превышать 100%";
    windowErorr("achContent_error", ashContentIndex, text, span);
    return false
  }
  return true
};;
function checkHumidityErorr(humidity, span) {
  let humidityMax = Math.max.apply(Math, humidity);//максимальное число в массиве у влажности
  let humidityIndex = humidity.indexOf(humidityMax);//индекс максимального числа в массиве
  if (humidityMax > 100) {
    const text = "Влажность содержимого не может превышать 100%";
    windowErorr("humidityError_error", humidityIndex, text, span);
    return false
  }
  return true
};;
function windowErorr(className, index, text, span) {
  removeErorr();
  span.setAttribute("class", className);
  span.innerText = text;
  span.style.top = (table.offsetTop + 5 + 50 * (index + 1)) + "px";
  table.appendChild(span);
  span.scrollIntoView();
  span.addEventListener("click", () => {
    table.removeChild(span);
  });
};;
function checkFullmassaErorr(fullMassa, span) {
  const table = document.getElementById("table");
  if (fullMassa < 100) {
    addWindow(fullMassa * 1000);
    return false
  }
  if (fullMassa > 100) {
    removeErorr();
    span.setAttribute("class", "massa_error");
    span.innerText = "Содержание не должно превышать 100%" + "\n" + "содержание = " + fullMassa + "%";
    span.style.top = (table.offsetTop - 65) + "px";
    table.appendChild(span);
    span.addEventListener("click", () => {
      table.removeChild(span);
    });
    return false
  }
  return true
};;
function addWindow(fullMassa) {
  const div = document.createElement("div");
  div.setAttribute("class", "container-window");
  div.style.top = table.offsetTop + "px"
  div.innerHTML = `
  <div class="container-window__text">
  Содержание должно быть равным 100%
   <p>ваше содержание = ${fullMassa / 1000}%</p>
  заполнить недостающие содежаниее "жидкость(вода)"
    <p>"жидкость(вода)" = ${(100 * 1000 - fullMassa) / 1000}%</p>
  <div class="container-window__btn">
    <input class="window__btn" type="button" value="Да"></input>
    <input class="window__btn" type="button" value="Нет"></input>
  </div>
  </div>
  `;
  table.appendChild(div);
  windowAnswer(div, fullMassa);
};
function windowAnswer(div, fullMassa) {
  const windowBtn = document.querySelectorAll(".window__btn");
  windowBtn.forEach(e => {
    e.addEventListener("click", () => {
      (e.value == "Нет") ?
        div.remove()
        :
        addRowsWindow(fullMassa);
      div.remove();
    });
  });
};
function addRowsWindow(fullMassa) {
  lenghtСolumn();
  const inputName = document.querySelectorAll(".input_name");
  lastItem(inputName, 1, "жидкость(вода)");
  const inputData = document.querySelectorAll(".input__data");
  lastItem(inputData, 4, (100 * 1000 - fullMassa) / 1000);
};
function lastItem(last, id, attribute) {
  let lastValue = last[last.length - id];
  lastValue.value = attribute;
  otherAutoDilling(lastValue);
};
;
function errorCheck(bd) {
  let fullMassa = 0; //содержание
  let ashContent = []; //зольность
  let humidity = []; // влажность
  let id = []; //номер строки
  bd.forEach(element => {
    id.push(element.id);
    fullMassa += element.massa * 1000;
    ashContent.push(element.A);
    humidity.push(element.W);
  });
  //создание span для Удаление всех span  
  const span = document.createElement("span");
  span.setAttribute("id", "active");

  if (checkAshContentErorr(ashContent, span) && checkHumidityErorr(humidity, span) && checkFullmassaErorr(fullMassa / 1000, span, id)) {
    removeErorr();
    calck(bd);
  }
};





;
function removeErorr() {
  const spanActive = document.querySelectorAll("#active");
  for (let i = 0; i < spanActive.length; i++) {
    spanActive[i].remove();
  };
};;
function autoCompliteCell(input) {
  if (checkBox.classList.contains("check-active")) {
    const valueName = document.querySelectorAll(".input_name");
    for (let i = 0; i < valueName.length; i++) {
      valueName[i].removeEventListener("change", otherAutoDilling);
      valueName[i].addEventListener("change", () => {
        otherAutoDilling(valueName[i]);
      });
    };
    otherAutoDilling(input);
  }
};
function otherAutoDilling(valueName) {
  for (let i = 0; i < baseAutoComplite.length; i++) {
    if (baseAutoComplite[i].name == valueName.value.toLowerCase()) {
      idRows(valueName.parentNode.parentNode, baseAutoComplite[i].heat, baseAutoComplite[i].ashContent, baseAutoComplite[i].humidity, baseAutoComplite[i].massa)
    }
  };
};
function idRows(id, heat, ashContent, humidity, massa) {
  id.childNodes[6].querySelector("input").value = heat;
  id.childNodes[5].querySelector("input").value = ashContent;
  id.childNodes[4].querySelector("input").value = humidity;
  id.childNodes[3].querySelector("input").value = massa;
};

;
const baseAutoComplite = [
  {
    HeaderName: "Органические отходы",
    name: "пищевые отходы",
    massa: 21.6,
    humidity: 78.6,
    ashContent: 62.4,
    heat: 18.2,
  },
  {
    HeaderName: "Органические отходы",
    name: "растительные отходы",
    massa: 2,
    humidity: 62.4,
    ashContent: 19.6,
    heat: 18.7,
  },
  {
    HeaderName: "Полимеры",
    name: "пленка полиэтиленовая",
    massa: 7,
    humidity: 42.9,
    ashContent: 10.8,
    heat: 27.4,
  },
  {
    HeaderName: "Полимеры",
    name: "пленка полипропиленовая",
    massa: 1.1,
    humidity: 33.6,
    ashContent: 3.6,
    heat: 45,
  },
  {
    HeaderName: "Полимеры",
    name: "металлиз. и многослойная пленка",
    massa: 1,
    humidity: 20.8,
    ashContent: 7.2,
    heat: 27.4,
  },
  {
    HeaderName: "Полимеры",
    name: "пэт-бутылка прозрачная",
    massa: 1.5,
    humidity: 4.6,
    ashContent: 0.5,
    heat: 21,
  },
  {
    HeaderName: "Полимеры",
    name: "пэт-бутылка зеленая",
    massa: 0.2,
    humidity: 4.6,
    ashContent: 0.5,
    heat: 21,
  },
  {
    HeaderName: "Полимеры",
    name: "пэт-бутылка синяя",
    massa: 0.1,
    humidity: 4.6,
    ashContent: 0.5,
    heat: 21,
  },
  {
    HeaderName: "Полимеры",
    name: "пэт-бутылка темная",
    massa: 0.3,
    humidity: 4.6,
    ashContent: 0.5,
    heat: 21,
  },
  {
    HeaderName: "Полимеры",
    name: "пэ-бутылки",
    massa: 0.9,
    humidity: 2.4,
    ashContent: 3,
    heat: 27.4,
  },
  {
    HeaderName: "Полимеры",
    name: "полимерная упаковка",
    massa: 1.9,
    humidity: 18.5,
    ashContent: 3.3,
    heat: 27.4,
  },
  {
    HeaderName: "Полимеры",
    name: "прочие полимеры",
    massa: 2.7,
    humidity: 8.2,
    ashContent: 6.9,
    heat: 27.4,
  },
  {
    HeaderName: "Макулатура",
    name: "картон крупный",
    massa: 1.5,
    humidity: 28.7,
    ashContent: 10.6,
    heat: 16.9,
  },
  {
    HeaderName: "Макулатура",
    name: "картон мелкий",
    massa: 2.5,
    humidity: 28.4,
    ashContent: 12.3,
    heat: 16.9,
  },
  {
    HeaderName: "Макулатура",
    name: "офисная бумага",
    massa: 0.8,
    humidity: 23.2,
    ashContent: 20.4,
    heat: 16.9,
  },
  {
    HeaderName: "Макулатура",
    name: "газетная бумага",
    massa: 1.1,
    humidity: 38.7,
    ashContent: 7.1,
    heat: 16.9,
  },
  {
    HeaderName: "Макулатура",
    name: "книги и тетрадки в обложке",
    massa: 0.3,
    humidity: 15.2,
    ashContent: 20.3,
    heat: 16.9,
  },
  {
    HeaderName: "Макулатура",
    name: "глянцевая бумага",
    massa: 0.5,
    humidity: 17.6,
    ashContent: 36.2,
    heat: 16.9,
  },
  {
    HeaderName: "Макулатура",
    name: "прочая макулатура",
    massa: 4.6,
    humidity: 47.1,
    ashContent: 16.9,
    heat: 16.9,
  },

  {
    HeaderName: "Дерево",
    name: "дерево",
    massa: 1.1,
    humidity: 18,
    ashContent: 5,
    heat: 18.9,
  },

  {
    HeaderName: "Текстиль",
    name: "одежда",
    massa: 1.5,
    humidity: 27.6,
    ashContent: 4.9,
    heat: 22.6,
  },
  {
    HeaderName: "Текстиль",
    name: "прочий текcтиль",
    massa: 1.4,
    humidity: 32.1,
    ashContent: 5.6,
    heat: 22.6,
  },
  {
    HeaderName: "Комбинированные материалы",
    name: "комбинированная упаковка (тетрапак)",
    massa: 0.8,
    humidity: 21.7,
    ashContent: 11.7,
    heat: 30,
  },
  {
    HeaderName: "Комбинированные материалы",
    name: "электронные отходы",
    massa: 0.3,
    humidity: 3.5,
    ashContent: 50,
    heat: 33,
  },
  {
    HeaderName: "Комбинированные материалы",
    name: "прочие комбинированные материалы",
    massa: 0.6,
    humidity: 3.5,
    ashContent: 50,
    heat: 20.1,
  },

  {
    HeaderName: "Металлы",
    name: "черный металл",
    massa: 0.2,
    humidity: 3.5,
    ashContent: 100,
    heat: 0,
  },
  {
    HeaderName: "Металлы",
    name: "жестяная банка",
    massa: 0.8,
    humidity: 3.5,
    ashContent: 100,
    heat: 0,
  },
  {
    HeaderName: "Металлы",
    name: "цветной металл",
    massa: 0.2,
    humidity: 3.5,
    ashContent: 100,
    heat: 0,
  },
  {
    HeaderName: "Металлы",
    name: "алюминиевая банка",
    massa: 0.2,
    humidity: 3.5,
    ashContent: 100,
    heat: 0,
  },

  {
    HeaderName: "Стекло",
    name: "стеклотара прозрачная",
    massa: 3.8,
    humidity: 3.5,
    ashContent: 100,
    heat: 0,
  },
  {
    HeaderName: "Стекло",
    name: "стеклотара зеленая и синяя",
    massa: 1.5,
    humidity: 3.5,
    ashContent: 100,
    heat: 0,
  },
  {
    HeaderName: "Стекло",
    name: "стеклотара темная",
    massa: 1.2,
    humidity: 3.5,
    ashContent: 100,
    heat: 0,
  },
  {
    HeaderName: "Стекло",
    name: "прочее стекло",
    massa: 1.3,
    humidity: 3.5,
    ashContent: 100,
    heat: 0,
  },
  {
    HeaderName: "Опасные материалы",
    name: "опасные материалы",
    massa: 0.5,
    humidity: 3.5,
    ashContent: 50,
    heat: 20.1,
  },
  {
    HeaderName: "Инертные материалы",
    name: "строительные отходы",
    massa: 1.9,
    humidity: 4.4,
    ashContent: 100,
    heat: 0,
  },
  {
    HeaderName: "Инертные материалы",
    name: "прочие инертные материалы",
    massa: 3,
    humidity: 8.7,
    ashContent: 100,
    heat: 0,
  },
  {
    HeaderName: "Отсев",
    name: "отсев",
    massa: 18.7,
    humidity: 55.7,
    ashContent: 55.7,
    heat: 20.1,
  },

  {
    HeaderName: "Прочие материалы",
    name: "кожа, резина, обувь",
    massa: 0.8,
    humidity: 10.8,
    ashContent: 22.1,
    heat: 30,
  },
  {
    HeaderName: "Прочие материалы",
    name: "подгузники одноразовые",
    massa: 4.7,
    humidity: 65.4,
    ashContent: 10.6,
    heat: 20.6,
  },
  {
    HeaderName: "Прочие материалы",
    name: "прочее",
    massa: 3.6,
    humidity: 100,
    ashContent: 0,
    heat: 20.1,
  },
  {
    name: "жидкость(вода)",
    humidity: 100,
    ashContent: 0,
    heat: 0,
  },
];



;
const checkBox = document.querySelector(".checkbox-box__slider");
checkBox.addEventListener("click", () => {
  if (!checkBox.classList.contains("check-active")) {
    checkBox.classList.add("check-active");
    autoComplete(checkBox);
  } else {
    checkBox.classList.remove("check-active");
    autoCompleteRemove();
  };
});
const checkBoxText = document.querySelector(".checkbox-box__text");
function autoComplete() {
  checkBoxText.textContent = "Автозаполнение включено";
};
function autoCompleteRemove() {
  checkBoxText.textContent = "Автозаполнение выключено";
  document.querySelectorAll(".input_name").forEach((e) => {
    e.removeEventListener("change", otherAutoDilling);
  });
};;

