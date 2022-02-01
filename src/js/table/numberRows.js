function numberRows() {
  let numberId = document.querySelectorAll(".number_id")
  for (let index = 0; index < numberId.length; index++) {
    numberId[index].textContent = index + 1
  }
}