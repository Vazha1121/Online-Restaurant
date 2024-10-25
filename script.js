let scrolled = document.getElementById("scroll");
let body = document.querySelector("body");


/* scroll effect */
function scrollFunction() {
  if (
    document.documentElement.scrollTop >= 100 &&
    document.documentElement.scrollTop <= 14000
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





/* Categories */

let categoriesNav = document.getElementById("category");
let ul = document.getElementById("catUl");
fetch("https://restaurant.stepprojects.ge/api/Categories/GetAll")
  .then((categ) => categ.json())
  .then((catData) =>
    catData.forEach((item) => (ul.innerHTML += categoryFunc(item)))
  );

function categoryFunc(item) {
  return `<li onclick="getCategory(${item.id})">${item.name}</li>`;
}

/*cards */
let sect3 = document.getElementById("sec3");
let cardDiv = document.getElementById("cards");

fetch("https://restaurant.stepprojects.ge/api/Products/GetAll")
  .then((prod) => prod.json())
  .then((prodData) => {
    console.log(prodData);
    prodData.forEach((item) => (cardDiv.innerHTML += showCards(item)));
    
  });
  function showCards(item) {

  return `<div class="everyCard">
            <div class="imgDiv"><img src="${item.image}" alt="" /></div>
            <div class="title"><h1>${item.name}</h1></div>
            <div class="spicin"><p>Spiciness: ${item.spiciness}</p></div>
            <div class="checks">
              <div id="nutsDiv">
                ${item.nuts === true ? '<p>Nuts <i class="fa-solid fa-check" style="color: #ff0000;"></i></p>' : '<p>Nuts <i class="fa-solid fa-x" style="color: #ff0000;"></i></p>'}
              </div>
              <div>
              ${item.vegeterian === true ? '<p>Vegeterian <i class="fa-solid fa-check" style="color: #ff0000;"></i></p>' : '<p>Vegeterian <i class="fa-solid fa-x" style="color: #ff0000;"></i></p>'}
              </div>
            </div>
            <div class="priceAdd">
              <div><h1>${item.price}$</h1></div>
              <div onclick="addBasket(${item.id}, ${item.price} , '${item.name}')"><button>Add to cart</button></div>
            </div>
          </div>`;
        }


//get category func

function getCategory(id) {
  cardDiv.innerHTML = " ";
  fetch(`https://restaurant.stepprojects.ge/api/Categories/GetCategory/${id}`)
    .then((categ) => categ.json())
    .then((categoryData) => {
      categoryData.products.forEach(
        (item) => (cardDiv.innerHTML += showCards(item))
      );
    });
}

/* filter */
let rangeValue = document.getElementById("rangeValue");
let nuts = document.getElementById("nutsCheck");
let vegs = document.getElementById("vegCheck");
let filterBtn = document.getElementById("filterBtn");
let range = document.getElementById("inputRange");
let spiciness = "";
/* rangeValue.innerHTML = range.value; */

filterBtn.addEventListener("click", function () {
  nuts.checked ? (nuts.value = false) : (nuts.value = true);
  vegs.checked ? (vegs.value = true, nuts.value = false) : (vegs.value = false, nuts.value = " ");
  range.value !== -1 ? (spiciness = range.value) : (spiciness = "");
  cardDiv.innerHTML = " ";
  fetch(
    `https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=${vegs.value}&nuts=${nuts.value}&spiciness=${spiciness}`
  )
    .then((filt) => filt.json())
    .then((filtData) =>
      filtData.forEach((item) => {
        cardDiv.innerHTML += showCards(item);
      })
    );
});

range.oninput = function() {
  rangeValue.innerHTML = this.value;
}

///add to basket

function addBasket(prodId, prodPrice, prodName) {
let basketVar = {
  quantity: 1,
  price: prodPrice,
  productId: prodId,
}
  fetch("https://restaurant.stepprojects.ge/api/Baskets/AddToBasket", {
    method: "POST",
    headers: {
      accept: 'text/plain',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(basketVar)
  })
  .then(bask => bask.text())
  .then(basketData => {
    localStorage.setItem("baskedProd" , prodName)
  })
}

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