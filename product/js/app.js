let HeaderTable = new Array(); //создание таблицы.
HeaderTable = ["", '№', 'Название', 'Содержание, %', 'Влажность, %', 'Зольность на сухую м. %', 'Теплота сгорания на сухую беззол.м. мДж/кг'];  //Массив шапки таблицы
 function createTable() {
  const empTable = document.createElement('table');
  empTable.setAttribute('id', 'empTable'); //id таблицы
  let tr = empTable.insertRow(-1);
  for (let h = 0; h < HeaderTable.length; h++) {
    const th = document.createElement('th');
    th.innerHTML = HeaderTable[h];
    tr.appendChild(th);
  };
  const table = document.getElementById('table');
  table.appendChild(empTable);
};
createTable();

;
document.getElementById("btn_string").addEventListener("click", () => {
  lenghtСolumn();
  autoCompliteCell();
});
function lenghtСolumn() {
  const empTab = document.getElementById('empTable');
  let rowCnt = empTab.rows.length;
  let tr = empTab.insertRow(rowCnt);
  for (let c = 0; c < HeaderTable.length; c++) {
    let td = document.createElement('td');
    td = tr.insertCell(c);
    checkCell(td, c, rowCnt);
  };
};

function checkCell(td, c, rowCnt) {
  (c == 0) ?
    tableCellRemove(td)
    : (c == 1) ?
      tableCellId(rowCnt, td)
      : (c == 2) ?
        tableCellName(td)
        : tableCellInput(td)

};
function tableCellRemove(td) {
  const input = document.createElement("input");
  input.setAttribute("type", "button");
  input.setAttribute("class", "clearBtn");
  input.setAttribute("onclick", "RemoveRows(this)");
  input.setAttribute("tabindex", "-1");
  td.appendChild(input);
};
function tableCellId(rowCnt, td) {
  const div = document.createElement("div");
  div.textContent = rowCnt;
  div.setAttribute("class", "number_id");
  td.appendChild(div);
};
function tableCellName(td) {
  const input = document.createElement("input");
  input.setAttribute("list", "list_name");
  input.setAttribute("class", "input_name");
  input.setAttribute("type", "text");
  td.appendChild(input);
};
function tableCellInput(td,) {
  let ele1 = document.createElement("input");
  ele1.setAttribute("class", "input__data");
  ele1.setAttribute("type", "text");
  td.appendChild(ele1);
};






;
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
};;
let btn = document.getElementById("btn").addEventListener("click", () => {
  let database = [];
  const table = document.getElementById("empTable");
  for (let i = 1; row = table.rows[i]; i++) {
    database.push({
      id: row.cells[1].innerText,
      name: row.cells[2].querySelector('input').value,
      massa: Number(row.cells[3].querySelector('input').value.replace(/,/g, ".")),//содержание
      W: Number(row.cells[4].querySelector('input').value.replace(/,/g, ".")),//влажность
      A: Number(row.cells[5].querySelector('input').value.replace(/,/g, ".")),//зольность
      Q: Number(row.cells[6].querySelector('input').value.replace(/,/g, "."))//теплота сгорания на сух массу
    });
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
      1. Общая влажность ТКО(ТБО): ${(humidity / 100).toFixed(2)} %
    </div>
    <div>
      2. Зольность на рабочию массу ТКО(ТБО): ${ashContent.toFixed(2)} %
    </div>
    <div>
      3. Удельная теплота сгорания ТКО(ТБО): ${heat.toFixed(3)} мДж
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
function checkFullmassaErorr(fullMassa, span, id) {
  const table = document.getElementById("table");
  if (fullMassa < 100) {
    addWindow(fullMassa * 1000);
    return false
  }
  if (fullMassa > 100) {
    removeErorr();
    span.setAttribute("class", "massa_error");
    span.innerText = "Содержание не должно превышать 100%" + "\n" + "содержание = " + fullMassa + "%";
    span.style.top = -65 + "px";
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
  заполнить недостающие содежаниее "Прочее"
    <p>"Прочее" = ${(100 * 1000 - fullMassa) / 1000}%</p>
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
  lastItem(inputName, 1, "Прочее");
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
function autoCompliteCell() {
  if (checkBox.classList.contains("check-active")) {
    const valueName = document.querySelectorAll(".input_name");
    for (let i = 0; i < valueName.length; i++) {
      valueName[i].removeEventListener("change", otherAutoDilling);
      valueName[i].addEventListener("change", () => {
        otherAutoDilling(valueName[i]);
      });
    };
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
    name: "пищевые отходы",
    massa: 21.6,
    humidity: 78.6,
    ashContent: 62.4,
    heat: 18.2,
  },
  {
    name: "растительные отходы",
    massa: 2,
    humidity: 62.4,
    ashContent: 19.6,
    heat: 18.7,
  },
  {
    name: "картон крупный",
    massa: 1.5,
    humidity: 28.7,
    ashContent: 10.6,
    heat: 16.9,
  },
  {
    name: "картон мелкий",
    massa: 2.5,
    humidity: 28.4,
    ashContent: 12.3,
    heat: 16.9,
  },
  {
    name: "офисная бумага",
    massa: 0.8,
    humidity: 23.2,
    ashContent: 20.4,
    heat: 16.9,
  },
  {
    name: "газетная бумага",
    massa: 1.1,
    humidity: 38.7,
    ashContent: 7.1,
    heat: 16.9,
  },
  {
    name: "дерево",
    massa: 1.1,
    humidity: 18,
    ashContent: 5,
    heat: 18.9,
  },
  {
    name: "комбинированная упаковка (тетрапак)",
    massa: 0.8,
    humidity: 21.7,
    ashContent: 11.7,
    heat: 30,
  },
  {
    name: "электронные отходы",
    massa: 0.3,
    humidity: 3.5,
    ashContent: 50,
    heat: 33,
  },
  {
    name: "прочие комбинированные материалы",
    massa: 0.6,
    humidity: 3.5,
    ashContent: 50,
    heat: 20.1,
  },
  {
    name: "отсев",
    massa: 18.7,
    humidity: 55.7,
    ashContent: 55.7,
    heat: 20.1,
  },
  {
    name: "черный металл",
    massa: 0.2,
    humidity: 3.5,
    ashContent: 100,
    heat: 0,
  },
  {
    name: "жестяная банка",
    massa: 0.8,
    humidity: 3.5,
    ashContent: 100,
    heat: 0,
  },
  {
    name: "цветной металл",
    massa: 0.2,
    humidity: 3.5,
    ashContent: 100,
    heat: 0,
  },
  {
    name: "алюминиевая банка",
    massa: 0.2,
    humidity: 3.5,
    ashContent: 100,
    heat: 0,
  },
  {
    name: "опасные материалы",
    massa: 0.5,
    humidity: 3.5,
    ashContent: 50,
    heat: 20.1,
  },
  {
    name: "пленка полиэтиленовая",
    massa: 7,
    humidity: 42.9,
    ashContent: 10.8,
    heat: 27.4,
  },
  {
    name: "пленка полипропиленовая",
    massa: 1.1,
    humidity: 33.6,
    ashContent: 3.6,
    heat: 45,
  },
  {
    name: "металлиз. и многослойная пленка",
    massa: 1,
    humidity: 20.8,
    ashContent: 7.2,
    heat: 27.4,
  },
  {
    name: "пэт-бутылка прозрачная",
    massa: 1.5,
    humidity: 4.6,
    ashContent: 0.5,
    heat: 21,
  },
  {
    name: "пэт-бутылка зеленая",
    massa: 0.2,
    humidity: 4.6,
    ashContent: 0.5,
    heat: 21,
  },
  {
    name: "пэт-бутылка синяя",
    massa: 0.1,
    humidity: 4.6,
    ashContent: 0.5,
    heat: 21,
  },
  {
    name: "пэт-бутылка темная",
    massa: 0.3,
    humidity: 4.6,
    ashContent: 0.5,
    heat: 21,
  },
  {
    name: "пэ-бутылки",
    massa: 0.9,
    humidity: 2.4,
    ashContent: 3,
    heat: 27.4,
  },
  {
    name: "полимерная упаковка",
    massa: 1.9,
    humidity: 18.5,
    ashContent: 3.3,
    heat: 27.4,
  },
  {
    name: "прочие полимеры",
    massa: 2.7,
    humidity: 8.2,
    ashContent: 6.9,
    heat: 27.4,
  },
  {
    name: "стеклотара прозрачная",
    massa: 3.8,
    humidity: 3.5,
    ashContent: 100,
    heat: 0,
  },
  {
    name: "стеклотара зеленая и синяя",
    massa: 1.5,
    humidity: 3.5,
    ashContent: 100,
    heat: 0,
  },
  {
    name: "стеклотара темная",
    massa: 1.2,
    humidity: 3.5,
    ashContent: 100,
    heat: 0,
  },
  {
    name: "прочее стекло",
    massa: 1.3,
    humidity: 3.5,
    ashContent: 100,
    heat: 0,
  },
  {
    name: "одежда",
    massa: 1.5,
    humidity: 27.6,
    ashContent: 4.9,
    heat: 22.6,
  },
  {
    name: "прочий текcтиль",
    massa: 1.4,
    humidity: 32.1,
    ashContent: 5.6,
    heat: 22.6,
  },
  {
    name: "строительные отходы",
    massa: 1.9,
    humidity: 4.4,
    ashContent: 100,
    heat: 0,
  },
  {
    name: "прочие инертные материалы",
    massa: 1.4,
    humidity: 32.1,
    ashContent: 5.6,
    heat: 0,
  },
  {
    name: "кожа, резина, обувь",
    massa: 0.8,
    humidity: 10.8,
    ashContent: 22.1,
    heat: 30,
  },
  {
    name: "подгузники одноразовые",
    massa: 4.7,
    humidity: 65.4,
    ashContent: 10.6,
    heat: 20.6,
  },
  {
    name: "прочее",
    heat: 20.1,
    ashContent: 0,
    humidity: 100,
  }
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
  autoCompliteCell();
}
function autoCompleteRemove() {
  checkBoxText.textContent = "Автозаполнение выключено";
   document.querySelectorAll(".input_name").forEach((e) => {
    e.removeEventListener("change", otherAutoDilling);
    console.log("удалилась");
  });
};;