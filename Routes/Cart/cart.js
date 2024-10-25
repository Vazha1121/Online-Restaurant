let scrolled = document.getElementById("scroll");
let basketSec = document.getElementById("basketSec");
let local = localStorage.getItem("baskedProd");
let tBody = document.getElementById("rows");

/* scroll effect */
function scrollFunction() {
  if (
    document.documentElement.scrollTop >= 100 &&
    document.documentElement.scrollTop <= 4000
  ) {
    scrolled.classList.add("scrolled");
  } else {
    scrolled.classList.remove("scrolled");
    scrolled.style.transition = "0.5s";
  }
}
window.onscroll = function () {
  scrollFunction();
};

/* cart items */

fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
  .then((bask) => bask.json())
  .then((baskData) =>
    baskData.forEach((item) => {
      tBody.innerHTML += basketCards(item);
    })
  );

function basketCards(item) {
  return `<tr class="prodTr">
            <td class="imageTd"><button onclick="deleteItem(${item.product.id})" class="deleteBtn"><i class="fa-solid fa-x"></i></button></td>
            <td ><img src="${item.product.image}" alt=""></td>
            <td class="nameTd">${item.product.name}</td>
            <td class="plusBtnClass"><button class="plusBtn" onclick="plus(${item.quantity}, ${item.price}, ${
    item.product.id
  })">+</button> ${item.quantity}<button class="plusBtn" onclick="minus(${item.quantity}, ${
    item.price
  },${item.product.id})">-</button></td>
            <td>${item.price}$</td>
            <td class="priceTr">${item.price * item.quantity}$</td>
         </tr>
        `;
      }
      let totalDiv = document.getElementById("totalDiv");




/* cart item delete */
async function asyncFetch() {
  let listItems = fetch(
    "https://restaurant.stepprojects.ge/api/Baskets/GetAll"
  );
  return (await listItems).json();
}

function deleteItem(id) {
  fetch(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${id}`, {
    method: "DELETE",
    headers: {
      accept: "*/*",
    },
  })
    .then((data) => data.text())
    .then((deleteData) => {
      tBody.innerHTML = " ";
      asyncFetch().then((data) =>
        data.forEach((item) => (tBody.innerHTML += basketCards(item)))
      );
    });
}

/* item update */
/* plus */
function plus(itemQuant, itemPrice, itemId) {
  itemQuant++;
  let update = {
    quantity: itemQuant,
    price: itemPrice,
    productId: itemId,
  };
  fetch("https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket", {
    method: "PUT",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(update),
  })
    .then((data) => data.text())
    .then((updateData) => {
      tBody.innerHTML = "";
      asyncFetch().then((data) =>
        data.forEach((item) => (tBody.innerHTML += basketCards(item)))
      );
    });
}
/* minus */
function minus(itemQuant, itemPrice, itemId) {
  itemQuant--;
  let update = {
    quantity: itemQuant,
    price: itemPrice,
    productId: itemId,
  };
  fetch("https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket", {
    method: "PUT",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(update),
  })
    .then((data) => data.text())
    .then((updateData) => {
      tBody.innerHTML = "";
      asyncFetch().then((data) =>
        data.forEach((item) => (tBody.innerHTML += basketCards(item)))
      );
    });
}


//total price
let  table2 = document.getElementById("table2")
let jami = document.getElementById("jami")
fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
.then(res => res.json())
.then(data => {
  let allPrice = data.map((item) => item.quantity * item.price);
  let sumPrice = allPrice.reduce((prev,current) => {
    return prev + current
  })
  
  jami.innerText +=  sumPrice + "$"
})

//burger
let b1 =document.getElementById("b1")
let b2 =document.getElementById("b2")
let b3 =document.getElementById("b3")
let burgerDiv = document.getElementById("burgerDiv");
let burgerBar = document.getElementById("burgerBar");

burgerBar.addEventListener("click", function() {
  burgerDiv.classList.toggle("burgerDisplay")
  b1.classList.toggle("b1rotate")
  b2.classList.toggle("b2rotate")
  b3.classList.toggle("b3rotate")
})