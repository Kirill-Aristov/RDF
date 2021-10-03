
function calck(bd) {
  const reducerPlus = (accumulator, currentValue) => accumulator + currentValue;
  //именна столбцов
  let fullMassa = 0;
  /////////////
  //Влажность переменные
  let massTimesMoisture = []// Массив данных влажность умноженная на содержание
  let humidity = 0 // общая Влажность ТКО
  ////////////////////////////////////////////////
  //Зольность переменные
  let leftAshContentTop = [] //левое уравнение верхней части дроби
  let leftAshContentBottom = [] //левое уравнение нижней части дроби 
  let ashContent = 0 //зольность
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
    leftAshContentTop.push(element.massa * element.A * (100 - element.W))
    leftAshContentBottom.push(element.massa * (100 - element.W))
    ashContent = (leftAshContentTop.reduce(reducerPlus) / leftAshContentBottom.reduce(reducerPlus)) * (1 - (humidity / 100 / 100))
    ////////////////////////////////////////////////////////////
    //Удельная теплота сгорания 
    leftHeat.push(element.massa * (1 - element.W / 100) * (1 - element.A / 100) * element.Q)
    leftPlusHeat = leftHeat.reduce(reducerPlus)
    heat = (leftPlusHeat - 0.02442 * humidity) / 100
    ////////////////////////////////////////////////////////
  });
  const main = document.getElementById("main")
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
  `
  charts(bd, fullMassa)
}