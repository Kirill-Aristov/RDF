function addOther(fullMassa, table) {
  const div = document.createElement("div")
  div.setAttribute("class", "other-container")
  div.innerHTML = `
  <div class="other-container__text">
  Содержание должно быть равным 100%
   <p>ваше содержание = ${fullMassa}%</p>
  заполнить недостающие содежаниее "Прочее"
    <p>"Прочее" = ${100 - fullMassa.toFixed(3)}%</p>
  <div class="other-container__btn">
    <input class="other-btn" type="button" value="Да"></input>
    <input class="other-btn" type="button" value="Нет"></input>
  </div>
  </div>
  `
  table.appendChild(div)
  otherAnswer(div, fullMassa)

}
function otherAnswer(div, fullMassa) {
  const otherBtn = document.querySelectorAll(".other-btn")
  otherBtn.forEach(e => {
    e.addEventListener("click", () => {
      (e.value == "Нет") ?
        div.remove()
        :
        addRowsOther(fullMassa)
      div.remove()
    })
  })
}
function addRowsOther(fullMassa) {
  lenghtСolumn()
  const inputName = document.querySelectorAll(".input_name")
  lastItem(inputName, 1, "Прочее")
  const inputData = document.querySelectorAll(".input__data")
  lastItem(inputData, 4, 100 - fullMassa.toFixed(3))

}
function lastItem(last, id, attribute) {
  let lastValue = last[last.length - id];
  lastValue.value = attribute
  otherAutoDilling(lastValue)
}