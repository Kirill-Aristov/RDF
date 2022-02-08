// localStorage
class LocalStorageUtils {
  constructor(saveData) {
    this.dataName = "optionalAutocomplete";
    this.saveData = saveData;
  }
  getStorage(dataName) {
    let storageData = localStorage.getItem(dataName)
    return JSON.parse(storageData)
  }

  setStorage(dataName, saveData) {
    localStorage.setItem(dataName, JSON.stringify(saveData))
  }
}
const localStorageUtils = new LocalStorageUtils();;

class SettigsStorage {
  constructor() {
    this.div = document.createElement("div");
  }
  startSheckStorageSettigs() {
    if (localStorage.getItem("optionalAutocomplete") == null) {
      let optionalData = {
        name: "прочее(остаток)",
        humidity: "100",
        ashContent: "0",
        heat: "0",
      }
      localStorageUtils.setStorage("optionalAutocomplete", optionalData)
    }
  }
  settigsWindow(div, massa) {
    let settigsData = localStorageUtils.getStorage("optionalAutocomplete");
    div.innerHTML = `
    <h2> Настройка дополнительного автозаполнения недостающего содержания</h2>
    <div class="settings-window">
      <div class="settings-window__text">
      Название
      </div>
        <input class="settings-window__input" type="text" value="${settigsData.name}">
      <div class="settings-window__text">
      Влажность, %
      </div>
        <input class="settings-window__input" type="number" value="${settigsData.humidity}">
      <div class="settings-window__text">
      Зольность на сухую массу, %
      </div>
        <input class="settings-window__input" type="number" value="${settigsData.ashContent}">
      <div class="settings-window__text">
      Теплота сгорания на сухую беззольную массу, мДж/кг
      </div>
        <input class="settings-window__input" type="number" value="${settigsData.heat}">
    </div>
    <div class="settings-block">
      <button type="button" class="settings-block__btn back" type="button">Назад</button>
      <button type="button" class="settings-block__btn save" type="button">Сохранить</button>
    </div>`
    document.querySelector(".back").addEventListener("click", () => {
      errorMassa.lessMassa(massa)
    })
    document.querySelector(".save").addEventListener("click", () => {
      const dataSettigs = document.querySelectorAll(".settings-window__input");
      settigsData = {
        name: dataSettigs[0].value,
        humidity: dataSettigs[1].value,
        ashContent: dataSettigs[2].value,
        heat: dataSettigs[3].value,
      };
      localStorageUtils.setStorage("optionalAutocomplete", settigsData);
      errorMassa.lessMassa(massa);
    })
  }
}
const settigsStorage = new SettigsStorage();
settigsStorage.startSheckStorageSettigs();;
//

const blockTable = document.querySelector('.table'); //блок таблицы
const table = document.querySelector('.empTable'); //таблица
const bodyTable = document.querySelector(".bodyTable"); // тело таблицы
const container = document.querySelector(".main-container")
;
//проверка мобильних устройсв
const screenWidth = window.innerWidth
if (screenWidth < 600) {
  alert("пожалуйста переведите экран смартфона в горизонтальное положение\nданный сайт не поддерживается на разрешениях ниже 600px")
};
//
//создание строк в таблицы
document.querySelectorAll(".btn-control__menu-item").forEach(item => {
  item.addEventListener("click", () => {
    if (!item.classList.contains("strike")) {
      disableSelect.disable(item.textContent);
      createTable.CreateHeader(item.textContent);
      createTable.chekNameHeader(item.textContent);
      numberRows();
    }
  });
})
class CreateTable {
  constructor(item, rowsId) {
    this.item = item;
    this.rowsId = rowsId
  }
  chekNameHeader(item) {
    baseAutoComplite.forEach((nameElement) => {
      if (nameElement.HeaderName === item) {
        createTable.createRowsTable(nameElement)
      }
    })
  }
  CreateHeader(item) {
    const tr = bodyTable.insertRow(-1)
    tr.innerHTML += `
      <td>
        <input type="button" class="clearBtn clearBtn-Header">
      </td>
      <td colspan="5">
        <input class="headingTable" value="${item == "Пустой заголовок" ? "Введите название" : item}">
      </td>
      <td>
        <button class="rows-btn__plus" type="button">
          Добавить строку
        </button>
      </td>
                  `
  }
  createRowsTable(nameElement, rowsId) {
    if (!checkBox.classList.contains("check-active") && nameElement) {
      nameElement.massa = ""
      nameElement.humidity = ""
      nameElement.ashContent = ""
      nameElement.heat = ""
    }
    let tr = bodyTable.insertRow(rowsId);
    tr.innerHTML += `
      <td>
        <input class="clearBtn clearBtn-Rows" type="button">
      </td>
      <td>
        <div class="number_id"></div>
      </td>
      <td>
        <input class="input__name" type="text" list="list_name" value="${nameElement ? nameElement.name : ""}">
      </td>
      <td>
        <input class="input__data content" type="number" value="${nameElement ? nameElement.massa : ""}">
      </td>
      <td>
        <input class="input__data humidity" type="number" value="${nameElement ? nameElement.humidity : ""}">
      </td>
      <td>
        <input class="input__data ashContent" type="number" value="${nameElement ? nameElement.ashContent : ""}">
      </td>
      <td>
        <input class="input__data heatСombustion" type="number" value="${nameElement ? nameElement.heat : ""}">
      </td>
                        `
    tr.classList.add("rows-active")
  };
}
const createTable = new CreateTable();

bodyTable.addEventListener("click", (element) => {
  if (element.target.closest(".rows-btn__plus")) {
    let targetElementId = element.target.parentNode.parentNode.rowIndex;
    createTable.createRowsTable("", targetElementId)
    numberRows();
  }
});
document.querySelector(".btn-rows__plus").addEventListener("click", () => {
  createTable.createRowsTable("", 0)
  numberRows();
});
//
//нумерация строк
function numberRows() {
  let numberId = document.querySelectorAll(".number_id")
  for (let index = 0; index < numberId.length; index++) {
    numberId[index].textContent = index + 1
  }
};
//
//удаление строк в таблице
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
};
//
//отключение заголовков
class DisableSelect {
  disable(item) {
    document.querySelectorAll(".btn-control__menu-item").forEach(element => {
      if (element.textContent == "Пустой заголовок") {
        return
      }
      if (element.textContent == item) {
        element.classList.add("strike")
        // this.checkDisable()
      }
    });
  }
  unlock(item) {
    let activeItem = item.querySelector(".headingTable").value;
    document.querySelectorAll(".btn-control__menu-item").forEach(element => {
      if (element.textContent == activeItem) {
        element.classList.remove("strike")
      }
    });
  }
  checkDisable() {
  }
}
const disableSelect = new DisableSelect();;
//
//Расчеты
document.querySelector(".payment").addEventListener("click", () => {
  const database = [];
  let rowsId = document.querySelectorAll(".rows-active");
  let number = document.querySelectorAll(".number_id"),
    name = document.querySelectorAll(".input__name"),
    content = document.querySelectorAll(".content"),
    humidity = document.querySelectorAll(".humidity"),
    ashContent = document.querySelectorAll(".ashContent"),
    heatСombustion = document.querySelectorAll(".heatСombustion");
  for (let line = 0; line < rowsId.length; line++) {
    database.push({
      numberСolumn: number[line].textContent,
      nameСolumn: name[line].value,
      massa: Number(content[line].value.replace(/,/g, ".")),
      humidityСolumn: Number(humidity[line].value.replace(/,/g, ".")),
      ashContentСolumn: Number(ashContent[line].value.replace(/,/g, ".")),
      heatСombustionСolumn: Number(heatСombustion[line].value.replace(/,/g, ".")),
    });
  };

  sheckMassa.massaErrorCheck(database);
});;

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
  /////////////////////////////////////////////////
  bd.forEach(element => {
    //грфик построенния на содержание
    fullMassa += element.massa;
    //Расчет общей влажности //////////////////
    massTimesMoisture.push(element.massa * element.humidityСolumn);
    humidity = massTimesMoisture.reduce(reducerPlus);
    /////////////////////////////////////
    //Расчёт общей Зольности //////////////////////
    leftAshContentTop.push(element.massa * element.ashContentСolumn * (100 - element.humidityСolumn));
    leftAshContentBottom.push(element.massa * (100 - element.humidityСolumn));
    ashContent = (leftAshContentTop.reduce(reducerPlus) / leftAshContentBottom.reduce(reducerPlus)) * (1 - (humidity / 100 / 100));
    ////////////////////////////////////////////////////////////
    //Удельная теплота сгорания 
    leftHeat.push(element.massa * (1 - element.humidityСolumn / 100) * (1 - element.ashContentСolumn / 100) * element.heatСombustionСolumn);
    heat = (leftHeat.reduce(reducerPlus) - 0.02442 * humidity) / 100;
    ////////////////////////////////////////////////////////
  });
  const width = window.innerWidth;
  const height = window.innerHeight;
  const main = document.querySelector(".main");
  main.innerHTML = `
  <div class="chart"> 
   <canvas id="myChart" style="padding: 10px;" width="${width / 1.35} " height="${height}"></canvas>
   </div >
  <div class="container-calculations">
    <div>
      1. Общая влажность ТКО: ${(humidity / 100).toFixed(2)} %
    </div>
    <div>
      2. Зольность на рабочию массу ТКО: ${ashContent.toFixed(2)} %
    </div>
    <div>
      3. Теплота сгорания на рабочую массу: ${heat.toFixed(3)} мДж
    </div>
  </div>
`;
  charts(bd, fullMassa);
  main.scrollIntoView();
};;
function charts(bd, fullMassa) {
  const ctx = document.getElementById('myChart').getContext('2d');
  let sortElement = [],
    nameElement = [],
    massaElement = [];
  bd.forEach(element => {
    sortElement.push([element.massa, element.nameСolumn]);
  });
  sortElement.sort((a, b) => {
    return b[0] - a[0];
  });
  sortElement.forEach(item => {
    massaElement.push(item[0]);
    nameElement.push(item[1]);
  });
  let colorBack = []
  for (let i = 0; i < nameElement.length; i++) {
    colorBack.push(randColor());
  }
  const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: nameElement,
      datasets: [{
        data: massaElement,
        backgroundColor: colorBack,
        borderColor: colorBack,
        borderWidth: 1
      }]
    },
    options: {
      maintainAspectRatio: false,
      responsive: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: "#000",
            font: {
              family: "Arial",
              size: 14,
            }
          }
        }
      }
    }
  });
  function randColor() {
    let r = Math.floor(Math.random() * (256)),
      g = Math.floor(Math.random() * (256)),
      b = Math.floor(Math.random() * (256)),
      color = '#' + r.toString(16) + g.toString(16) + b.toString(16);

    return color
  }
};
//
//Проверка ошибок

bodyTable.addEventListener("input", (element) => {
  if (element.target.closest(".humidity")) {//проверка на превышения содержания ВЛАЖНОСТИ
    let textHumidity = "Влажность компонента не должна превышать 100%";
    windowError.windowErrorPosition(element.target, textHumidity);
  }
  if (element.target.closest(".ashContent")) { //проверка на превышения содержания ЗОЛЬНОСТИ
    let textAshContent = "Зольность компонента на сухую массу не должна превышать 100%";
    windowError.windowErrorPosition(element.target, textAshContent);
  }
});

class WindowError {
  constructor(element, text, position) {
    this.element = element;
    this.text = text;
    this.position = position;
  }
  windowErrorPosition(element, text) {
    if (element.value > 100) {
      this.position = element.parentNode.offsetLeft;
      let rowsPosition = element.parentNode.parentNode.closest(".rows-active")
      const div = document.createElement("div");
      div.classList.add("error");
      //растояние от левого блока + длина блока
      div.style.left = this.position + 70 + "px";
      div.textContent = text;
      rowsPosition.appendChild(div)
      let opacityNum = 1
      setTimeout(SetInterval, 2500, opacityNum)
    }
  }
}
const windowError = new WindowError;


class SheckMassa {
  constructor(database) {
    this.database = database;
  };
  massaErrorCheck(database) {
    let massa = 0;
    database.forEach(index => {
      massa += (index.massa * 1000);
    });
    if (massa / 1000 > 100) {
      errorMassa.exceedMassa(massa / 1000);
    } else if (massa / 1000 < 100) {
      errorMassa.lessMassa(massa / 1000);
    } else {
      calck(database);
    };
  }
};
const sheckMassa = new SheckMassa();

class ErrorMassa extends SettigsStorage {
  super(massa) {
    this.massa = massa
  }
  lessMassa(massa) {
    let optionalData = localStorageUtils.getStorage("optionalAutocomplete");
    this.div.classList.add("error-container");
    this.div.innerHTML = `
    <div class="error-container__text">
      Общее содержание компонентов должно быть равно 100%
      <p>Ваше содержание = ${massa}%</p>
      <p>Заполнить автоматический недостающие содержание компонентом "${optionalData.name}"
      </p>
    </div>
    <div>
      <button type="button" class="error-settings__btn">Настроить автозаполнение
      </button>
    </div>
    <div>
      <div class="error-container__btn">
      <button type="button" class="window-error__btn" value="нет">Нет</button>
      <button type="button" class="window-error__btn" value="да">Да</button>
    </div>
    `
    document.body.appendChild(this.div)
    buttonControl.windowError(this.div, massa)
  }
  exceedMassa(massa) {
    const divError = document.createElement("div")
    divError.classList.add("error")
    divError.classList.add("error-massa")
    divError.textContent = `содержание не должно превышать 100% \n ваше содержание = ${massa} %`
    table.appendChild(divError)
    let opacityNum = 1
     setTimeout(SetInterval, 2500, opacityNum)
  }
}
const errorMassa = new ErrorMassa();
class ButtonControl extends ErrorMassa {
  windowError(div, massa) {
    document.querySelector(".error-settings__btn").addEventListener("click", () => {
      settigsStorage.settigsWindow(div, massa)
    });
    document.querySelectorAll(".window-error__btn").forEach(target => {
      target.addEventListener("click", (element) => {
        if (element.target.value === "нет") {
          div.remove();
        } else {
          createTable.createRowsTable(localStorageUtils.getStorage("optionalAutocomplete"), 0);
          document.querySelector(".content").value = (100*1000 - (massa * 1000)) / 1000;
          numberRows();
          div.remove();
        }
      })
    })
  }
}
const buttonControl = new ButtonControl();;
//
//
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
  },]
const baseNameThree = [{
  nameThree: "органические отходы",
  name: "органические отходы",
  massa: 23.63,
  humidity: 77.2,
  ashContent: 17.5,
  heat: 18.2,
},
{
  nameThree: "макулатура",
  name: "макулатура",
  massa: 11.31,
  humidity: 25.6,
  ashContent: 15.3,
  heat: 16.9,
},
{
  nameThree: "полимеры",
  name: "полимеры",
  massa: 16.71,
  humidity: 25.6,
  ashContent: 6.9,
  heat: 27.4,
},
{
  nameThree: "стекло",
  name: "стекло",
  massa: 7.65,
  humidity: 3.5,
  ashContent: 100,
  heat: 0,
},
{
  nameThree: "металлы",
  name: "металлы",
  massa: 1.4,
  humidity: 3.5,
  ashContent: 100,
  heat: 0,
},
{
  nameThree: "текстиль",
  name: "текстиль",
  massa: 2.92,
  humidity: 29.7,
  ashContent: 5.2,
  heat: 22.6,
},
{
  nameThree: "дерево",
  name: "дерево",
  massa: 1.08,
  humidity: 17.7,
  ashContent: 4.9,
  heat: 18.9,
},
{
  nameThree: "комбинированные материалы",
  name: "комбинированные материалы",
  massa: 1.67,
  humidity: 11.9,
  ashContent: 32.4,
  heat: 30,
},
{
  nameThree: "опасные материалы",
  name: "опасные материалы",
  massa: 0.45,
  humidity: 3.5,
  ashContent: 50,
  heat: 20.1,
},
{
  nameThree: "инертные материалы",
  name: "инертные материалы",
  massa: 4.95,
  humidity: 7,
  ashContent: 100,
  heat: 0,
},
{
  nameThree: "прочие материалы",
  name: "прочие материалы",
  massa: 9.11,
  humidity: 35.9,
  ashContent: 27.3,
  heat: 30,
},
{
  nameThree: "отсев",
  name: "отсев",
  massa: 18.69,
  humidity: 55.7,
  ashContent: 55.8,
  heat: 20.1,
},
];

;
// 
document.querySelectorAll(".ready-table").forEach(element => {
  element.addEventListener("click", () => readyTable.dataValue(element))
})
class ReadyTable {
  constructor() {
    this.dataReady = [];
    this.newData = [];
  }
  dataValue(element) {
    if (element.dataset.value == 40) {
      baseAutoComplite.forEach(element => {
        this.dataReady.push(element.HeaderName);
      });
      this.newData = [...new Set(this.dataReady)].filter((x) => {
        return x !== undefined;
      });
      this.newData.forEach(item => {
        createTable.CreateHeader(item);
        createTable.chekNameHeader(item);
      });
      numberRows();
    }
    if (element.dataset.value == 13) {
      createTable.CreateHeader("Упрощенный компонентный состав");
      baseNameThree.forEach(element => {
        createTable.createRowsTable(element);
      });
      numberRows();
    }
  }
}
const readyTable = new ReadyTable();;
//общие компоненты
 function SetInterval(opacityNum) {
  const div = document.querySelector(".error")
  if (opacityNum > 0) {
    div.style.opacity = opacityNum
    setTimeout(SetInterval, 50, opacityNum - 0.1)
  } else {
    div.remove()
  }
};
//
//компонеты кнопок и дополнений
const header = document.querySelector(".nav")
const burger = document.querySelector(".burger")
burger.addEventListener("click", () => {
  if (!burger.classList.contains("active")) {
    burger.classList.add("active");
    header.classList.add("active");
  } else {
    burger.classList.remove("active");
    header.classList.remove("active");
  };
});
  container.addEventListener("click", (element) => {
    if (element.target !== header) {
      burger.classList.remove("active");
      header.classList.remove("active");
    }
  })
;
let textCheckBox = document.querySelector(".checkbox-box__text");
const checkBox = document.querySelector(".checkbox-box__slider");
checkBox.addEventListener("click", () => {
  if (!checkBox.classList.contains("check-active")) {
    checkBox.classList.add("check-active");
    textCheckBox.textContent = "Автозаполнение справочными данными включено"
  } else {
    checkBox.classList.remove("check-active");
    textCheckBox.textContent = "Автозаполнение справочными данными выключено"
  };
});
;
const readyMenu = document.querySelector(".ready")
const listMenu = document.querySelector(".list")
const listBtn = document.querySelector(".btn-list")
listBtn.addEventListener("click", () => {
  if (!listMenu.classList.contains("show")) {
    listMenu.classList.add("show");
  } else {
    listMenu.classList.remove("show");
  }
})
const readyBtn = document.querySelector(".btn-ready")
readyBtn.addEventListener("click", () => {
  if (!readyMenu.classList.contains("show")) {
    readyMenu.classList.add("show");
  } else {
    readyMenu.classList.remove("show");
  }
})
document.body.addEventListener("click", (element) => {
  if (element.target !== listBtn) {
    listMenu.classList.add("show");
  }
  if (element.target !== readyBtn) {
    readyMenu.classList.add("show");
  }
});
//
