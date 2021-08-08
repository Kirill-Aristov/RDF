let btn = document.getElementById("btn").addEventListener("click", () => {
  let database = []
  // let num = database.push({ name: "ello", age: "15" })
  // console.log(database)
  // console.log(num)
  var refTab = document.getElementById("empTable")

  for (var i = 1; row = refTab.rows[i]; i++) {
    row = refTab.rows[i];
    console.log(row)
    for (var j = 1; col = row.cells[j]; j++) {
      // let name = row.cells[j]
      if (j == 1) {
        let num = database.push(row.cells[j])
        console.log(row.cells[j])
      } else if (j == 2) {
        console.log(row.cells[j])
      } else if (j == 3) {
        console.log(row.cells[j])
      } else if (j == 4) {
        console.log(row.cells[j])
      }

    }
  }
  console.log(database)
  calck(database)
})
