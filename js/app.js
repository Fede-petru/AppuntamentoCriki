const btnNo = document.getElementById('btn-no');

let isFirstMove = true;

function moveButton() {
  // La prima volta che scappa, lo trasformiamo in absolute per farlo muovere ovunque
  if (isFirstMove) {
    btnNo.style.position = 'absolute';
    isFirstMove = false;
  }

  const padding = 40;
  const maxX = window.innerWidth - btnNo.offsetWidth - padding;
  const maxY = window.innerHeight - btnNo.offsetHeight - padding;

  const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
  const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

  btnNo.style.left = randomX + 'px';
  btnNo.style.top = randomY + 'px';
}

function resetPosition() {
  if (!isFirstMove) {
    // Torna a essere relativo e si rimette ordinatamente di fianco al Sì
    btnNo.style.position = 'relative';
    btnNo.style.left = '0px';
    btnNo.style.top = '0px';
    isFirstMove = true;
  }
}

// Quando il mouse ci va sopra, scappa
btnNo.addEventListener('mouseover', moveButton);
btnNo.addEventListener('touchstart', (e) => {
  e.preventDefault();
  moveButton();
});

// Quando il mouse si allontana, torna al suo posto dopo 400ms
btnNo.addEventListener('mouseleave', () => {
  setTimeout(resetPosition, 400);
});

// --- DA QUI IN POI LASCIA IL RESTO DEL TUO JS INVARIATO (nextStep, goToStep3, ecc.) ---


// --- NAVIGAZIONE INTERNA ---
function nextStep(stepNumber) {
  document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
  document.getElementById('step-' + stepNumber).classList.add('active');
  if(stepNumber > 1) {
    btnNo.style.display = 'none';
  }
}

function goToStep3() {
  const dateInput = document.getElementById('date').value;
  const timeInput = document.getElementById('time').value;

  if (!dateInput || !timeInput) {
    alert("Scegli un giorno e un orario prima di continuare! 💜");
    return;
  }
  nextStep(3);
}

// --- SELEZIONE RISTORANTE ---
function selectRestaurant(restaurantName, element) {
  document.querySelectorAll('.restaurant-option').forEach(opt => opt.classList.remove('selected'));
  element.classList.add('selected');
  document.getElementById('selected-restaurant').value = restaurantName;
  document.getElementById('btn-submit').removeAttribute('disabled');
}
// --- BLOCCO DELLE DATE PASSATE ---
document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById('date');

  // Prende la data di oggi nel fuso orario locale
  const oggi = new Date();

  // La formatta in anno-mese-giorno (YYYY-MM-DD) richiesta dall'HTML5
  const anno = oggi.getFullYear();
  const mese = String(oggi.getMonth() + 1).padStart(2, '0');
  const giorno = String(oggi.getDate()).padStart(2, '0');

  const dataMinima = `${anno}-${mese}-${giorno}`;

  // Imposta il giorno minimo selezionabile sul calendario (da oggi in poi)
  dateInput.min = dataMinima;
});
