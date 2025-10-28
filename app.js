let trenutniIndex = 0;
let skor = 0;
let pitanja = [];

fetch('pitanjazapleka.json')
  .then(res => res.json())
  .then(data => {
    pitanja = data;
    prikaziPitanje();
  });

const quizDiv = document.getElementById('quiz');
const nextBtn = document.getElementById('next-btn');
const resultDiv = document.getElementById('result');

function prikaziPitanje() {
  const pitanje = pitanja[trenutniIndex];
  quizDiv.innerHTML = `
    <h2>${pitanje.pitanje}</h2>
    ${pitanje.odgovori
      .map(
        (odgovor, index) =>
          `<div class="option" onclick="odaberi(${index})">${odgovor}</div>`
      )
      .join('')}
  `;
}

function odaberi(index) {
  const pitanje = pitanja[trenutniIndex];
  const opcije = document.querySelectorAll('.option');

  opcije.forEach((opcija, i) => {
    if (i === pitanje.tacan) opcija.classList.add('correct');
    else if (i === index) opcija.classList.add('wrong');
    opcija.style.pointerEvents = 'none';
  });

  if (index === pitanje.tacan) skor++;
}

nextBtn.onclick = () => {
  trenutniIndex++;
  if (trenutniIndex < pitanja.length) {
    prikaziPitanje();
  } else {
    prikaziRezultat();
  }
};

function prikaziRezultat() {
  quizDiv.style.display = 'none';
  nextBtn.style.display = 'none';
  resultDiv.innerHTML = `<h2>Tvoj rezultat: ${skor} / ${pitanja.length}</h2>
  <p>${skor === pitanja.length ? "Savršen rezultat! ❤️ Vaso je ponosan!" : "Dobar pokušaj, ali Vaso očekuje više 😅"}</p>`;
}
