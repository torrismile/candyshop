

let carts = document.querySelectorAll('.add');

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
        showProductsInCart();
    })
}

function showProductsInCart() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers) {
        document.querySelector('.cart-nav span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart-nav span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart-nav span').textContent = 1;
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
                    <img src = "resourses/images/mini-img/${item.tag}.jpeg">
                    <h5>${item.name}</h5>
                </div>
                <div class="price">
                    <h6>$${item.price},00</h6>
                </div>
                <div class="quantity">
                    <i class="fa fa-minus"></i>
                    <h6>${item.inCart}</h6>
                    <i class="fa fa-plus"></i>
                </div>
                <div class="total">
                    <h6>$${item.inCart * item.price },00</h6>
                    <i class="fa fa-times-circle"></i>
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


