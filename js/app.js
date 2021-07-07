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

let select = document.querySelector("#list").addEventListener('change', function (e) {
	let selectAnswer = e.target.value;
	let selectId = "";
	if (selectAnswer == "glass") {
		selectId = selectAnswer;
		selectAnswer = "Стекло";
		addRow(selectAnswer, selectId);
	} else if (selectAnswer == "food") {
		selectId = selectAnswer;
		selectAnswer = "Пищевые отходы";
		addRow(selectAnswer);
	} else if (selectAnswer == "paper") {
		selectId = selectAnswer;
		selectAnswer = "Бумага";
		addRow(selectAnswer);
	} else if (selectAnswer == "plastic") {
		selectId = selectAnswer;
		selectAnswer = "пластмасса";
		addRow(selectAnswer);
	} else if (selectAnswer == "textile") {
		selectId = selectAnswer;
		selectAnswer = "Текстиль";
		addRow(selectAnswer);
	} else if (selectAnswer == "other") {
		selectId = selectAnswer;
		selectAnswer = "Прочее";
		addRow(selectAnswer);
	} else if (selectAnswer == "rubber") {
		selectId = selectAnswer;
		selectAnswer = "Резина";
		addRow(selectAnswer);
	} else if (selectAnswer == "wood") {
		selectId = selectAnswer;
		selectAnswer = "Дерево";
		addRow(selectAnswer);
	}

	let xmlhttp = new XMLHttpRequest(),
		url = "http://localhost:3000/RDF",
		method = "GET";
	xmlhttp.open(method, url, true);
	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			let myOBJ = JSON.parse(xmlhttp.responseText.split(","));
			console.log(myOBJ)
			console.log(myOBJ.glass)
			document.getElementById("main").innerHTML = myOBJ;
		} else {
			console.log("Ошибка")
		}
	};
	xmlhttp.send();

	function addRow() {

		let empTab = document.getElementById('empTable');

		let rowCnt = empTab.rows.length; // table row count.
		let tr = empTab.insertRow(rowCnt); // the table row.
		tr = empTab.insertRow(rowCnt);

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
				ele2.setAttribute("value", "food");
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

});





// delete TABLE row function.
function removeRow(oButton) {
	let empTab = document.getElementById('empTable');
	empTab.deleteRow(oButton.parentNode.parentNode.rowIndex); // button -> td -> tr.
}

// function to extract and submit table data.
function payment() {
	let table_tr = document.get




	class Rashet {
		render() {
			let main = document.getElementById("main");
			let htmlCatalog = ""
			htmlCatalog += `
			<div>Общая масса ТКО: Т</div>
			<div>Общая влажность ТКО:% </div>
			<div>Общая зольнотсь ТКО:</div>
			<div>Удельная теплота сгорания: </div>
			`;
			main.innerHTML = htmlCatalog;
		};
	};
	const rashetPage = new Rashet();
	rashetPage.render();
};