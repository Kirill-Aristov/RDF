
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
  let HMH = [] //масси данных (100 - влажность)
  let CMAC = [] //массив данных Зольность умноженное на содержание
  let massaArray = [] //массив содержание
  let leftFaction = 0; // левое уравнение
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
    HMH.push(100 - element.W)
    CMAC.push(element.massa * element.A)
    massaArray.push(element.massa)
    leftFaction = (CMAC.reduce(function (r, a, i) { return r + a * HMH[i] }, 0)) / (massaArray.reduce(function (r, a, i) { return r + a * HMH[i] }, 0))
    achContent = leftFaction * (1 - (humidity / 100))
    ////////////////////////////////////////////////////////////
    //Удельная теплота сгорания 
    leftHeat.push(element.massa * (1 - (element.W / 100)) * (1 - (element.A / 100)) * element.Q)
    heat = leftHeat.reduce(reducerPlus) - (0.02442 * humidity)
    ////////////////////////////////////////////////////////
  });
  const main = document.getElementById("main")
  main.innerHTML = `
  <div id="donutchart" style="width: 500px; height: 400px;"></div> 
  
  
  
  <div>1. Общая влажность ТКО: ${humidity.toFixed(2)} %</div>
  <div>2. Общая Зольность ТКО: ${achContent.toFixed(2)} %</div>
  <div>3. Удельная теплота сгорания ТКО: ${heat.toFixed(3)} Дж</div>
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