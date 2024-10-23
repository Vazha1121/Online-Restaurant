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
  return `<tr>
            <td><button onclick="deleteItem(${item.product.id})" class="deleteBtn"><i class="fa-solid fa-x"></i></button></td>
            <td><img src="${item.product.image}" alt=""></td>
            <td class="nameTd">${item.product.name}</td>
            <td class="plusBtnClass"><button class="plusBtn" onclick="plus(${item.quantity}, ${item.price}, ${
    item.product.id
  })">+</button> ${item.quantity}<button class="plusBtn" onclick="minus(${item.quantity}, ${
    item.price
  },${item.product.id})">-</button></td>
            <td>${item.price}$</td>
            <td>${item.price * item.quantity}$</td>
         </tr>
        `;
      }
      let totalDiv = document.getElementById("totalDiv");

      fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
  .then((bask) => bask.json())
  .then(baskData => baskData.forEach((item) => totalDiv.innerHTML += total(item))
  )
function total(item) {
  return  `<p>${item.product.price * item.quantity}  </>`
}


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
