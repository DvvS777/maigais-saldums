document.addEventListener('DOMContentLoaded', async function () {
  const config = await fetch('data/config.json').then(res => res.json());
  const productData = await fetch('data/products.json').then(res => res.json());

  const productList = document.getElementById('product-list');
  const filterContainer = document.getElementById('product-filters');

  // Funkcija, lai izveidotu vienu produkta kartīti
  function createProductCard(product) {
    return `
      <div class="card tab-content" data-category="${product.category}">
        <img src="${product.image}" alt="${product.name}" />
        <div class="info">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="price">${product.price}</div>
          <button class="view-button">Apskatīt</button>
        </div>
      </div>
    `;
  }

  // Ievieto visus produktus lapā
  productList.innerHTML = productData.map(p => createProductCard(p)).join('');

  // Izveido filtrus dinamiski
  let categories = [...new Set(productData.map(p => p.category))];
  filterContainer.innerHTML = `
    <button class="tab-btn active" data-category="all">Visi produkti</button>
    ${categories.map(cat => `<button class="tab-btn" data-category="${cat}">${cat}</button>`).join('')}
  `;

  // Filtra darbība
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-category');

      document.querySelectorAll('.tab-content').forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});
