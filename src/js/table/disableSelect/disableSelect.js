class DisableSelect {
  disable(item) {
    document.querySelectorAll(".btn-control__menu-item").forEach(element => {
      if (element.textContent == "Пустой заголовок") {
        return
      }
      if (element.textContent == item) {
        element.classList.add("strike")
        // this.checkDisable()
      }
    });
  }
  unlock(item) {
    let activeItem = item.querySelector(".headingTable").value;
    document.querySelectorAll(".btn-control__menu-item").forEach(element => {
      if (element.textContent == activeItem) {
        element.classList.remove("strike")
      }
    });
  }
  checkDisable() {
  }
}
const disableSelect = new DisableSelect();