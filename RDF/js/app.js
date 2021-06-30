// let select = document.querySelector("#list").addEventListener('change', function (e) {
// 	let selectAnswer = e.target.value


// });

let btn = document.getElementById("btn").addEventListener("click", () => {
	let food = {
		number: Number(document.getElementById("food_number").value),
		W: Number(document.getElementById("food_W").value),
		A: Number(document.getElementById("food_A").value)
	};
	let paper = {
		number: Number(document.getElementById("paper_number").value),
		W: Number(document.getElementById("paper_W").value),
		A: Number(document.getElementById("paper_A").value)
	};
	let plastic = {
		number: Number(document.getElementById("plastic_number").value),
		W: Number(document.getElementById("plastic_W").value),
		A: Number(document.getElementById("plastic_A").value)
	};
	// let glass = {
	// 	number: Number(document.getElementById("glass_number").value),
	// 	W: Number(document.getElementById("glass_W").value),
	// 	A: Number(document.getElementById("glass_A").value)
	// };
	// let metal = {
	// 	number: Number(document.getElementById("metal_number").value),
	// 	W: Number(document.getElementById("metal_W").value),
	// 	A: Number(document.getElementById("metal_A").value)
	// };
	// let wood = {
	// 	number: Number(document.getElementById("wood_number").value),
	// 	W: Number(document.getElementById("wood_W").value),
	// 	A: Number(document.getElementById("wood_A").value)
	// };
	// let rubber = {
	// 	number: Number(document.getElementById("rubber_number").value),
	// 	W: Number(document.getElementById("rubber_W").value),
	// 	A: Number(document.getElementById("rubber_A").value)
	// };
	let textile = {
		number: Number(document.getElementById("textile_number").value),
		W: Number(document.getElementById("textile_W").value),
		A: Number(document.getElementById("textile_A").value)
	};
	let other = {
		number: Number(document.getElementById("other_number").value),
		W: Number(document.getElementById("other_W").value),
		A: Number(document.getElementById("other_A").value)
	};

	let numTKO = food.number + plastic.number + textile.number + paper.number + other.number;

	let numW = (((food.number / numTKO) * food.W) + ((plastic.number / numTKO) * plastic.W) + ((textile.number / numTKO) * textile.W) + ((paper.number / numTKO) * paper.W) + ((other.number / numTKO) * other.W)) * 100;
	console.log(numW)
	let numA = "";
	let Q = "";





	class Rashet {
		render() {
			let main = document.querySelector(".main");
			let htmlCatalog = ""
			htmlCatalog += `
			<div>Общая масса ТКО: ${numTKO}</div>
			<div>Общая влажность ТКО:${numW}% </div>
			<div>Общая зольнотсь ТКО:${numA}</div>
			<div>Удельная теплота сгорания: Q= ${Q}</div>
			`;
			main.innerHTML = htmlCatalog;
		};
	};
	const rashetPage = new Rashet();
	rashetPage.render()
});


// let otherChenge = document.getElementById("other_number").value;
// let textileChenge = document.getElementById("textile_number").value;
// let rubberChenge = document.getElementById("rubber_number").value;
// let foodChenge = document.getElementById("food_number").value;
// let paperChenge = document.getElementById("paper_number").value;
// let glassChenge = document.getElementById("glass_number").value;
// let woodChenge = document.getElementById("wood_number").value;
// let metalChenge = document.getElementById("metal_number").value;