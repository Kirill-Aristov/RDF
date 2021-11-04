const checkBox = document.querySelector(".checkbox-box__slider");
checkBox.addEventListener("click", () => {
  if (!checkBox.classList.contains("check-active")) {
    checkBox.classList.add("check-active");
    autoComplete(checkBox);
  } else {
    checkBox.classList.remove("check-active");
    autoCompleteRemove();
  };
});
const checkBoxText = document.querySelector(".checkbox-box__text");
function autoComplete() {
  checkBoxText.textContent = "Автозаполнение справочными данными включено";
};
function autoCompleteRemove() {
  checkBoxText.textContent = "Автозаполнение справочными данными выключено";

  document.querySelectorAll(".input__name").forEach((e) => {
    e.removeEventListener("change", otherAutoDilling);
  });
};