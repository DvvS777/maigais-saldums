// ==========================
// DOMContentLoaded – sākotnējā ielāde
// ==========================
document.addEventListener('DOMContentLoaded', function () {

  // ==========================
  // Produktu ielāde no JSON
  // ==========================
  fetch('data/products.json')
    .then(response => response.json())
    .then(data => {
      renderProducts(data);
      setupFiltering(data);
    })
    .catch(error => console.error('Kļūda ielādējot produktus:', error));

  // ==========================
  // Funkcija: Produktu renderēšana HTML kartītēs
  // ==========================
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

    activateProductModals();
  }

  // ==========================
  // Filtru loģika
  // ==========================
  function setupFiltering(products) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const category = button.getAttribute('data-category');
        const filtered = category === 'all'
          ? products
          : products.filter(p => p.category === category);

        renderProducts(filtered);
      });
    });
  }

  // ==========================
  // Atsauksmju ielāde no JSON
  // ==========================
  fetch('data/testimonials.json')
    .then(response => response.json())
    .then(data => renderTestimonials(data))
    .catch(error => console.error('Kļūda ielādējot atsauksmes:', error));

  // ==========================
  // Atsauksmju renderēšana
  // ==========================
  function renderTestimonials(testimonials) {
    const container = document.getElementById('testimonial-slider');
    container.innerHTML = '';

    testimonials.forEach(t => {
      const card = document.createElement('div');
      card.classList.add('testimonial');

      const imgSrc = t.image ? t.image : 'images/testimonials/default.jpg';

      card.innerHTML = `
        <img src="${imgSrc}" alt="${t.name}">
        <h4>${t.name}</h4>
        <div class="testimonial-rating">${getStars(t.rating)}</div>
        <p>"${t.text}"</p>
      `;

      container.appendChild(card);
    });
  }

  // ==========================
  // Palīgfunkcija: Zvaigzņu vizualizācija
  // ==========================
  function getStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return '⭐'.repeat(full) + (half ? '⭐️' : '') + '☆'.repeat(empty);
  }

  // ==========================
  // Slider bultu darbība
  // ==========================
  document.getElementById('prev-btn').addEventListener('click', () => {
    document.getElementById('testimonial-slider').scrollBy({ left: -320, behavior: 'smooth' });
  });

  document.getElementById('next-btn').addEventListener('click', () => {
    document.getElementById('testimonial-slider').scrollBy({ left: 320, behavior: 'smooth' });
  });

  // ==========================
  // MODĀLAIS LOGS (produkts)
  // ==========================
  const modal = document.getElementById("product-modal");
  const modalImage = document.getElementById("modal-image");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalPrice = document.getElementById("modal-price");
  const modalClose = document.getElementById("modal-close");

  function activateProductModals() {
    const buttons = document.querySelectorAll(".view-btn");

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const card = btn.closest(".product-card");
        modalImage.src = card.querySelector("img").src;
        modalTitle.textContent = card.querySelector("h3").textContent;
        modalDescription.textContent = card.querySelector("p").textContent;
        modalPrice.textContent = card.querySelector(".product-price").textContent;
        modal.classList.remove("hidden");
      });
    });
  }

  modalClose.addEventListener("click", () => modal.classList.add("hidden"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });

  // ==========================
  // PASŪTĪJUMA FORMA + POPUP
  // ==========================
  const orderForm = document.getElementById("order-form");
  const popup = document.getElementById("form-popup");
  const popupClose = document.getElementById("popup-close");

  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // (Paplašināma daļa – datu apstrāde nākotnē)
    const name = orderForm.querySelector('input[type="text"]').value;
    const email = orderForm.querySelector('input[type="email"]').value;
    const message = orderForm.querySelector('textarea').value;

    console.log("Pasūtījums:", { name, email, message });

    popup.classList.remove("hidden");
    orderForm.reset();
  });

  popupClose.addEventListener("click", () => {
    popup.classList.add("hidden");
  });

});
