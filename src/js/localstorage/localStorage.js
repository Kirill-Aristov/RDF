class LocalStorageUtils {
  constructor(saveData) {
    this.dataName = "optionalAutocomplete";
    this.saveData = saveData;
  }
  getStorage(dataName) {
    let storageData = localStorage.getItem(dataName)
    return JSON.parse(storageData)
  }

  setStorage(dataName, saveData) {
    localStorage.setItem(dataName, JSON.stringify(saveData))
  }
}
const localStorageUtils = new LocalStorageUtils();