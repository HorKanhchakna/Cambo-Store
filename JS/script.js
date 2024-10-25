let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let shoppingCart = document.querySelector('.shopping-cart');

document.querySelector('#cart-btn').onclick = () => {
    shoppingCart.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let loginForm = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () => {
    loginForm.classList.toggle('active');
    shoppingCart.classList.remove('active');
    searchForm.classList.remove('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    shoppingCart.classList.remove('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
}

window.onscroll = () => {
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

var swiper = new Swiper(".product-slider", {
    loop: true,
    spaceBetween: 20,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1020: {
            slidesPerView: 3,
        },
    },
});


var swiper = new Swiper(".review-slider", {
    loop: true,
    spaceBetween: 20,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1020: {
            slidesPerView: 3,
        },
    },
});


document.addEventListener("DOMContentLoaded", function() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productsContainer = document.querySelector("#products .swiper-wrapper");

    // Rendering product cards with hidden elements (quantity & size)
    products.forEach(product => {
        const productHTML = `
            <div class="swiper-slide box">
                <img src="${product.imageUrl}" alt="${product.name}">
                <h1>${product.name}</h1>
                <div class="price">$${product.price}/-</div>
                <div class="stars">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star-half"></i>
                </div>

                <a href="#" class="btn add-to-cart-btn">Add to Cart</a>

                <!-- Initially hidden Quantity & Size selectors -->
                <div class="hidden-elements" style="display: none;">
                    <div class="quantity-container">
                        <button class="qty-btn minus-btn">-</button>
                        <input type="text" class="quantity-input" value="1" readonly>
                        <button class="qty-btn plus-btn">+</button>
                    </div>

                    <select class="size-selector">
                        <option value="500g">500g</option>
                        <option value="1000g">1000g</option>
                        <option value="1400g" selected>1400g</option>
                    </select>
                </div>
            </div>
        `;
        productsContainer.innerHTML += productHTML;
    });

    // Handle "Add to Cart" click event
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();  // Prevent default action

            // Get the parent product box
            const productBox = button.closest('.box');

            // Show the hidden elements (Quantity & Size)
            const hiddenElements = productBox.querySelector('.hidden-elements');
            if (hiddenElements) {
                hiddenElements.style.display = 'block';  // Make the hidden section visible
            }

            // Hide "Add to Cart" button
            button.style.display = 'none';
        });
    });

    // Handle quantity change with + and - buttons
    productsContainer.addEventListener('click', function (event) {
        const target = event.target;

        if (target.classList.contains('plus-btn')) {
            // Increase quantity
            const quantityInput = target.closest('.quantity-container').querySelector('.quantity-input');
            let currentQuantity = parseInt(quantityInput.value);
            quantityInput.value = currentQuantity + 1;
        }

        if (target.classList.contains('minus-btn')) {
            // Decrease quantity
            const quantityInput = target.closest('.quantity-container').querySelector('.quantity-input');
            let currentQuantity = parseInt(quantityInput.value);

            if (currentQuantity > 1) {
                // Decrease quantity
                quantityInput.value = currentQuantity - 1;
            } else if (currentQuantity === 1) {
                // If quantity is 1 and minus is clicked, revert back to "Add to Cart"
                const hiddenElements = target.closest('.hidden-elements');
                hiddenElements.style.display = 'none'; // Hide quantity and size selectors

                // Show the "Add to Cart" button again
                const addToCartButton = target.closest('.box').querySelector('.add-to-cart-btn');
                addToCartButton.style.display = 'inline-block';

                // Reset the quantity input to 1 for next time
                quantityInput.value = 1;
            }
        }
    });
});
