document.addEventListener('DOMContentLoaded', function () {
    // Ielādē produktus no JSON
    fetch('data/products.json')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
            data.forEach(product => {
                const productCard = `
                <div class="product-card tab-content active" data-category="${product.category}">
                    <div class="product-image-wrapper">
                        <img src="${product.image}" alt="${product.name}" class="product-image">
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <div class="product-price">${product.price}</div>
                    </div>
                </div>`;
                productList.insertAdjacentHTML('beforeend', productCard);
            });
        });

    // Filtru funkcionalitāte
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.tab-btn.active').classList.remove('active');
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
