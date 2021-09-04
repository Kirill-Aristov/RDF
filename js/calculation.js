
function calck(bd) {
  const reducerPlus = (accumulator, currentValue) => accumulator + currentValue;
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
  let fullMassa = 0;
  bd.forEach(element => {
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
    achContent = (topFaction / bottomFaction) * (1 - humidity)
    ////////////////////////////////////////////////////////////
  });
  const main = document.getElementById("main")
  main.innerHTML = `
  <div id="donutchart" style="width: 500px; height: 400px;"></div> 
  
  
  
  <div>Общая влажность ТКО: ${humidity} %</div>
  <div>Общая Зольность ТКО: ${achContent} %</div>
  `





  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['name', fullMassa],
    ]);

    var options = {
      title: 'Содержание ' + fullMassa + "%",
      pieHole: 0.5,
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
  }
}