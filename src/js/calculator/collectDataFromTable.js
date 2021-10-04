let btn = document.getElementById("btn").addEventListener("click", () => {
  let database = [];
  const table = document.getElementById("empTable");
  for (let i = 1; row = table.rows[i]; i++) {
    database.push({
      id: row.cells[1].innerText,
      name: row.cells[2].querySelector('input').value,
      massa: Number(row.cells[3].querySelector('input').value.replace(/,/g, ".")),//содержание
      W: Number(row.cells[4].querySelector('input').value.replace(/,/g, ".")),//влажность
      A: Number(row.cells[5].querySelector('input').value.replace(/,/g, ".")),//зольность
      Q: Number(row.cells[6].querySelector('input').value.replace(/,/g, "."))//теплота сгорания на сух массу
    });
  };
  errorCheck(database);
});
