function removeErorr() {
  const spanActive = document.querySelectorAll("#active");
  for (let i = 0; i < spanActive.length; i++) {
    spanActive[i].remove();
  };
};