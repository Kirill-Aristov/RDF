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
  if (input) {
    otherAutoDilling(input);
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
  id.childNodes[3].querySelector("input").value = massa; //клетка массы
  id.childNodes[4].querySelector("input").value = humidity;//клетка влажности
  id.childNodes[5].querySelector("input").value = ashContent;//клетка зольности
  id.childNodes[6].querySelector("input").value = heat;//клетка теплоты сгорания
};

