function addOther(fullMassa, table) {
  const div = document.createElement("div")
  div.setAttribute("class", "other-container")
  div.innerHTML = `
  <div class="other-container__text">
  Содержание должно быть равным 100%
   <p>ваше содержание = ${fullMassa}%</p>
  заполнить недостающие содежаниее "Прочее"
    <p>"Прочее" = ${100 - fullMassa}%</p>
  <div class="other-container__btn">
    <input class="other-btn" type="button" value="Да"></input>
    <input class="other-btn" type="button" value="Нет"></input>
  </div>
  </div>
  `
  table.appendChild(div)
  const otherBtn = document.querySelectorAll(".other-btn")
  otherBtn.forEach(e => {
    e.addEventListener("click", () => {
      if (e.value == "Нет") {
        div.remove()
      } else {

      }
      div.remove()
    })
  })
}