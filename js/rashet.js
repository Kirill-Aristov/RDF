function payment() {
	var bd = {
		food: {
			name: document.getElementById("IDfood"),
			massa: document.getElementById("foodnumber"),
			W: document.getElementById("foodW"),
			A: document.getElementById("foodA")
		},
		paper: {
			name: document.getElementById("IDpaper"),
			massa: document.getElementById("papernumber"),
			W: document.getElementById("paperW"),
			A: document.getElementById("paperA")
		},
		plastic: {
			name: document.getElementById("IDplastic"),
			massa: document.getElementById("plasticnumber"),
			W: document.getElementById("plasticW"),
			A: document.getElementById("plasticA")
		},
		textile: {
			name: document.getElementById("IDtextile"),
			massa: document.getElementById("textilenumber"),
			W: document.getElementById("textileW"),
			A: document.getElementById("textileA")
		}
	};

	for (index = 1; index <= 4; index++) {
		if (index == 1) {
			if (bd.food.name != null) {
				var food = {
					massa: Number(document.getElementById("foodnumber").value),
					W: Number(document.getElementById("foodW").value),
					A: Number(document.getElementById("foodA").value)
				}
			} else {
				var food = {
					massa: 0,
					W: 0,
					A: 0
				};
			};
		} else if (index == 2) {
			if (bd.paper.name != null) {
				var paper = {
					massa: Number(document.getElementById("papernumber").value),
					W: Number(document.getElementById("paperW").value),
					A: Number(document.getElementById("paperA").value)
				};
			} else {
				var paper = {
					massa: 0,
					W: 0,
					A: 0
				}
			};
		} else if (index == 3) {
			if (bd.plastic.name != null) {
				var plastic = {
					massa: Number(document.getElementById("plasticnumber").value),
					W: Number(document.getElementById("plasticW").value),
					A: Number(document.getElementById("plasticA").value)
				};
			} else {
				var plastic = {
					massa: 0,
					W: 0,
					A: 0
				};
			}
		} else if (index == 4) {
			if (bd.textile.name != null) {
				var textile = {
					massa: Number(document.getElementById("textilenumber").value),
					W: Number(document.getElementById("textileW").value),
					A: Number(document.getElementById("textileA").value)
				};
			} else {
				var textile = {
					massa: 0,
					W: 0,
					A: 0
				};
			}
		}
	};
	var massaT = food.massa + paper.massa + plastic.massa + textile.massa;
	var Wlag = (food.massa / massaT * food.W) + (paper.massa / massaT * paper.W) + (plastic.massa / massaT * plastic.W) + (textile.massa / massaT * textile.W);

	var Azol = ((((food.massa / massaT * food.A) * (100 - food.W)) / ((food.massa / massaT) * (100 - food.W))) + (((paper.massa / massaT * paper.A) * (100 - paper.W)) / ((paper.massa / massaT) * (100 - paper.W))) + (((plastic.massa / massaT * plastic.A) * (100 - plastic.W)) / ((plastic.massa / massaT) * (100 - plastic.W))) + (((textile.massa / massaT * textile.A) * (100 - textile.W)) / ((textile.massa / massaT) * (100 - textile.W)))) * (1 - (Wlag / 100));
	class Rashet {
		render() {
			let main = document.getElementById("main");
			let htmlCatalog = ""
			htmlCatalog += `
				<div>Общая масса ТКО = ${massaT} Т</div>
				<div>Общая влажность ТКО = ${Wlag}% </div>
				<div>Общая зольнотсь ТКО = ${Azol}%</div>
				<div>Удельная теплота сгорания: </div>
			`;
			main.innerHTML = htmlCatalog;
		};
	};
	const rashetPage = new Rashet();
	rashetPage.render();

};