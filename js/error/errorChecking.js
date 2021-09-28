function error(bd) {

  let fullMassa = 0 //содержание
  let ashContent = [] //зольность
  let humidity = [] // влажность
  let id = [] //номер строки

  bd.forEach(element => {
    id.push(element.id)
    fullMassa += element.massa
    ashContent.push(element.A)
    humidity.push(element.W)
  });
  let ashContentError = Math.max.apply(Math, ashContent) //максимальное число в массиве у зольности
  let ashContentIndex = ashContent.indexOf(ashContentError) //индекс максимального чилсва в массиве
  let humidityError = Math.max.apply(Math, humidity)//максимальное число в массиве у влажности
  let humidityIndex = humidity.indexOf(humidityError)//индекс максимального чилсва в массиве
  const table = document.getElementById("table")
  //создание span для Удаление всех span  
  const span = document.createElement("span")
  span.setAttribute("id", "active")

  if (humidityError > 100) {
    //проверка на Влажность
    const text = "Влажность содержимого не может превышать 100%"
    checkErorr("humidityError_error", humidityIndex, text)
  }
  else if (ashContentError > 100) {
    //проверка на Зольность
    const text = "Зольность содержимого не может превышать 100%"
    checkErorr("achContent_error", ashContentIndex, text)
  }
  else if (fullMassa > 100 || fullMassa < 100) {
    //проверка на содержание
    if (fullMassa < 100) {
      addOther(fullMassa, table)
    } else {
      //заполнение остататка "Прочие"
      spanRemove()
      span.setAttribute("class", "massa_error")
      span.innerText = "Содержание не должно превышать 100%" + "\n" + "содержание = " + fullMassa + "%"
      span.style.bottom = 60 + (51 * id.length) + "px"
      table.appendChild(span)
      span.addEventListener("click", () => {
        table.removeChild(span)
      })
    }
  }
  else {
    spanRemove()
    calck(bd)
  }

  function spanRemove() {
    const spanActive = document.querySelectorAll("#active")
    for (let i = 0; i < spanActive.length; i++) {
      spanActive[i].remove()
    }
  }

  function checkErorr(className, index, text) {
    spanRemove()
    span.setAttribute("class", className)
    span.innerText = text
    span.style.top = (49 * (index + 1)) + "px"
    table.appendChild(span)
    span.addEventListener("click", () => {
      table.removeChild(span)
    })
  }
}





