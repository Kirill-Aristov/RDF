function errorCheck(database) {
  let inputData;
  document.querySelectorAll(".input__data").forEach(element => {
    if (element.value > 100) {
      inputData = element
    }
  })
  if (checkFullmassaErorr(database) && windowHumidityAshCsontent(inputData)) {
    removeErorr();
    calck(database);
  }
}
