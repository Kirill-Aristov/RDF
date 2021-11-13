function checkFullmassaErorr(database) {
  //содержание
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  let m = [];
  database.forEach(element => {
    m.push(element.massa * 1000)
  });
  let fullMassa = m.reduce(reducer) / 1000
  console.log(fullMassa)
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
