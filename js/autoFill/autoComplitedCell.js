function autoCompliteCell() {
  if (checkBox.classList.contains("check-active")) {
    const valueName = document.querySelectorAll(".input_name")
    for (let i = 0; i < valueName.length; i++) {
      valueName[i].removeEventListener("change", otherAutoDilling)
      valueName[i].addEventListener("change", () => {
        otherAutoDilling(valueName[i])
      })
    }
  }
}
function otherAutoDilling(valueName) {
  for (let i = 0; i < baseAutoComplite.length; i++) {
    if (baseAutoComplite[i].name == valueName.value) {
      console.log(valueName)

    }
  }

}