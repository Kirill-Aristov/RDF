function checkFullmassaErorr(fullMassa, span, id) {
  const table = document.getElementById("table");
  if (fullMassa < 100) {
    addWindow(fullMassa * 1000);
    return false
  }
  if (fullMassa > 100) {
    removeErorr()
    span.setAttribute("class", "massa_error");
    span.innerText = "Содержание не должно превышать 100%" + "\n" + "содержание = " + fullMassa + "%";
    span.style.top = -65 + "px";
    table.appendChild(span);
    console.log(table.appendChild(span))
    span.addEventListener("click", () => {
      table.removeChild(span);
    });
    return false
  }
  return true
}