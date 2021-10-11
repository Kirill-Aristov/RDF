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
  checkBoxText.textContent = "Автозаполнение включено";
};
function autoCompleteRemove() {
  checkBoxText.textContent = "Автозаполнение выключено";
  document.querySelectorAll(".input_name").forEach((e) => {
    e.removeEventListener("change", otherAutoDilling);
  });
};