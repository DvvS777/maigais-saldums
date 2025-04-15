document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  loadTestimonials();
});

// === Funkcija, lai ielādētu produktus ===
function loadProducts() {
  fetch('data/products.json')
    .then(response => response.json())
    .then(products => {
      const container = document.getElementById('product-list');
      if (!container) return;
      container.innerHTML = '';

      products.forEach(product => {
        const productHTML = `
          <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">${product.price}</p>
          </div>
        `;
        container.innerHTML += productHTML;
      });
    })
    .catch(error => console.error('Produktu ielādes kļūda:', error));
}

// === Funkcija, lai ielādētu klientu atsauksmes ===
function loadTestimonials() {
  fetch('data/testimonials.json')
    .then(response => response.json())
    .then(testimonials => {
      const container = document.getElementById('testimonial-list');
      if (!container) return;
      container.innerHTML = '';

      testimonials.forEach(t => {
        const stars = '★'.repeat(t.rating) + '☆'.repeat(5 - t.rating);
        const testimonialHTML = `
          <div class="testimonial">
            <p>"${t.comment}"</p>
            <div class="author">${t.name}</div>
            <div class="rating">${stars}</div>
          </div>
        `;
        container.innerHTML += testimonialHTML;
      });
    })
    .catch(error => console.error('Atsauksmju ielādes kļūda:', error));
}
