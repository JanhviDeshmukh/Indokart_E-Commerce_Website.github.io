let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Navy Blue Dress',
        tag: 'dress',
        price: 1999,
        inCart: 0
    },
    {
        name: 'Red Bodycon Dress',
        tag: 'Bodycondress',
        price: 999,
        inCart: 0
    },
    {
        name: 'Pink floral Dress',
        tag: 'floraldress',
        price: 1599,
        inCart: 0
    },
    {
        name: 'A-line floral Dress',
        tag: 'imgc3',
        price: 700,
        inCart: 0
    },
    {
        name: 'Red Dress',
        tag: 'imgc6',
        price: 1999,
        inCart: 0
    },
    {
        name: 'Pink knot Dress',
        tag: 'imgc4',
        price: 990,
        inCart: 0
    },
    {
        name: 'Black printed Dress',
        tag: 'imgc1',
        price: 1200,
        inCart: 0
    },
    {
        name: 'Long One piece Dress',
        tag: 'imgc8',
        price: 1890,
        inCart: 0
    },
    {
        name: 'Red Dress',
        tag: 'imgc9',
        price: 699,
        inCart: 0
    },
    {
        name: 'Green Dress',
        tag: 'imgc10',
        price: 699,
        inCart: 0
    },
    {
        name: 'Sky Blue Top',
        tag: 'imgc21',
        price: 599,
        inCart: 0
    },
    {
        name: 'Green Dress',
        tag: 'imgc22',
        price: 1099,
        inCart: 0
    },
    {
        name: 'Red Top',
        tag: 'imgc23',
        price: 530,
        inCart: 0
    },
    {
        name: 'Creame Top',
        tag: 'imgc24',
        price: 430,
        inCart: 0
    },
    {
        name: 'Pink Top',
        tag: 'imgc25',
        price: 600,
        inCart: 0
    },
    {
        name: 'Plazo set witth duppata',
        tag: 'imgc16',
        price: 2599,
        inCart: 0
    },
    {
        name: 'sky Blue plazo set',
        tag: 'imgc18',
        price: 1999,
        inCart: 0
    },
    {
        name: 'Red Dress',
        tag: 'imgc20',
        price: 2999,
        inCart: 0
    },
    {
        name: 'Black Plazo Dress',
        tag: 'imgc19',
        price: 899,
        inCart: 0
    },
    {
        name: 'Kurti set',
        tag: 'imgc17',
        price: 1199,
        inCart: 0
    },
    {
        name: 'Pink saree',
        tag: 'imgc11',
        price: 1999,
        inCart: 0
    },
    {
        name: 'Green Saree',
        tag: 'imgc12',
        price: 2299,
        inCart: 0
    },
    {
        name: 'Black plane daree',
        tag: 'imgc15',
        price: 1000,
        inCart: 0
    },
    {
        name: 'White printed saree',
        tag: 'imgc14',
        price: 1299,
        inCart: 0
    },
    {
        name: 'Green Saree',
        tag: 'imgc13',
        price: 1000,
        inCart: 0
    }
]

for(let i=0; i < carts.length; i++){
  carts[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  })
  }


function onLoadCartNumbers(){
    let productNumbers= localStorage.getItem('cartNumbers');

    if (productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else{
        product.inCart = 1;
        cartItems = {
        [product.tag]: product
    }
    }
    
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product){
    // 
    let cartCost = localStorage.getItem('totalCost');
    
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);

    if (cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }else{
        localStorage.setItem("totalCost", product.price);
    }    
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    (".products");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
            <ion-icon name="close-circle-outline"></ion-icon>
            <img src="./Images/${item.tag}.jpg">
            <span>${item.name}</span>
            </div>
            <div class="price">${item.price}</div>
            <div class="quantity">
            <ion-icon name="caret-back-circle-outline"></ion-icon>
            <span>${item.inCart}</span>
            <ion-icon name="caret-forward-circle-outline"></ion-icon>
            </div>
            <div class="total">
            ${item.inCart * item.price} /Rs
            </div>
            `
        });
        productContainer.innerHTML += `
        <div class="basketTotalContainer">
        <h4 class="basketTotalTitle">
        Total Price
        </h4>
        <h4 class="basketTotal">
        ${cartCost} /Rs
        </h4>
        </div>
        `
    }
    }

onLoadCartNumbers();
displayCart();