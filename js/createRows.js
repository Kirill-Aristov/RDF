let select = document.querySelector("#list");
select.addEventListener("change", function (e) {
  let selectAnswer = e.target.value;
  addRow(selectAnswer)
  removeSelect(selectAnswer)
  select.value = "Добавить"
});



function addRow(selectAnswer) {

  let empTab = document.getElementById('empTable');
  let rowCnt = empTab.rows.length; // table row count.
  let tr = empTab.insertRow(rowCnt); // the table row.
  for (let c = 0; c < HeaderTable.length; c++) {
    let td = document.createElement('td'); // table definition.
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

    } else if (c == 2) {

      let ele2 = document.createElement("input");
      ele2.setAttribute("type", "number")
      td.appendChild(ele2)

    } else if (c == 3) {

      let ele3 = document.createElement("input");
      ele3.setAttribute("type", "number")
      td.appendChild(ele3)
    } else {

      let ele4 = document.createElement("input");
      ele4.setAttribute("type", "number")
      td.appendChild(ele4)

    };
  }
}