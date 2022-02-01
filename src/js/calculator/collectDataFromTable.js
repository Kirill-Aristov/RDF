document.querySelector(".payment").addEventListener("click", () => {
  const database = [];
  let rowsId = document.querySelectorAll(".rows-active");
  let number = document.querySelectorAll(".number_id"),
    name = document.querySelectorAll(".input__name"),
    content = document.querySelectorAll(".content"),
    humidity = document.querySelectorAll(".humidity"),
    ashContent = document.querySelectorAll(".ashContent"),
    heatСombustion = document.querySelectorAll(".heatСombustion");
  for (let line = 0; line < rowsId.length; line++) {
    database.push({
      numberСolumn: number[line].textContent,
      nameСolumn: name[line].value,
      massa: Number(content[line].value.replace(/,/g, ".")),
      humidityСolumn: Number(humidity[line].value.replace(/,/g, ".")),
      ashContentСolumn: Number(ashContent[line].value.replace(/,/g, ".")),
      heatСombustionСolumn: Number(heatСombustion[line].value.replace(/,/g, ".")),
    });
  };

  sheckMassa.massaErrorCheck(database);
});