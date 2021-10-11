function autoCompliteCell(input) {
  if (checkBox.classList.contains("check-active")) {
    const valueName = document.querySelectorAll(".input_name");
    for (let i = 0; i < valueName.length; i++) {
      valueName[i].removeEventListener("change", otherAutoDilling);
      valueName[i].addEventListener("change", () => {
        otherAutoDilling(valueName[i]);
      });
    };
    otherAutoDilling(input);
  }
};
function otherAutoDilling(valueName) {
  for (let i = 0; i < baseAutoComplite.length; i++) {
    if (baseAutoComplite[i].name == valueName.value.toLowerCase()) {
      idRows(valueName.parentNode.parentNode, baseAutoComplite[i].heat, baseAutoComplite[i].ashContent, baseAutoComplite[i].humidity, baseAutoComplite[i].massa)
    }
  };
};
function idRows(id, heat, ashContent, humidity, massa) {
  id.childNodes[6].querySelector("input").value = heat;
  id.childNodes[5].querySelector("input").value = ashContent;
  id.childNodes[4].querySelector("input").value = humidity;
  id.childNodes[3].querySelector("input").value = massa;
};

