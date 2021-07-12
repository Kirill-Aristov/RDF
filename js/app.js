let arrHead = new Array(); //создание таблицы.
arrHead = ['', 'Название', 'Масса,Т', 'Влажность', 'Зольность'];
//создание таблицы.
function createTable() {
	let empTable = document.createElement('table');
	empTable.setAttribute('id', 'empTable'); // таблицы id.

	let tr = empTable.insertRow(-1);
	for (let h = 0; h < arrHead.length; h++) {
		let th = document.createElement('th'); //header таблицы
		th.innerHTML = arrHead[h];
		tr.appendChild(th);
	}

	let table = document.getElementById('cont');
	table.appendChild(empTable);
}


let select = document.querySelector("#list");
select.addEventListener("change", function (e) {
	let selectAnswer = e.target.value;
	let selectId = "";
	checkName(selectAnswer, selectId)
});

function checkName(selectAnswer, selectId) {
	if (selectAnswer == "food") {
		selectId = selectAnswer;
		selectAnswer = "Пищевые отходы";
		addRow(selectAnswer, selectId);
	} else if (selectAnswer == "paper") {
		selectId = selectAnswer;
		selectAnswer = "Бумага";
		addRow(selectAnswer, selectId);
	} else if (selectAnswer == "plastic") {
		selectId = selectAnswer;
		selectAnswer = "пластмасса";
		addRow(selectAnswer, selectId);
	} else if (selectAnswer == "textile") {
		selectId = selectAnswer;
		selectAnswer = "текстиль";
		addRow(selectAnswer, selectId);
	}
}



function addRow(selectAnswer, selectId) {

	let empTab = document.getElementById('empTable');

	let rowCnt = empTab.rows.length; // table row count.
	let tr = empTab.insertRow(rowCnt); // the table row.
	tr = empTab.insertRow(rowCnt);
	tr.setAttribute("id", selectId + "span")
	for (let c = 0; c < arrHead.length; c++) {
		let td = document.createElement('td'); // table definition.
		td = tr.insertCell(c);
		if (c == 0) { // the first column.
			// add a button in every new row in the first column.
			let button = document.createElement('button');

			// set input attributes.
			button.textContent = "Удалить";

			// add button's 'onclick' event.
			button.setAttribute('onclick', 'removeRow(this)');

			td.appendChild(button);
		} else if (c == 1) {
			let ele = document.createElement('span');
			ele.setAttribute('id', 'ID' + selectId);
			ele.textContent = selectAnswer;
			td.appendChild(ele);

		} else if (c == 2) {
			let ele2 = document.createElement("input");
			ele2.setAttribute("id", selectId + "number")
			ele2.setAttribute("type", "number");
			td.appendChild(ele2)
		} else if (c == 3) {
			let ele3 = document.createElement("input");
			ele3.setAttribute("id", selectId + "W")
			ele3.setAttribute("type", "number");
			td.appendChild(ele3)
		} else {
			let ele4 = document.createElement("input");
			ele4.setAttribute("id", selectId + "A")
			ele4.setAttribute("type", "number");
			td.appendChild(ele4)

		};
	}
}








// delete TABLE row function.
function removeRow(oButton) {
	let empTab = document.getElementById('empTable');
	empTab.deleteRow(oButton.parentNode.parentNode.rowIndex); // button -> td -> tr.
}

// function to extract and submit table data.




