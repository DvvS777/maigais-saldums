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

// Ielādē atsauksmes no JSON un attēlo karuselī
fetch('data/testimonials.json')
  .then(response => response.json())
  .then(data => {
    renderTestimonials(data);
  })
  .catch(error => {
    console.error('Kļūda ielādējot atsauksmes:', error);
  });

let testimonialIndex = 0;

// Funkcija atsauksmju renderēšanai
function renderTestimonials(testimonials) {
  const container = document.getElementById('testimonial-list');
  const leftBtn = document.getElementById('testimonial-left');
  const rightBtn = document.getElementById('testimonial-right');

  function updateView() {
    container.innerHTML = '';
    const visible = testimonials.slice(testimonialIndex, testimonialIndex + 3);

    visible.forEach(testimonial => {
      const card = document.createElement('div');
      card.classList.add('testimonial');

      const imageSrc = testimonial.image && testimonial.image !== ''
        ? testimonial.image
        : 'images/default.jpg';

      card.innerHTML = `
        <img src="${imageSrc}" alt="${testimonial.name}" class="testimonial-image">
        <h4>${testimonial.name}</h4>
        <div class="testimonial-rating">${getStars(testimonial.rating)}</div>
        <p>"${testimonial.text}"</p>
      `;

      container.appendChild(card);
    });
  }

  leftBtn.addEventListener('click', () => {
    if (testimonialIndex > 0) {
      testimonialIndex -= 1;
      updateView();
    }
  });

  rightBtn.addEventListener('click', () => {
    if (testimonialIndex + 3 < testimonials.length) {
      testimonialIndex += 1;
      updateView();
    }
  });

  updateView();
}

// Palīgfunkcija zvaigžņu attēlošanai
function getStars(rating) {
  const fullStar = '⭐';
  const halfStar = '⭐️'.slice(0, 1);
  const emptyStar = '☆';

  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;

  return fullStar.repeat(full) + (half ? halfStar : '') + emptyStar.repeat(empty);
}
