function error(bd) {
  let fullMassa = 0
  let ashContent = []
  let id = []
  bd.forEach(element => {
    id.push(element.id)
    fullMassa += element.massa
    ashContent.push(element.A)
  });

  let ashContentError = Math.max.apply(Math, ashContent)
  let ashContentIndex = ashContent.indexOf(ashContentError)

  const table = document.getElementById("table")
  const span = document.createElement("span")
  span.setAttribute("id", "active")//костыль для удления всех элементов
  if (fullMassa >= 100) {
    spanRemove()
    const spanFullMassa = document.createElement("span")
    function checkSpanFullMassa() {
      const check = document.querySelectorAll(".massa_error").forEach(element => {
        element.remove()
      })
    }
    checkSpanFullMassa()
    span.setAttribute("class", "massa_error")
    span.innerText = "Содержание не должно превышать 100%" + "\n" + "содержание = " + fullMassa + "%"
    span.style.bottom = 60 + (51 * id.length) + "px"
    table.appendChild(span)
    span.addEventListener("click", () => {
      table.removeChild(span)
    })

  } else if (ashContentError > 100) {
    spanRemove()
    const spanAchContent = document.createElement("span")
    function checkSpanashContent() {
      const check = document.querySelectorAll(".achContent_error").forEach(element => {
        element.remove()
      })
    }
    checkSpanashContent()
    span.setAttribute("class", "achContent_error")
    span.innerText = "Зольность содиржимого не может превышать 100%"
    span.style.top = (51 * (ashContentIndex + 1)) + "px"
    table.appendChild(span)
    span.addEventListener("click", () => {
      table.removeChild(span)
    })
  } else {
    calck(bd)
    spanRemove()
  }
  function spanRemove() {
    const spanTrue = document.querySelectorAll("#active")
    console.log(spanTrue.length)
    for (let i = 0; i < spanTrue.length; i++) {
      spanTrue[i].remove()
    }

  }
}