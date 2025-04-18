// Produktu dati tiek ielādēti no ārējā JSON faila
fetch('data/products.json')
  .then(response => response.json())
  .then(data => {
    renderProducts(data);
    setupFiltering(data);
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
        <img src="${product.image}" alt="${product.title}" class="product-image" />
      </div>
      <div class="product-info">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <p class="product-price">${product.price}</p>
        <button class="view-btn">Apskatīt</button>
      </div>
    `;

    container.appendChild(card);
  });
}

// Filtrēšanas funkcionalitāte
function setupFiltering(products) {
  const buttons = document.querySelectorAll('.filter-btn, .tab-btn');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const category = button.getAttribute('data-category');
      const filtered = category === 'all'
        ? products
        : products.filter(product => product.category === category);

      renderProducts(filtered);
    });
  });
}
