 function SetInterval(opacityNum) {
  const div = document.querySelector(".error")
  if (opacityNum > 0) {
    div.style.opacity = opacityNum
    setTimeout(SetInterval, 50, opacityNum - 0.1)
  } else {
    div.remove()
  }
}