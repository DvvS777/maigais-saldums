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
  const buttons = document.querySelectorAll('.filter-btn');

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

// Ielādē atsauksmes no JSON un attēlo
fetch('data/testimonials.json')
  .then(response => response.json())
  .then(data => {
    renderTestimonialSlider(data);
  })
  .catch(error => {
    console.error('Kļūda ielādējot atsauksmes:', error);
  });

// Funkcija atsauksmju slidera renderēšanai
function renderTestimonialSlider(testimonials) {
  const container = document.getElementById('testimonial-slider');
  container.innerHTML = '';

  testimonials.forEach(testimonial => {
    const card = document.createElement('div');
    card.classList.add('testimonial');

    const imagePath = testimonial.image && testimonial.image.trim() !== ''
      ? testimonial.image
      : 'images/testimonials/default.jpg';

    card.innerHTML = `
      <img src="${imagePath}" alt="${testimonial.name}" class="testimonial-image">
      <h4>${testimonial.name}</h4>
      <div class="testimonial-rating">${getStars(testimonial.rating)}</div>
      <p>"${testimonial.text}"</p>
    `;

    container.appendChild(card);
  });

  initSlider();
}

// Funkcija zvaigžņu attēlošanai
function getStars(rating) {
  const fullStar = '⭐';
  const halfStar = '⭐️'.slice(0, 1);
  const emptyStar = '☆';

  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;

  return fullStar.repeat(full) + (half ? halfStar : '') + emptyStar.repeat(empty);
}

// Slider funkcionalitāte
function initSlider() {
  const slider = document.getElementById('testimonial-slider');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  let scrollAmount = 0;
  const scrollStep = 330; // katra kartīte ar margin

  prevBtn.addEventListener('click', () => {
    slider.scrollBy({ left: -scrollStep, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    slider.scrollBy({ left: scrollStep, behavior: 'smooth' });
  });
}
