document.addEventListener('DOMContentLoaded', function () {
  fetch('data/products.json')
    .then(response => response.json())
    .then(data => {
      const productList = document.getElementById('product-list');
      data.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'card product-card tab-content active';
        productCard.setAttribute('data-category', product.category);

        const image = document.createElement('img');
        image.src = product.image;
        image.alt = product.name;

        const infoDiv = document.createElement('div');
        infoDiv.className = 'info';

        const title = document.createElement('h3');
        title.textContent = product.name;

        const desc = document.createElement('p');
        desc.textContent = product.description;

        const price = document.createElement('div');
        price.className = 'price';
        price.textContent = product.price;

        infoDiv.appendChild(title);
        infoDiv.appendChild(desc);
        infoDiv.appendChild(price);

        productCard.appendChild(image);
        productCard.appendChild(infoDiv);
        productList.appendChild(productCard);
      });
    });

  // Filtru funkcionalitāte
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      document.querySelector('.tab-btn.active')?.classList.remove('active');
      button.classList.add('active');
      const category = button.getAttribute('data-category');

      const cards = document.querySelectorAll('.product-card');
      cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});
