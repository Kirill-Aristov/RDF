
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

  //////////////////////////////////////////////////////
  //Теплота сгорания переменные
  let heat = 0 // Теплота сгорания 
  let leftHeat = [] //первая часть уравнения
  let leftPlusHeat = 0 //сложенеие левого массива
  /////////////////////////////////////////////////
  bd.forEach(element => {
    //грфик построенния на содержание
    fullMassa += element.massa
    //Расчет общей влажности //////////////////
    massTimesMoisture.push(element.massa * element.W)
    humidity = massTimesMoisture.reduce(reducerPlus)
    /////////////////////////////////////
    //Расчёт общей Зольности //////////////////////

    ////////////////////////////////////////////////////////////
    //Удельная теплота сгорания 
    leftHeat.push(element.massa * (1 - element.W / 100) * (1 - element.A / 100) * element.Q)
    leftPlusHeat = leftHeat.reduce(reducerPlus)
    heat = (leftPlusHeat - 0.02442 * humidity) / 100
    ////////////////////////////////////////////////////////
  });
  const main = document.getElementById("main")
  main.innerHTML = `
  <div id="donutchart" style="width: 500px; height: 400px;"></div> 
  
  
  
  <div>1. Общая влажность ТКО: ${humidity.toFixed(2) / 100} %</div>
  <div>2. Удельная теплота сгорания ТКО: ${heat.toFixed(3)} мДж</div>
  `
  charts(bd, fullMassa)
}