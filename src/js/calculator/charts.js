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
}