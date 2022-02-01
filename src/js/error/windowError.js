bodyTable.addEventListener("change", (element) => {
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
      this.position = element.getBoundingClientRect();
      console.log(this.position)
      const div = document.createElement("div");
      div.classList.add("error");
      //высота от верха страницы - высота блока ошибки
      div.style.top = Math.round(this.position.top - this.position.height - 10) + "px";
      //растояние от левого края + длина исходного блока
      div.style.left = Math.round(this.position.left + this.position.width) + "px";
      div.textContent = text;
      document.body.appendChild(div)
      let opacityNum = 1
      setTimeout(sitInterval, 2500, opacityNum)
    }
  }
}
const windowError = new WindowError

function sitInterval(opacityNum) {
  const div = document.querySelector(".error")
  if (opacityNum > 0) {
    div.style.opacity = opacityNum
    setTimeout(sitInterval, 50, opacityNum - 0.1)
  } else {
    div.remove()
  }
}