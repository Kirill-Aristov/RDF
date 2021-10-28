function checkFullmassaErorr(database) {
  let fullMassa = 0; //содержание
  database.forEach(element => {
    fullMassa += element.massa * 1000 / 1000;
  });
  const table = document.getElementById("table");
  if (fullMassa < 100) {
    massaWindowErorr(fullMassa * 1000);
    return false
  }
  if (fullMassa > 100) {
    removeErorr();
    const span = document.createElement("span");
    span.setAttribute("class", "massa_error");
    span.innerText = "Содержание не должно превышать 100%" + "\n" + "содержание = " + fullMassa + "%";
    span.style.top = (table.offsetTop - 65) + "px";
    table.appendChild(span);
    span.addEventListener("click", () => {
      table.removeChild(span);
    });
    return false
  }
  return true
};
