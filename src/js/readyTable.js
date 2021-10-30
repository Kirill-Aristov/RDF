document.querySelectorAll(".dropdown-item__ready").forEach(e => {
  e.addEventListener("click", () => {
    let data = [];
    let newData;
    if (e.dataset.value == 40) {
      baseAutoComplite.forEach(element => {
        data.push(element.HeaderName)
      })
      newData = [...new Set(data)].filter((x) => {
        return x !== undefined;
      })
      newData.forEach(item => {
        CreateHeader(item)
      })
    } 
  })
})
