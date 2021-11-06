function disableHeaderSelect(nameElement) {
  if (nameElement.textContent === "Пустой заголовок") {
    return
  } else {
    nameElement.classList.add("strike")
    checkHeaderSeleck()
  }
}
function swutchedHeaderSelect(nameElement) {
  console.log(nameElement)
  document.querySelectorAll(".dropdown-item").forEach(item => {
    if (nameElement == item.textContent) {
      item.classList.remove("strike")
    }
  })
}
function checkHeaderSeleck() {
  let prevName;
  let postName;
  document.querySelectorAll("#headingTable").forEach(item => {
    item.addEventListener("click", () => {
      prevName = item.value
    })
    item.addEventListener("change", () => {
      postName = item.value
      if (prevName != postName) {
        swutchedHeaderSelect(prevName)
      }
    })
  })
}