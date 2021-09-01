
function calck(bd) {
  let fullMassa = 0;
  let W = 0;
  let A = 0;
  bd.forEach(element => {
    fullMassa += element.massa
    W += element.W
    A += element.A
  });
  const main = document.getElementById("main")
  main.innerHTML = `
  <div>Общая Масса: ${fullMassa} Т</div>
  <div id="donutchart" style="width: 400px; height: 400px;"></div>
  `
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Масса', fullMassa],
      ['Влажность', W],
      ['Зольность', A],
    ]);

    var options = {
      title: 'Google charts',
      pieHole: 0.5,
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
  }
}