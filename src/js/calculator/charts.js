function charts(bd, fullMassa) {
  const ctx = document.getElementById('myChart').getContext('2d');
  let elementMassa = [],
    elementName = [];
  bd.forEach(element => {
    elementMassa.push(element.massa);
    elementName.push(element.name)
  });
  let colorBack = []
  for (let i = 0; i < elementName.length; i++) {
    colorBack.push(randColor());
  }
  const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: elementName,
      datasets: [{
        data: elementMassa,
        backgroundColor: colorBack,
        borderColor: colorBack,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true
    }
  });
}
function randColor() {
  /*СОЗДАЕМ ПЕРЕМЕННЫЕ
  elem - элемент которому будем менять задний фон
  code_color - получаем элемент в который будет выводить код цвета
  r,g,b - отвечают за кодировку и вместе выводят цвет
  color - в нее записываем полную строку значения цвета
  */
  let r = Math.floor(Math.random() * (256)),
    g = Math.floor(Math.random() * (256)),
    b = Math.floor(Math.random() * (256)),
    color = '#' + r.toString(16) + g.toString(16) + b.toString(16);

  return color
}