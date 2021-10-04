function checkAshContentErorr(ashContent, span) {
  let ashContentMax = Math.max.apply(Math, ashContent); //максимальное число в массиве у зольности
  let ashContentIndex = ashContent.indexOf(ashContentMax); //индекс максимального чилсва в массиве
  if (ashContentMax > 100) {
    const text = "Зольность содержимого не может превышать 100%";
    windowErorr("achContent_error", ashContentIndex, text, span);
    return false
  }
  return true
}