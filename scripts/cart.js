const $cartList = document.querySelector("#items-list");
const $itemsValueSum = document.querySelector("#products-value");
const $shippingValue = document.querySelector("#shipping-value span");
const $moreBtn = document.querySelector("#qtd-more");
const $minusBtn = document.querySelector("#qtd-minus");
const $qtdInput = document.querySelector("#qtd-input");

var cart = [];

function loadCartItems() {
  cart = getStorageData();

  cart.map(function (e) {
    $cartList.innerHTML += `
    <div id="item">
      <img id="item-img" src="${e.img}" alt="item image">
      <h3 id="item-name">${e.name}</h3>
      <div id="item-qtd">
        <button id="qtd-minus">-</button>
        <input id="qtd-input" type="text" value="${e.qtd}">
        <button id="qtd-more" onclick(value++)>+</button>
      </div>
      <p id="item-price">R$ ${e.price}</p>
    </div>
    `
  });
}

function saveOnLocalStorage(img, name, price, qtd) {

  cart = getStorageData();

  let item = {
    img: img,
    name: name,
    price: price,
    qtd: qtd,
  };

  cart.push(item);

  localStorage.cartItems = JSON.stringify(cart);
}

function getStorageData() {
  if (localStorage.cartItems) {
    cart = JSON.parse(localStorage.getItem("cartItems"));
  }
  return cart;
}

function totalValueSum(){
  cart = getStorageData();
  let aux = 0
  $shippingValue.textContent = "12.60"

  cart.map(function (e) {
    aux += parseFloat(e.price.replace(",","."))
  });

  $itemsValueSum.textContent = 'R$ ' + aux.toFixed(2)

  document.querySelector("#summary-value").textContent = 'R$ '+ (parseFloat($shippingValue.textContent) + aux).toFixed(2)
}

window.addEventListener("load", () =>{
  loadCartItems();
  totalValueSum();
})