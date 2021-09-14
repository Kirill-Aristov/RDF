const checkBox = document.querySelector(".checkbox-box__slider")
checkBox.addEventListener("click", () => {
  if (!checkBox.classList.contains("check-active")) {
    checkBox.classList.add("check-active")
    autoComplete()
  } else {
    checkBox.classList.remove("check-active")
    autoCompleteRemove()
  }
})
const checkBoxText = document.querySelector(".checkbox-box__text")
function autoComplete() {
  checkBoxText.textContent = "Автозаполнение включено"
  console.log(true)
}
function autoCompleteRemove() {
  checkBoxText.textContent = "Автозаполнение выключено"
  console.log(false)
}