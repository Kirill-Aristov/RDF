let btn = document.getElementById("btn").addEventListener("click", () => {
  let database = []
  const table = document.getElementById("empTable")
  for (let i = 1; (row = table.rows[i]); i++) {
    database.push({
      name: row.cells[1].innerText,
      massa: Number(row.cells[2].querySelector('input').value),
      W: Number(row.cells[3].querySelector('input').value),
      A: Number(row.cells[4].querySelector('input').value)
    });
  }
  calck(database)
})
