function autoCompliteCell(input) {
  if (checkBox.classList.contains("check-active")) {
    const valueName = document.querySelectorAll(".input__name");
    for (let i = 0; i < valueName.length; i++) {
      valueName[i].removeEventListener("change", otherAutoDilling);
      valueName[i].addEventListener("change", () => {
        otherAutoDilling(valueName[i]);
      });
    };
  }
  if (input && checkBox.classList.contains("check-active")) {
    otherAutoDilling(input.childNodes[5].childNodes[1]);
  }
};
function otherAutoDilling(valueName) {
  for (let i = 0; i < baseAutoComplite.length; i++) {
    if (baseAutoComplite[i].name == valueName.value.toLowerCase()) {
      idRows(valueName.parentNode.parentNode, baseAutoComplite[i])
    }
  };
};
function idRows(id, { heat, ashContent, humidity, massa }) {
  id.childNodes[7].querySelector("input").value = massa; //клетка массы
  id.childNodes[9].querySelector("input").value = humidity;//клетка влажности
  id.childNodes[11].querySelector("input").value = ashContent;//клетка зольности
  id.childNodes[13].querySelector("input").value = heat;//клетка теплоты сгорания
};

