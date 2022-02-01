
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
   <canvas id="myChart" style="padding: 10px;" width="${width / 1.05} " height="${height / 1.35}"></canvas>
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
};