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
  };
};





