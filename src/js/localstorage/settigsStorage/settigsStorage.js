
class SettigsStorage {
  constructor() {
    this.div = document.createElement("div");
  }
  startSheckStorageSettigs() {
    if (localStorage.getItem("optionalAutocomplete") == null) {
      let optionalData = {
        name: "прочее(остаток)",
        humidity: "100",
        ashContent: "0",
        heat: "0",
      }
      localStorageUtils.setStorage("optionalAutocomplete", optionalData)
    }
  }
  settigsWindow(div, massa) {
    let settigsData = localStorageUtils.getStorage("optionalAutocomplete");
    div.innerHTML = `
    <h2> Настройка дополнительного автозаполнения недостающего содержания</h2>
    <div class="settings-window">
      <div class="settings-window__text">
      Название
      </div>
        <input class="settings-window__input" type="text" value="${settigsData.name}">
      <div class="settings-window__text">
      Влажность, %
      </div>
        <input class="settings-window__input" type="number" value="${settigsData.humidity}">
      <div class="settings-window__text">
      Зольность на сухую массу, %
      </div>
        <input class="settings-window__input" type="number" value="${settigsData.ashContent}">
      <div class="settings-window__text">
      Теплота сгорания на сухую беззольную массу, мДж/кг
      </div>
        <input class="settings-window__input" type="number" value="${settigsData.heat}">
    </div>
    <div class="settings-block">
      <button class="settings-block__btn back" type="button">Назад</button>
      <button class="settings-block__btn save" type="button">Сохранить</button>
    </div>`
    document.querySelector(".back").addEventListener("click", () => {
      errorMassa.lessMassa(massa)
    })
    document.querySelector(".save").addEventListener("click", () => {
      const dataSettigs = document.querySelectorAll(".settings-window__input");
      settigsData = {
        name: dataSettigs[0].value,
        humidity: dataSettigs[1].value,
        ashContent: dataSettigs[2].value,
        heat: dataSettigs[3].value,
      };
      localStorageUtils.setStorage("optionalAutocomplete", settigsData);
      errorMassa.lessMassa(massa);
    })
  }
}
const settigsStorage = new SettigsStorage();
settigsStorage.startSheckStorageSettigs();