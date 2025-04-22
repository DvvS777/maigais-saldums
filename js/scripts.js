
document.addEventListener('DOMContentLoaded', function () {
  // ======== PRODUKTU IELĀDE ========
  fetch('data/products.json')
    .then(res => res.json())
    .then(data => {
      renderProducts(data);
      setupFiltering(data);
      generateProductSelection(data);
    });

  // ======== PRODUKTU ATTĒLOŠANA ========
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

  // ======== FILTRĒŠANAS POGAS ========
  function setupFiltering(products) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const category = button.getAttribute('data-category');
        const filtered = category === 'all' ? products : products.filter(p => p.category === category);
        renderProducts(filtered);
      });
    });
  }

  // ======== ATSAUKSMES ========
  fetch('data/testimonials.json')
    .then(res => res.json())
    .then(renderTestimonials);

  function renderTestimonials(testimonials) {
    const container = document.getElementById('testimonial-slider');
    container.innerHTML = '';

    testimonials.forEach(t => {
      const card = document.createElement('div');
      card.classList.add('testimonial');
      const img = t.image ? t.image : 'images/testimonials/default.jpg';
      card.innerHTML = `
        <img src="${img}" alt="${t.name}">
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

  // ======== PRODUKTU MODĀLIS ========
  const modal = document.getElementById("product-modal");
  const modalImage = document.getElementById("modal-image");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalPrice = document.getElementById("modal-price");
  const modalClose = document.getElementById("modal-close");

  function activateProductModals() {
    const viewButtons = document.querySelectorAll(".view-btn");

    viewButtons.forEach(button => {
      button.addEventListener("click", () => {
        const card = button.closest(".product-card");
        modalImage.src = card.querySelector("img").src;
        modalTitle.textContent = card.querySelector("h3").textContent;
        modalDescription.textContent = card.querySelector("p").textContent;
        modalPrice.textContent = card.querySelector(".product-price").textContent;
        modal.classList.remove("hidden");
      });
    });
  }

  modalClose.addEventListener("click", () => modal.classList.add("hidden"));
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.add("hidden");
  });

  // ======== PASŪTĪJUMA FORMAS MODĀLIS ========
  const orderModal = document.getElementById("order-modal");
  const orderModalClose = document.getElementById("order-modal-close");
  const orderBtn = document.getElementById("open-order-modal");
  const modalOrderBtn = document.getElementById("modal-order");

  orderBtn.addEventListener("click", () => {
    orderModal.classList.remove("hidden");
  });

  modalOrderBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    orderModal.classList.remove("hidden");
  });

  orderModalClose.addEventListener("click", () => {
    orderModal.classList.add("hidden");
  });

  orderModal.addEventListener("click", e => {
    if (e.target === orderModal) orderModal.classList.add("hidden");
  });

  // ======== PRODUKTU IZVĒLE FORMĀ ========
  function generateProductSelection(products) {
    const container = document.getElementById('product-selection');
    container.innerHTML = '<h4>Izvēlieties produktus un daudzumu:</h4>';

    products.forEach(product => {
      const item = document.createElement('div');
      item.innerHTML = `
        <label>
          <input type="checkbox" name="product" value="${product.name}" />
          ${product.name}
        </label>
        <input type="number" name="quantity-${product.name}" min="1" max="99" placeholder="Daudzums" style="width: 80px; margin-left: 10px;" />
      `;
      container.appendChild(item);
    });
  }

  // ======== FORMAS APSTRĀDE ========
  const form = document.getElementById("order-form");
  const popup = document.getElementById("form-popup");
  const popupClose = document.getElementById("popup-close");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Datu apkopošana
    const selectedProducts = [];
    form.querySelectorAll('input[name="product"]:checked').forEach(input => {
      const name = input.value;
      const qtyInput = form.querySelector(`input[name="quantity-${name}"]`);
      const qty = qtyInput ? qtyInput.value : '1';
      selectedProducts.push(`${name} (${qty} gab.)`);
    });

    const date = document.getElementById("order-date").value;
    const time = document.getElementById("order-time").value;
    const phone = document.getElementById("order-phone").value;
    const comment = document.getElementById("order-comment").value;

    const message = `
🧁 JAUNS PASŪTĪJUMS:
📦 Produkti: ${selectedProducts.join(', ')}
📅 Datums: ${date}
⏰ Laiks: ${time}
📞 Telefons: ${phone}
💬 Komentārs: ${comment}
    `;

    // Nosūtīt uz Telegram (šeit jāpievieno fetch uz jūsu API)
    console.log(message);

    // Tīrīšana
    form.reset();
    orderModal.classList.add("hidden");
    popup.classList.remove("hidden");
  });

  popupClose.addEventListener("click", () => {
    popup.classList.add("hidden");
  });
});
