const select = document.querySelector("#list");
select.addEventListener("change", function (e) {
  let selectAnswer = e.target.value;
  addRow(selectAnswer)
  removeSelect(selectAnswer)
  select.value = "Добавить"
});



function addRow(selectAnswer) {
  const empTab = document.getElementById('empTable');
  let rowCnt = empTab.rows.length;
  let tr = empTab.insertRow(rowCnt); 
  for (let c = 0; c < HeaderTable.length; c++) {
    let td = document.createElement('td'); 
    td = tr.insertCell(c);
    if (c == 0) {
      let button = document.createElement('button');
      button.textContent = "Удалить";
      button.setAttribute('id', selectAnswer);
      button.setAttribute("class", "clearBtn")
      button.setAttribute("onclick", "addSelect(this)")
      td.appendChild(button);

    } else if (c == 1) {
      let ele = document.createElement('span');
      ele.textContent = selectAnswer
      td.appendChild(ele);
    } else {
      let ele1 = document.createElement("input");
      ele1.setAttribute("type", "number")
      td.appendChild(ele1)
    };
  }
}