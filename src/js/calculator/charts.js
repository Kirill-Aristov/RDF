function charts(bd, fullMassa) {
  let jsonData = {
    "cols": [
      { "id": "", "label": "Название", "type": "string" },
      { "id": "", "label": "Количество", "type": "number" }
    ],
    "rows": []
  }
  bd.forEach(e => {
    jsonData.rows.push({ "c": [{ "v": [e.name, e.massa + "%"] }, { "v": e.massa }] });
  })
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = new google.visualization.DataTable(jsonData);
    var options = {
      title: 'Содержание ' + fullMassa.toFixed(0) + "%",
      is3D: true,
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
    chart.draw(data, options);
  }
}