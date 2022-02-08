

class SheckMassa {
  constructor(database) {
    this.database = database;
  };
  massaErrorCheck(database) {
    let massa = 0;
    database.forEach(index => {
      massa += (index.massa * 1000);
    });
    if (massa / 1000 > 100) {
      errorMassa.exceedMassa(massa / 1000);
    } else if (massa / 1000 < 100) {
      errorMassa.lessMassa(massa / 1000);
    } else {
      calck(database);
    };
  }
};
const sheckMassa = new SheckMassa();

class ErrorMassa extends SettigsStorage {
  super(massa) {
    this.massa = massa
  }
  lessMassa(massa) {
    let optionalData = localStorageUtils.getStorage("optionalAutocomplete");
    this.div.classList.add("error-container");
    this.div.innerHTML = `
    <div class="error-container__text">
      Общее содержание компонентов должно быть равно 100%
      <p>Ваше содержание = ${massa}%</p>
      <p>Заполнить автоматический недостающие содержание компонентом "${optionalData.name}"
      </p>
    </div>
    <div>
      <button type="button" class="error-settings__btn">Настроить автозаполнение
      </button>
    </div>
    <div>
      <div class="error-container__btn">
      <button type="button" class="window-error__btn" value="нет">Нет</button>
      <button type="button" class="window-error__btn" value="да">Да</button>
    </div>
    `
    document.body.appendChild(this.div)
    buttonControl.windowError(this.div, massa)
  }
  exceedMassa(massa) {
    const divError = document.createElement("div")
    divError.classList.add("error")
    divError.classList.add("error-massa")
    divError.textContent = `содержание не должно превышать 100% \n ваше содержание = ${massa} %`
    table.appendChild(divError)
    let opacityNum = 1
     setTimeout(SetInterval, 2500, opacityNum)
  }
}
const errorMassa = new ErrorMassa();
class ButtonControl extends ErrorMassa {
  windowError(div, massa) {
    document.querySelector(".error-settings__btn").addEventListener("click", () => {
      settigsStorage.settigsWindow(div, massa)
    });
    document.querySelectorAll(".window-error__btn").forEach(target => {
      target.addEventListener("click", (element) => {
        if (element.target.value === "нет") {
          div.remove();
        } else {
          createTable.createRowsTable(localStorageUtils.getStorage("optionalAutocomplete"), 0);
          document.querySelector(".content").value = (100*1000 - (massa * 1000)) / 1000;
          numberRows();
          div.remove();
        }
      })
    })
  }
}
const buttonControl = new ButtonControl();