// Produktu dati tiek ielādēti no ārējā JSON faila
fetch('data/products.json')
  .then(response => response.json())
  .then(data => {
    renderProducts(data);
    setupFiltering(data); // filtrēšanas pogas piesaista kartītēm
  })
  .catch(error => {
    console.error('Kļūda ielādējot produktus:', error);
  });

// Funkcija produktu attēlošanai
function renderProducts(products) {
  const container = document.getElementById('product-list');
  container.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.setAttribute('data-category', product.category);

    card.innerHTML = `
      <div class="product-image-wrapper">
        <img src="images/${product.image}" alt="${product.name}" class="product-image" />
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="product-price">${product.price}</p>
        <button class="view-btn">Apskatīt</button>
      </div>
    `;

    container.appendChild(card);
  });

  activateProductModals(); // piesaista modālos logus tikko izveidotajām kartītēm
}

// Filtrēšanas funkcionalitāte
function setupFiltering(products) {
  const buttons = document.querySelectorAll('.filter-btn');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const category = button.getAttribute('data-category');
      const filtered = category === 'all'
        ? products
        : products.filter(product => product.category === category);

      renderProducts(filtered); // pārtaisa kartītes pēc filtra
    });
  });
}

// Ielādē atsauksmes no JSON un attēlo sliderī
fetch('data/testimonials.json')
  .then(response => response.json())
  .then(data => {
    renderTestimonials(data);
  })
  .catch(error => {
    console.error('Kļūda ielādējot atsauksmes:', error);
  });

// Funkcija atsauksmju renderēšanai sliderī
function renderTestimonials(testimonials) {
  const container = document.getElementById('testimonial-slider');
  container.innerHTML = '';

  testimonials.forEach(testimonial => {
    const card = document.createElement('div');
    card.classList.add('testimonial');

    const imageSrc = testimonial.image ? testimonial.image : 'images/testimonials/default.jpg';

    card.innerHTML = `
      <img src="${imageSrc}" alt="${testimonial.name}">
      <h4>${testimonial.name}</h4>
      <div class="testimonial-rating">${getStars(testimonial.rating)}</div>
      <p>"${testimonial.text}"</p>
    `;

    container.appendChild(card);
  });
}

// Zvaigžņu attēlošanas funkcija
function getStars(rating) {
  const fullStar = '⭐';
  const halfStar = '⭐️'.slice(0, 1);
  const emptyStar = '☆';

  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;

  return fullStar.repeat(full) + (half ? halfStar : '') + emptyStar.repeat(empty);
}

// Slidera pogas
document.getElementById('prev-btn').addEventListener('click', () => {
  document.getElementById('testimonial-slider').scrollBy({ left: -320, behavior: 'smooth' });
});

document.getElementById('next-btn').addEventListener('click', () => {
  document.getElementById('testimonial-slider').scrollBy({ left: 320, behavior: 'smooth' });
});

// ===== MODĀLAIS LOGS =====
const modal = document.getElementById("product-modal");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalPrice = document.getElementById("modal-price");
const modalClose = document.getElementById("modal-close");

// Funkcija, kas piesaista event listener katrai pogai "Apskatīt"
function activateProductModals() {
  const viewButtons = document.querySelectorAll(".view-btn");

  viewButtons.forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".product-card");
      const img = card.querySelector("img").src;
      const title = card.querySelector("h3").textContent;
      const desc = card.querySelector("p").textContent;
      const price = card.querySelector(".product-price").textContent;

      modalImage.src = img;
      modalTitle.textContent = title;
      modalDescription.textContent = desc;
      modalPrice.textContent = price;

      modal.classList.remove("hidden");
    });
  });
}

// Aizvēršana ar X
modalClose.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Aizvēršana, spiežot ārpus modāļa
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});
