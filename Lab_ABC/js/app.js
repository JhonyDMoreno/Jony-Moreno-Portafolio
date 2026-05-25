let contador = 0;

function voltear(card) {
  const yaVista = card.classList.contains("volteada");

  // Agrega o quita la clase .volteada
  card.classList.toggle("volteada");

  // Solo suma al contador si es la PRIMERA vez que se voltea
  if (!yaVista) {
    contador++;
    document.getElementById("contador").textContent = contador;
  }
}

function filtrar(tipo) {
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    if (tipo === "todas") {
      card.style.display = "block";
    } else if (tipo === "vocales") {
      card.style.display =
        card.dataset.tipo === "vocal" ? "block" : "none";
    }
  });
}