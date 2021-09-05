
function calck(bd) {
  const reducerPlus = (accumulator, currentValue) => accumulator + currentValue;
  //именна столбцов
  let fullMassa = 0;
  /////////////
  //Влажность переменные
  let massTimesMoisture = []// Массив данных влажность умноженная на содержание
  let humidity // общая Влажность ТКО
  ////////////////////////////////////////////////
  //Зольность переменные
  let achContent = 0 //общая Зольность ТКО
  let hundredMinusHumidity = [] //масси данных (100 - влажность)
  let contentMultipliedAshContent = [] //массив данных Зольность умноженное на содержание
  let massaArray = []
  let topFaction = 0; // верхняя строки уравнения
  let bottomFaction = 0; // нижняя строки уравнения
  //////////////////////////////////////////////////////
  //Теплота сгорания переменные
  let heat = 0 // Теплота сгорания 
  let leftHeat = [] //первая часть уравнения
  /////////////////////////////////////////////////
  bd.forEach(element => {
    //грфик построенния на содержание
    fullMassa += element.massa
    //Расчет общей влажности //////////////////
    massTimesMoisture.push(element.massa * element.W)
    humidity = massTimesMoisture.reduce(reducerPlus) / 100
    /////////////////////////////////////
    //Расчёт общей Зольности //////////////////////
    contentMultipliedAshContent.push(element.massa * element.A)
    hundredMinusHumidity.push(100 - element.W)
    topFaction = contentMultipliedAshContent.reduce(function (r, a, i) { return r + a * hundredMinusHumidity[i] }, 0)
    massaArray.push(element.massa)
    bottomFaction = massaArray.reduce(function (r, a, i) { return r + a * hundredMinusHumidity[i] }, 0)
    achContent = (topFaction / bottomFaction) * (1 - humidity / 100)
    ////////////////////////////////////////////////////////////
    //Удельная теплота сгорания 
    leftHeat.push(element.massa * (1 - (element.W / 100)) * (1 - (element.A / 100)) * element.Q)
    heat = leftHeat.reduce(reducerPlus) - (0.02442 * humidity)
    ////////////////////////////////////////////////////////
  });
  const main = document.getElementById("main")
  main.innerHTML = `
  <div id="donutchart" style="width: 500px; height: 400px;"></div> 
  
  
  
  <div>1. Общая влажность ТКО: ${humidity} %</div>
  <div>2. Общая Зольность ТКО: ${achContent} %</div>
  <div>3. Удельная теплота сгорания ТКО: ${heat} %</div>
  `

  let jsonData = {
    "cols": [
      { "id": "", "label": "Название", "type": "string" },
      { "id": "", "label": "Количество", "type": "number" }
    ],
    "rows": [
    ]
  }
  bd.forEach(e => {
    jsonData.rows.push({ "c": [{ "v": e.name }, { "v": e.massa }] })
  })



  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = new google.visualization.DataTable(jsonData);
    var options = {
      title: 'Содержание ' + fullMassa + "%",
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
  }
}