function windowErorr(className, index, text, span) {
  removeErorr();
  span.setAttribute("class", className);
  span.innerText = text;
  span.style.top = (table.offsetTop + 5 + 50 * (index + 1)) + "px";
  table.appendChild(span);
  span.scrollIntoView()
  span.addEventListener("click", () => {
    table.removeChild(span);
  });
};