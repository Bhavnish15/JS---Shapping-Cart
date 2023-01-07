/* app.js */
const productsE1 = document.querySelector(".products");
const cartItemsE1 = document.querySelector(".cart-items");
const subtotalE1 = document.querySelector(".subtotal");
const totalItemInCartE1 = document.querySelector(".total-items-in-cart");


function renderProducts() {
  products.forEach((product) => {
    productsE1.innerHTML += `
        <div class="item">
        <div class="item-container">
            <div class="item-img">
                <img src="${product.imgSrc}" alt="${product.name}">
            </div>
            <div class="desc">
                <h2>${product.name}</h2>
                <h2><small>$</small>${product.price}</h2>
                <p>
                    ${product.description}
                </p>
            </div>
            <div class="add-to-wishlist">
                <img src="./icons/heart.png" alt="add to wish list">
            </div>
            <div class="add-to-cart" onclick="addToCart(${product.id})">
                <img src="./icons/bag-plus.png" alt="add to cart">
            </div>
        </div>
    </div>
        `;
  });
}
renderProducts();

// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

//** / Add cart

function addToCart(id) {
  // check if products exist in cart
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    const item = products.find((product) => product.id === id);
    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }

  updateCart();
}

// Update Cart

function updateCart() {
  renderCartItems();
  renderSubtotal();

  // Saving cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}
// Calculate and render subtotal
function renderSubtotal() {
  let totalPrice = 0;
  let totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });
  subtotalE1.innerHTML = `subtotal (${totalItems}items): $${totalPrice.toFixed(
    2
  )}`;
  totalItemInCartE1.innerHTML = totalItems;
}

function renderCartItems() {
  cartItemsE1.innerHTML = ""; // clear cart items
  cart.forEach((item) => {
    cartItemsE1.innerHTML += `
        <div class="cart-item">
        <div class="item-info" onclick = "removeItemFromCart(${item.id})"}>
            <img src="${item.imgSrc}" alt="${item.name}">
            <h4>${item.name}</h4>
        </div>
        <div class="unit-price">
            <small>$</small>${item.price}
        </div>
        <div class="units">
            <div class="btn minus" onclick= "changeNumberOfUnits('minus', ${item.id})">-</div>
            <div class="number">${item.numberOfUnits}</div>
            <div class="btn plus" onclick = "changeNumberOfUnits('plus', ${item.id})">+</div>           
        </div>
    </div>
        `;
  });
}

// Remove item from cart
function removeItemFromCart(id){
    cart = cart.filter((item)=> item.id !== id);

    updateCart();
}





// Change number of units

function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }
    return {
      ...item,
      numberOfUnits,
    };
  });
  updateCart();
}
