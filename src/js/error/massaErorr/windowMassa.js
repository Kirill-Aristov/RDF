function addWindow(fullMassa) {
  const div = document.createElement("div");
  div.setAttribute("class", "container-window");
  div.style.top = table.offsetTop + "px"
  div.innerHTML = `
  <div class="container-window__text">
  Содержание должно быть равным 100%
   <p>ваше содержание = ${fullMassa / 1000}%</p>
  заполнить недостающие содежаниее "прочее(остаток)"
    <p>"прочее(остаток)" = ${(100 * 1000 - fullMassa) / 1000}%</p>
  <div class="container-window__btn">
    <input class="window__btn" type="button" value="Да"></input>
    <input class="window__btn" type="button" value="Нет"></input>
  </div>
  </div>
  `;
  table.appendChild(div);
  windowAnswer(div, fullMassa);
};
function windowAnswer(div, fullMassa) {
  const windowBtn = document.querySelectorAll(".window__btn");
  windowBtn.forEach(e => {
    e.addEventListener("click", () => {
      (e.value == "Нет") ?
        div.remove()
        :
        addRowsWindow(fullMassa);
      div.remove();
    });
  });
};
function addRowsWindow(fullMassa) {
  lenghtСolumn();
  const inputName = document.querySelectorAll(".input__name");
  lastItem(inputName, 1, "прочее(остаток)");
  const inputData = document.querySelectorAll(".input__data")
  setTimeout(() => {
    lastItem(inputData, 4, (100 * 1000 - fullMassa) / 1000);
  }, 0);
};
function lastItem(last, id, attribute) {
  let lastValue = last[last.length - id];
  lastValue.value = attribute;
  otherAutoDilling(lastValue);
};
