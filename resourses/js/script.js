

let carts = document.querySelectorAll('.store-icon');

let products = [
    {
        name: 'Mini cupcakes',
        tag: '1',
        price: 8,
        inCart: 0
    },
    {
        name: "Wedding's cupcakes",
        tag: '2',
        price: 9,
        inCart: 0
    },
    {
        name: 'Chokolate cupcakes',
        tag: '3',
        price: 6,
        inCart: 0
    },
    {
        name: 'Vanilla cupcakes',
        tag: '4',
        price: 5,
        inCart: 0
    },
    {
        name: 'Classic cupcakes',
        tag: '5',
        price: 7,
        inCart: 0
    },
    {
        name: 'Double cupcakes',
        tag: '6',
        price: 12,
        inCart: 0
    }
]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers) {
        document.querySelector('.cart-text span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart-text span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart-text span').textContent = 1;
    }
    setItems(product);
}
function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    } else {
        localStorage.setItem('totalCost', product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let productContainer = document.querySelector('.products');
    let cartCost = localStorage.getItem('totalCost');
    
    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product-item">
                <div class="product">
                    <img src = "resourses/images/mini-img/${item.tag}.jpg">
                    <h5>${item.name}</h5>
                </div>
                <div class="price">
                    <h6>$${item.price},00</h6>
                </div>
                <div class="quantity">
                    <ion-icon class="decrease" 
                    name="arrow-dropleft-circle"></ion-icon>
                    <h6>${item.inCart}</h6>
                    <ion-icon class="increase" 
                    name="arrow-dropright-circle"></ion-icon>
                </div>
                <div class="total">
                    <h6>$${item.inCart * item.price },00</h6>
                    <ion-icon name="close-circle"></ion-icon>
                </div>
            </div>
            `;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotal">
                    <h5>Basket Total</h5>
                </h4>
                <h4 class="basketTotal">
                    <h5>$${cartCost},00</h5>
                </h4>
            </div>
        `;
    }
}
onLoadCartNumbers();
displayCart();





// var slideIndex = 0;
// showSlides();

// function showSlides() {
//   var i;
//   var slides = document.getElementsByClassName("mySlides");
//   var dots = document.getElementsByClassName("dot");
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";  
//   }
//   slideIndex++;
//   if (slideIndex > slides.length) {slideIndex = 1}    
//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active-1", "");
//   }
//   slides[slideIndex-1].style.display = "block";  
//   dots[slideIndex-1].className += " active-1";
//   setTimeout(showSlides, 2000); // Change image every 2 seconds
// }