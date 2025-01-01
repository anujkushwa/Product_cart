const products = document.querySelectorAll('.product');
const cartItems = [];

products.forEach(product => {
    const button = product.querySelector('button');
    button.addEventListener('click', () => {
        const name = product.querySelector('h2').textContent;
        const price = product.querySelector('p').textContent;
        cartItems.push({ name, price });
        console.log(cartItems);
    });
});


const mainElement = document.querySelector('main');
const searchInput = document.querySelector('.search-bar input');

function createProductCard(product) {
    const productSection = document.createElement('section');
    productSection.classList.add('product');

    productSection.innerHTML = `
        <img src="${product.image}" alt="${product.title}" style="height: 150px;">
        <h2>${product.title}</h2>
        <p>$${product.price.toFixed(2)} USD</p>
        <button>Add to Cart</button>
    `;

    const button = productSection.querySelector('button');
    button.addEventListener('click', () => {
        console.log({
            name: product.title,
            price: `$${product.price.toFixed(2)} USD`,
        });
    });

    return productSection;
}

let allProducts = [];

fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
        allProducts = products; 
        displayProducts(products); 
    })
    .catch(error => console.error('Error fetching products:', error));

function displayProducts(products) {
    mainElement.innerHTML = ''; 
    products.forEach(product => {
        const productCard = createProductCard(product);
        mainElement.appendChild(productCard);
    });
}

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase(); 
    const filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm) 
    );
    displayProducts(filteredProducts); 
});



// Navbar



const menuIcon = document.querySelector('.menu'); 
const pageSection = document.querySelector('.link-1'); 

menuIcon.addEventListener('click', () => {
    pageSection.classList.toggle('hidden'); 
});