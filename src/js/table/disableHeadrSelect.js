function disableHeadrSelect(element) {
  dataList.getElementsByTagName("option");
  (element != "Пустой заголовок") ? checkHeaderSelect(element, true) : "";
  dataList.value = "Добавить";
};
function includeHeadrSelectChange() {
  document.querySelectorAll("#headingTable").forEach((head) => {
    head.addEventListener("click", (lastName) => {
      let headerLastNames = lastName.target.value;//запоминает последние название
      head.addEventListener("change", (FersName) => {
        if (FersName.target.value != headerLastNames) { //верно если имена не совподают
          checkHeaderSelect(headerLastNames, false);
        }
      });
    });
  });
};
function includeHeadrSelect(element) {
  element.childNodes.forEach(e => {
    select = e.querySelector("input").value;
    if (select != "") {
      checkHeaderSelect(select, false);
    }
  });
};
function checkHeaderSelect(select, boolean) {
  dataList.getElementsByTagName("option");
  for (let i = 0; i < dataList.length; i++) {
    (dataList[i].value == select) ? dataList[i].disabled = boolean : "";
  };
};