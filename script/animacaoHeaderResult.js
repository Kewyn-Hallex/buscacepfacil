window.addEventListener("scroll", function () {
  let cabeca = document.querySelector("#cabeca");
  cabeca.classList.toggle("rolagem", this.window.scrollY > 0);
});
