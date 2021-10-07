function checkHumidityErorr(humidity, span) {
  let humidityMax = Math.max.apply(Math, humidity);//максимальное число в массиве у влажности
  let humidityIndex = humidity.indexOf(humidityMax);//индекс максимального числа в массиве
  if (humidityMax > 100) {
    const text = "Влажность содержимого не может превышать 100%";
    windowErorr("humidityError_error", humidityIndex, text, span);
    return false
  }
  return true
};