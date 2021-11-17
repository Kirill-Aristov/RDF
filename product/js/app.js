const table = document.getElementById('empTable'); //таблица
const tableBody = document.getElementById("bodyTable"); // тело таблицы;
const screenWidth = window.innerWidth
if (screenWidth < 600) {
  alert("пожалуйста переведите экран смартфона в горизонтальное положение\nданный сайт не поддерживается на разрешениях ниже 600px")
};
function checkNameRows(item) {
  baseAutoComplite.forEach((nameElement) => {
    if (nameElement.HeaderName == item) {
      return lenghtСolumn(nameElement)
    };
  });
};
function lenghtСolumn(nameElement, rowsId) {
  let tr = bodyTable.insertRow(rowsId);
  tr.innerHTML += `
  ${tableCellRemove()}
  ${tableCellId()}
  ${tableCellName(nameElement)}
  ${tableCellInput()}
  ${tableCellInput()}
  ${tableCellInput()}
  ${tableCellInput()}
  `
  setTimeout(() => {
    autoCompliteCell(tr)
  }, 0);
  return numberRows();
};
function tableCellRemove() {
  return `
  <td>
  <input
    class="clearBtn"
    type="button"
    tabindex="-1"
    onclick="removeRows(this.parentNode.parentNode.rowIndex)">
  </td>
  `
};
function tableCellId() {
  return `
  <td>
  <div id="number_id"></div>
  </td>
  `
};
function tableCellName(nameElement) {

  return `
  <td>
  <input 
    class="input__name"
    type="text"
    list="list_name"
    value="${nameElement ? nameElement.name : ""}">
  </td>
  `
};
function tableCellInput() {
  return `
  <td>
  <input class="input__data" type="number">
  </td>
  `
};



;
function createRowsAdditional(element) {
  lenghtСolumn("", element)
};
document.querySelector("#btn-row").addEventListener("click", () => {
  lenghtСolumn("", 0)
});
document.querySelectorAll(".dropdown-item").forEach(item => {
  item.addEventListener("click", () => {
    if (!item.classList.contains("strike")) {
      CreateHeader(item.textContent)
      disableHeaderSelect(item)
    }
  });
})
function CreateHeader(item) {
  let tr = tableBody.insertRow(-1);
  tr.innerHTML += `
  ${CreateRemoveHeaderTable()}
  ${CreateHeaderTable(item)}
  ${CreateBtnRowsPlus()}
  `
  checkNameRows(item); //проверка выбранного именни
}
function CreateHeaderTable(item) {
  return `
  <td colspan="6">
  <input 
    id="headingTable"
    value="${item == "Пустой заголовок" ? "Введите название" : item}"
  >
  </td>
        `
};
function CreateRemoveHeaderTable() {
  return `
  <td>
  <input
    type="button"
    class="clearBtn"
    onclick="removeHeaderRows(this.parentNode.parentNode)"
    tabindex="-1">
  </td>
  `
};
function CreateBtnRowsPlus() {
  return `
  <td>
  <button 
    class="rows-btn__plus"
    type="button"
    onclick="createRowsAdditional(this.parentNode.parentNode.rowIndex)">
    Добавить строку
  </button>
  </td>
  `
}



;
function numberRows() {
  let numberRows = document.querySelectorAll("#number_id")
  for (let index = 0; index < (numberRows.length + 1); index++) {
    if (numberRows[index] != undefined) {
      numberRows[index].textContent = index + 1
    }
  }
};
function removeRows(getId) {
  bodyTable.deleteRow(getId - 1);
  numberRows()
};
;
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
};;
function disableHeaderSelect(nameElement) {
  if (nameElement.textContent === "Пустой заголовок") {
    return
  } else {
    nameElement.classList.add("strike")
    checkHeaderSeleck()
  }
}
function swutchedHeaderSelect(nameElement) {
  document.querySelectorAll(".dropdown-item").forEach(item => {
    if (nameElement == item.textContent) {
      item.classList.remove("strike")
    }
  })
}
function checkHeaderSeleck() {
  let prevName;
  let postName;
  document.querySelectorAll("#headingTable").forEach(item => {
    item.addEventListener("click", () => {
      prevName = item.value
    })
    item.addEventListener("change", () => {
      postName = item.value
      if (prevName != postName) {
        swutchedHeaderSelect(prevName)
      }
    })
  })
};
document.getElementById("btn-payment").addEventListener("click", () => {
  let database = [];
  const table = document.getElementById("empTable");
  for (let i = 1; row = table.rows[i]; i++) {
    if (row.cells[2].querySelector('.input__name') !== null) {
      if (row.cells[2].querySelector('.input__name').value !== "") {
        database.push({
          id: row.cells[1].innerText,
          name: row.cells[2].querySelector('.input__name').value,
          massa: Number(row.cells[3].querySelector('.input__data').value.replace(/,/g, ".")),//содержание
          W: Number(row.cells[4].querySelector('.input__data').value.replace(/,/g, ".")),//влажность
          A: Number(row.cells[5].querySelector('.input__data').value.replace(/,/g, ".")),//зольность
          Q: Number(row.cells[6].querySelector('.input__data').value.replace(/,/g, "."))//теплота сгорания на сух массу
        });
      }
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
function windowHumidityAshCsontent(inputData) {
  if (inputData) {
    removeErorr();
    let topPosition = inputData.parentNode.offsetTop;
    let leftPosition = inputData.parentNode.offsetLeft;
    const span = document.createElement("span");
    span.setAttribute("id", "active")
    span.style.top = topPosition + "px"
    span.style.left = 93 + leftPosition + "px"
    const text = "Не может превышать 100%";
    span.innerHTML = `
      <div class="alert alert-danger" role="alert">
         ${text}
      </div>
      `
    tableBody.appendChild(span);
    span.scrollIntoView()
    span.addEventListener("click", () => {
      span.remove()
    });
    return false
  } else {
    return true
  }
};

function massaWindowErorr(fullMassa) {
  const div = document.createElement("div");
  div.setAttribute("class", "container-window");
  div.style.top = tableBody.offsetTop + "px";
  div.innerHTML = `
    <div class="container-window__text">
    Содержание должно быть равным 100%
     <p>ваше содержание = ${fullMassa / 1000}%</p>
    заполнить недостающие содежаниее "прочее(остаток)"
      <p>"прочее(остаток)" = ${(100 * 1000 - fullMassa) / 1000}%</p>
    <div class="container-window__btn">
      <input class="window__btn" type="button" value="Да"></input>
      <input class="window__btn" type="button" value="Нет"></input>
    </div>
    </div>
    `;
  tableBody.appendChild(div);
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
}
function addRowsWindow(fullMassa) {
  lenghtСolumn();
  const inputName = document.querySelectorAll(".input__name");
  lastItem(inputName, 1, "прочее(остаток)");
  const inputData = document.querySelectorAll(".input__data")
  setTimeout(() => {
    lastItem(inputData, 4, (100 * 1000 - fullMassa) / 1000);
  }, 0);
};
function lastItem(last, id, attribute) {
  let lastValue = last[last.length - id];
  lastValue.value = attribute;
  otherAutoDilling(lastValue);
};;
function errorCheck(database) {
  let inputData;
  document.querySelectorAll(".input__data").forEach(element => {
    if (element.value > 100) {
      inputData = element
    }
  })
  if (checkFullmassaErorr(database) && windowHumidityAshCsontent(inputData)) {
    removeErorr();
    calck(database);
  }
}
;
function removeErorr() {
  const spanActive = document.querySelectorAll("#active");
  for (let i = 0; i < spanActive.length; i++) {
    spanActive[i].remove();
  };
};;
function windowHumidityAshCsontent(inputData) {
  if (inputData) {
    removeErorr();
    let topPosition = inputData.parentNode.offsetTop;
    let leftPosition = inputData.parentNode.offsetLeft;
    const span = document.createElement("span");
    span.setAttribute("id", "active")
    span.style.top = topPosition + "px"
    span.style.left = 93 + leftPosition + "px"
    const text = "Не может превышать 100%";
    span.innerHTML = `
      <div class="alert alert-danger" role="alert">
         ${text}
      </div>
      `
    tableBody.appendChild(span);
    span.scrollIntoView()
    span.addEventListener("click", () => {
      span.remove()
    });
    return false
  } else {
    return true
  }
};

function massaWindowErorr(fullMassa) {
  const div = document.createElement("div");
  div.setAttribute("class", "container-window");
  div.style.top = tableBody.offsetTop + "px";
  div.innerHTML = `
    <div class="container-window__text">
    Содержание должно быть равным 100%
     <p>ваше содержание = ${fullMassa / 1000}%</p>
    заполнить недостающие содежаниее "прочее(остаток)"
      <p>"прочее(остаток)" = ${(100 * 1000 - fullMassa) / 1000}%</p>
    <div class="container-window__btn">
      <input class="window__btn" type="button" value="Да"></input>
      <input class="window__btn" type="button" value="Нет"></input>
    </div>
    </div>
    `;
  tableBody.appendChild(div);
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
}
function addRowsWindow(fullMassa) {
  lenghtСolumn();
  const inputName = document.querySelectorAll(".input__name");
  lastItem(inputName, 1, "прочее(остаток)");
  const inputData = document.querySelectorAll(".input__data")
  setTimeout(() => {
    lastItem(inputData, 4, (100 * 1000 - fullMassa) / 1000);
  }, 0);
};
function lastItem(last, id, attribute) {
  let lastValue = last[last.length - id];
  lastValue.value = attribute;
  otherAutoDilling(lastValue);
};;
function checkFullmassaErorr(database) {
  //содержание
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  let m = [];
  database.forEach(element => {
    m.push(element.massa * 1000)
  });
  let fullMassa = m.reduce(reducer) / 1000
  const table = document.getElementById("table");
  if (fullMassa < 100) {
    massaWindowErorr(fullMassa * 1000);
    return false
  }
  if (fullMassa > 100) {
    removeErorr();
    const span = document.createElement("span");
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
};
;
const baseAutoComplite = [
  {
    HeaderName: "Органические отходы",
    name: "пищевые отходы",
    massa: 21.6,
    humidity: 78.6,
    ashContent: 17.3,
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
    massa: 3.9,
    humidity: 100,
    ashContent: 0,
    heat: 20.1,
  },
  {
    name: "прочее(остаток)",
    humidity: 100,
    ashContent: 0,
    heat: 0,
  },
  // {
  //   nameThree: "органические отходы",
  //   massa: 23.63,
  //   humidity: 77.2,
  //   ashContent: 17.5,
  //   heat: 18.2,
  // },
  // {
  //   nameThree: "макулатура",
  //   massa: 11.31,
  //   humidity: 25.6,
  //   ashContent: 15.3,
  //   heat: 16.9,
  // },
  // {
  //   nameThree: "полимеры",
  //   massa: 16.71,
  //   humidity: 25.6,
  //   ashContent: 6.9,
  //   heat: 27.4,
  // },
  // {
  //   nameThree: "стекло",
  //   massa: 7.65,
  //   humidity: 3.5,
  //   ashContent: 100,
  //   heat: 0,
  // },
  // {
  //   nameThree: "металлы",
  //   massa: 1.4,
  //   humidity: 3.5,
  //   ashContent: 100,
  //   heat: 0,
  // },
  // {
  //   nameThree: "текстиль",
  //   massa: 2.92,
  //   humidity: 29.7,
  //   ashContent: 5.2,
  //   heat: 22.6,
  // },
  // {
  //   nameThree: "дерево",
  //   massa: 1.08,
  //   humidity: 17.7,
  //   ashContent: 4.9,
  //   heat: 18.9,
  // },
  // {
  //   nameThree: "комбинированные материалы",
  //   massa: 1.67,
  //   humidity: 11.9,
  //   ashContent: 32.4,
  //   heat: 30,
  // },
  // {
  //   nameThree: "опасные материалы",
  //   massa: 0.45,
  //   humidity: 3.5,
  //   ashContent: 50,
  //   heat: 20.1,
  // },
  // {
  //   nameThree: "инертные материалы",
  //   massa: 4.95,
  //   humidity: 7,
  //   ashContent: 100,
  //   heat: 0,
  // },
  // {
  //   nameThree: "прочие материалы",
  //   massa: 9.11,
  //   humidity: 35.9,
  //   ashContent: 27.3,
  //   heat: 30,
  // },
  // {
  //   nameThree: "отсев",
  //   massa: 18.69,
  //   humidity: 55.7,
  //   ashContent: 55.8,
  //   heat: 20.1,
  // },
];

;
function autoCompliteCell(input) {
  if (checkBox.classList.contains("check-active")) {
    const valueName = document.querySelectorAll(".input__name");
    for (let i = 0; i < valueName.length; i++) {
      valueName[i].removeEventListener("change", otherAutoDilling);
      valueName[i].addEventListener("change", () => {
        otherAutoDilling(valueName[i]);
      });
    };
  }
  if (input && checkBox.classList.contains("check-active")) {
    otherAutoDilling(input.childNodes[5].childNodes[1]);
  }
};
function otherAutoDilling(valueName) {
  for (let i = 0; i < baseAutoComplite.length; i++) {
    if (baseAutoComplite[i].name == valueName.value.toLowerCase()) {
      idRows(valueName.parentNode.parentNode, baseAutoComplite[i])
    }
  };
};
function idRows(id, { heat, ashContent, humidity, massa }) {
  id.childNodes[7].querySelector("input").value = massa; //клетка массы
  id.childNodes[9].querySelector("input").value = humidity;//клетка влажности
  id.childNodes[11].querySelector("input").value = ashContent;//клетка зольности
  id.childNodes[13].querySelector("input").value = heat;//клетка теплоты сгорания
};

;
const checkBox = document.querySelector(".checkbox-box__slider");
checkBox.addEventListener("click", () => {
  if (!checkBox.classList.contains("check-active")) {
    checkBox.classList.add("check-active");
    autoComplete();
  } else {
    checkBox.classList.remove("check-active");
    autoCompleteRemove();
  };
});
const checkBoxText = document.querySelector(".checkbox-box__text");
function autoComplete() {
  checkBoxText.textContent = "Автозаполнение справочными данными включено";
  document.querySelectorAll(".input__name").forEach((e) => {
    e.addEventListener("change", otherAutoDilling);
  });
};
function autoCompleteRemove() {
  checkBoxText.textContent = "Автозаполнение справочными данными выключено";
  document.querySelectorAll(".input__name").forEach((e) => {
    e.removeEventListener("change", otherAutoDilling);
  });
};;
document.querySelectorAll(".dropdown-item__ready").forEach(e => {
  e.addEventListener("click", () => {
    let data = [];
    let newData;
    if (e.dataset.value == 40) {
      baseAutoComplite.forEach(element => {
        data.push(element.HeaderName)
      })
      newData = [...new Set(data)].filter((x) => {
        return x !== undefined;
      })
      newData.forEach(item => {
        CreateHeader(item)
      })
    }
  })
})
;

