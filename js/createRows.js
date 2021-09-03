const select = document.querySelector("#list");
select.addEventListener("change", function (e) {
  let selectAnswer = e.target.value;
  addRow(selectAnswer)
  removeSelect(selectAnswer)
  select.value = "Добавить"
});
const btn_string = document.getElementById("btn_string").addEventListener("click", () => {
  addRow()
})




function addRow(selectAnswer) {
  const empTab = document.getElementById('empTable');
  let rowCnt = empTab.rows.length;
  console.log(rowCnt)
  let tr = empTab.insertRow(rowCnt);
  for (let c = 0; c < HeaderTable.length; c++) {
    let td = document.createElement('td');
    td = tr.insertCell(c);
    if (c == 0) {
      const input = document.createElement("input")
      input.setAttribute("type", "button")
      input.setAttribute('id', selectAnswer);
      input.setAttribute("class", "clearBtn")
      input.setAttribute("onclick", "RemoveRows(this)")
      input.setAttribute("tabindex", "-1")
      td.appendChild(input);
    } else if (c == 1) {
      const div = document.createElement("div")
      div.textContent = rowCnt
      div.setAttribute("class", "number_id")
      td.appendChild(div)
    } else if (c == 2) {
      const int = document.createElement("input")
      int.setAttribute("class", "input_name")
      if (selectAnswer == undefined) {
        int.textContent = ""
      } else {
        int.value = selectAnswer
      }
      td.appendChild(int);
    } else {
      let ele1 = document.createElement("input");
      ele1.setAttribute("type", "number")
      td.appendChild(ele1)
    };
  }
}






