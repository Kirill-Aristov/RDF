
document.querySelectorAll(".ready-table").forEach(element => {
  element.addEventListener("click", () => readyTable.dataValue(element))
})
class ReadyTable {
  constructor() {
    this.dataReady = [];
    this.newData = [];
  }
  dataValue(element) {
    if (element.dataset.value == 40) {
      baseAutoComplite.forEach(element => {
        this.dataReady.push(element.HeaderName);
      });
      this.newData = [...new Set(this.dataReady)].filter((x) => {
        return x !== undefined;
      });
      this.newData.forEach(item => {
        createTable.CreateHeader(item);
        createTable.chekNameHeader(item);
      });
      numberRows();
    }
    if (element.dataset.value == 13) {
      createTable.CreateHeader("Упрощенный компонентный состав");
      baseNameThree.forEach(element => {
        createTable.createRowsTable(element);
      });
      numberRows();
    }
  }
}
const readyTable = new ReadyTable();