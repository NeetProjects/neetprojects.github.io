/* -------------------------------------------------------*/
/* -------------->>> Sistema de Censura <<<--------------*/
/* -----------------------------------------------------*/

/* Elementos */
const censoredContainer = document.querySelector(".censored-container");
const censoredImage = censoredContainer.querySelector(".censored-image");
const censoredOverlay = censoredContainer.querySelector(".censored-overlay");
const censoredText = censoredOverlay.querySelector(".censored-text");

let censored = true;

function toggleSpoilerEffect() {
  /* Ligar */
  if (censored) {
    censoredImage.style.filter = "blur(10px)";
    censoredOverlay.style.opacity = 1;
    censoredText.style.display = "flex";
    /* Desligar */
  } else {
    censoredImage.style.filter = "none";
    censoredOverlay.style.opacity = 0;
    censoredText.style.display = "none";
  }
}

/* Verificar click na imagem para ligar e desligar */
censoredContainer.addEventListener("click", () => {
  censored = !censored;
  toggleSpoilerEffect();
});

/* Ativar automaticamente ao carregar a página */
if (censored) {
  toggleSpoilerEffect();
}