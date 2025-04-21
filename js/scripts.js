document.addEventListener('DOMContentLoaded', function () {
  // ======================
  // PRODUKTU IELĀDE UN ATTĒLOŠANA
  // ======================
  fetch('data/products.json')
    .then(response => response.json())
    .then(data => {
      renderProducts(data);
      setupFiltering(data);
    })
    .catch(error => console.error('Kļūda ielādējot produktus:', error));

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

  // ======================
  // ATSAUKSMJU SLIDERIS
  // ======================
  fetch('data/testimonials.json')
    .then(response => response.json())
    .then(data => renderTestimonials(data))
    .catch(error => console.error('Kļūda ielādējot atsauksmes:', error));

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

  function getStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return '⭐'.repeat(full) + (half ? '⭐️' : '') + '☆'.repeat(empty);
  }

  document.getElementById('prev-btn').addEventListener('click', () => {
    document.getElementById('testimonial-slider').scrollBy({ left: -320, behavior: 'smooth' });
  });

  document.getElementById('next-btn').addEventListener('click', () => {
    document.getElementById('testimonial-slider').scrollBy({ left: 320, behavior: 'smooth' });
  });

  // ======================
  // MODĀLAIS LOGS AR PRODUKTU INFO
  // ======================
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

  // ======================
  // FORMAS PĀRVALDĪBA – GALVENĀ FORMA
  // ======================
  const orderForm = document.getElementById("order-form");
  const popup = document.getElementById("form-popup");
  const popupClose = document.getElementById("popup-close");

  if (orderForm) {
    orderForm.addEventListener("submit", (e) => {
      e.preventDefault();
      popup.classList.remove("hidden");
      orderForm.reset();
    });
  }

  popupClose.addEventListener("click", () => {
    popup.classList.add("hidden");
  });

  // ======================
  // FORMAS PĀRVALDĪBA – MODĀLĀ LOGA FORMA
  // ======================
  const modalOrderBtn = document.getElementById("modal-order");

  if (modalOrderBtn) {
    modalOrderBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
      popup.classList.remove("hidden");
    });
  }
});
