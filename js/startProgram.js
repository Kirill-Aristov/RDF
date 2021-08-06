class Start {
  constructor(selector) {
    this.food = selector.food
    this.paper = selector.paper
    this.plastic = selector.plastic
    this.textile = selector.textile

    this.$choice = document.getElementById(selector.selector)
    this.$choice.innerHTML += `
      <select name="select"
              size="1"
              id="list">
        <option selected
                value="Добавить">Добавить</option>
        <option value="${this.food}">${this.food}</option>
        <option value="${this.paper}">${this.paper}</option>
        <option value="${this.plastic}">${this.plastic}</option>
        <option value="${this.textile}">${this.textile}</option>
      </select>
      <button id="btn"
                type="button">Расчет</button>
      <div id="table"></div>
      `
  }
}
const start = new Start({
  selector: "choice",
  food: "Пищевые отходы",
  paper: "Бумага",
  plastic: "Пластик",
  textile: "Тестиль"
})

