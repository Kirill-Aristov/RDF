const header = document.querySelector(".nav")
const burger = document.querySelector(".burger")
burger.addEventListener("click", () => {
  if (!burger.classList.contains("active")) {
    burger.classList.add("active");
    header.classList.add("active");
  } else {
    burger.classList.remove("active");
    header.classList.remove("active");
  };
});
  container.addEventListener("click", (element) => {
    if (element.target !== header) {
      burger.classList.remove("active");
      header.classList.remove("active");
    }
  })
