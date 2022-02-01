const checkBox = document.querySelector(".checkbox-box__slider");
checkBox.addEventListener("click", () => {
  if (!checkBox.classList.contains("check-active")) {
    checkBox.classList.add("check-active");
  } else {
    checkBox.classList.remove("check-active");
  };
});
