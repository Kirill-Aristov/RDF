
bodyTable.addEventListener("input", (element) => {
  if (element.target.closest(".humidity")) {//проверка на превышения содержания ВЛАЖНОСТИ
    let textHumidity = "Влажность компонента не должна превышать 100%";
    windowError.windowErrorPosition(element.target, textHumidity);
  }
  if (element.target.closest(".ashContent")) { //проверка на превышения содержания ЗОЛЬНОСТИ
    let textAshContent = "Зольность компонента на сухую массу не должна превышать 100%";
    windowError.windowErrorPosition(element.target, textAshContent);
  }
});

class WindowError {
  constructor(element, text, position) {
    this.element = element;
    this.text = text;
    this.position = position;
  }
  windowErrorPosition(element, text) {
    if (element.value > 100) {
      this.position = element.parentNode.offsetLeft;
      let rowsPosition = element.parentNode.parentNode.closest(".rows-active")
      const div = document.createElement("div");
      div.classList.add("error");
      //растояние от левого блока + длина блока
      div.style.left = this.position + 70 + "px";
      div.textContent = text;
      rowsPosition.appendChild(div)
      let opacityNum = 1
      setTimeout(SetInterval, 2500, opacityNum)
    }
  }
}
const windowError = new WindowError