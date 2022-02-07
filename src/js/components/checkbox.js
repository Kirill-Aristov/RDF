let textCheckBox = document.querySelector(".checkbox-box__text");
const checkBox = document.querySelector(".checkbox-box__slider");
checkBox.addEventListener("click", () => {
  if (!checkBox.classList.contains("check-active")) {
    checkBox.classList.add("check-active");
    textCheckBox.textContent = "Автозаполнение справочными данными включено"
  } else {
    checkBox.classList.remove("check-active");
    textCheckBox.textContent = "Автозаполнение справочными данными выключено"
  };
});
