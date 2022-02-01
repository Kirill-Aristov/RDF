const readyMenu = document.querySelector(".ready")
const listMenu = document.querySelector(".list")
const listBtn = document.querySelector(".btn-list")
listBtn.addEventListener("click", () => {
  if (!listMenu.classList.contains("show")) {
    listMenu.classList.add("show");
  } else {
    listMenu.classList.remove("show");
  }
})
const readyBtn = document.querySelector(".btn-ready")
readyBtn.addEventListener("click", () => {
  if (!readyMenu.classList.contains("show")) {
    readyMenu.classList.add("show");
  } else {
    readyMenu.classList.remove("show");
  }
})
document.body.addEventListener("click", (element) => {
  if (element.target !== listBtn) {
    listMenu.classList.add("show");
  }
  if (element.target !== readyBtn) {
    readyMenu.classList.add("show");
  }
})