// let blockHTML = document.getElementById("block");
// let catolog = "";
// catolog += `
// <div id="block">
// 		<table id="table">
// 			<tr>
// 				<th> Наименование ТКО </th>
// 				<th>масса, Т</th>
// 				<th>Влажность</th>
// 				<th>Зольность</th>
// 			</tr>
// 			<tfoot>
// 				<td></td>
// 				<th>общая масса ТКО
// 					<p><span id="m_TKO"></span></p>
// 				</th>
// 				<th>Влажность
// 					<p><span id="m_W"></span></p>
// 				</th>
// 				<th>Зольность
// 					<p><span id="m_A"></span></p>
// 				</th>
// 			</tfoot>
// 			</table>
// 			<button id="btn">Расчет</button>
// 			</div>

// `;
// blockHTML.innerHTML = catolog;

// let select = document.querySelector("#list").addEventListener('change', function (e) {
// 	let selectAnswer = e.target.value;
// 	let table = "";
// 	if (selectAnswer == "food") {
// 		catolog += `
// 		<tr>
// 				<td>пищевые отходы</td>
// 				<td><input id="food_number"
// 						   type="number"></td>
// 				<td><input id="food_W"
// 						   type="number"></td>
// 				<td><input id="food_A"
// 						   type="number"></td>
// 			</tr>
// 		`;
// 		blockHTML.innerHTML = catolog;
// 	} else if (selectAnswer == "paper") {

// 	} else if (selectAnswer == "plastic") {

// 	} else {

// 	}

// });

// let btn = document.getElementById("btn").addEventListener("click", () => {
// 	let food = {
// 		number: Number(document.getElementById("food_number").value),
// 		W: Number(document.getElementById("food_W").value),
// 		A: Number(document.getElementById("food_A").value)
// 	};
// 	let paper = {
// 		number: Number(document.getElementById("paper_number").value),
// 		W: Number(document.getElementById("paper_W").value),
// 		A: Number(document.getElementById("paper_A").value)
// 	};
// 	let plastic = {
// 		number: Number(document.getElementById("plastic_number").value),
// 		W: Number(document.getElementById("plastic_W").value),
// 		A: Number(document.getElementById("plastic_A").value)
// 	};
// 	let glass = {
// 		number: Number(document.getElementById("glass_number").value),
// 		W: Number(document.getElementById("glass_W").value),
// 		A: Number(document.getElementById("glass_A").value)
// 	};
// 	let metal = {
// 		number: Number(document.getElementById("metal_number").value),
// 		W: Number(document.getElementById("metal_W").value),
// 		A: Number(document.getElementById("metal_A").value)
// 	};
// 	let wood = {
// 		number: Number(document.getElementById("wood_number").value),
// 		W: Number(document.getElementById("wood_W").value),
// 		A: Number(document.getElementById("wood_A").value)
// 	};
// 	let rubber = {
// 		number: Number(document.getElementById("rubber_number").value),
// 		W: Number(document.getElementById("rubber_W").value),
// 		A: Number(document.getElementById("rubber_A").value)
// 	};
// 	let textile = {
// 		number: Number(document.getElementById("textile_number").value),
// 		W: Number(document.getElementById("textile_W").value),
// 		A: Number(document.getElementById("textile_A").value)
// 	};
// 	let other = {
// 		number: Number(document.getElementById("other_number").value),
// 		W: Number(document.getElementById("other_W").value),
// 		A: Number(document.getElementById("other_A").value)
// 	};

// 	let numTKO = food.number + plastic.number + textile.number + paper.number + other.number;

// 	let numW = (((food.number / numTKO) * food.W) + ((plastic.number / numTKO) * plastic.W) + ((textile.number / numTKO) * textile.W) + ((paper.number / numTKO) * paper.W) + ((other.number / numTKO) * other.W)) * 100;
// 	console.log(numW)
// 	let numA = "";
// 	let Q = "";





// 	class Rashet {
// 		render() {
// 			let main = document.querySelector(".main");
// 			let htmlCatalog = ""
// 			htmlCatalog += `
// 			<div>Общая масса ТКО: ${numTKO}</div>
// 			<div>Общая влажность ТКО:${numW}% </div>
// 			<div>Общая зольнотсь ТКО:${numA}</div>
// 			<div>Удельная теплота сгорания: Q= ${Q}</div>
// 			`;
// 			main.innerHTML = htmlCatalog;
// 		};
// 	};
// 	const rashetPage = new Rashet();
// 	rashetPage.render()
// });


// // let otherChenge = document.getElementById("other_number").value;
// // let textileChenge = document.getElementById("textile_number").value;
// // let rubberChenge = document.getElementById("rubber_number").value;
// // let foodChenge = document.getElementById("food_number").value;
// // let paperChenge = document.getElementById("paper_number").value;
// // let glassChenge = document.getElementById("glass_number").value;
// // let woodChenge = document.getElementById("wood_number").value;
// // let metalChenge = document.getElementById("metal_number").value;


let arrHead = new Array(); // array for header.
arrHead = ['', 'Название', 'Масса,Т', 'Влажность', 'Зольность'];

// first create TABLE structure with the headers. 
function createTable() {
	let empTable = document.createElement('table');
	empTable.setAttribute('id', 'empTable'); // table id.

	let tr = empTable.insertRow(-1);
	for (let h = 0; h < arrHead.length; h++) {
		let th = document.createElement('th'); // create table headers
		th.innerHTML = arrHead[h];
		tr.appendChild(th);
	}

	let div = document.getElementById('cont');
	div.appendChild(empTable); // add the TABLE to the container.
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
	} else if (selectAnswer == "metal") {
		selectId = selectAnswer;
		selectAnswer = "Металл";
		addRow(selectAnswer);
	}


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
			checkInput()

		}
	}

	function checkInput() {
		let cel = document.getElementsByTagName("td");
		//получение строки
		for (var t = 0, len = cel.length; t < len; t++) {
			cel[t].addEventListener("change", () => {
				
			})


		};
	}
});





// delete TABLE row function.
function removeRow(oButton) {
	let empTab = document.getElementById('empTable');
	empTab.deleteRow(oButton.parentNode.parentNode.rowIndex); // button -> td -> tr.
}

// function to extract and submit table data.
function submit() {

	let table = document.getElementById("empTable");
	for (let i = 0, row; row = table.rows[i]; i++) {
		if (i % 2 == 1) {

			// let cel = document.getElementsByTagName("td");

			// for (var t = 0, len = cel.length; t < len; t++) {
			// 	cel[t].addEventListener("change", () => {
			// 		console.log(this.innerHTML);
			// 	});
			// }

			// for (let j = 0, col; col = row.cells[j]; j++) {

			// }
		} else {

		};

	};
	// let numTKO = food + plastic + textile + paper + other;

	// let numW = (((food.number / numTKO) * food.W) + ((plastic.number / numTKO) * plastic.W) + ((textile.number / numTKO) * textile.W) + ((paper.number / numTKO) * paper.W) + ((other.number / numTKO) * other.W)) * 100;
	// console.log(numW)
	// let numA = "";
	// let Q = "";





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