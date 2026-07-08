// // Simple interactivity to mirror the two-step flow shown in the design
// // const cartModal = document.getElementById("cartModal");
// const checkoutModal = document.getElementById("checkoutCart");
// const cartModal = document.getElementById("cartModal");

// const cart = document.querySelector(".cart");
// const cartBtn = document.querySelector(".cart-btn");
// const cartHeader = document.querySelector(".cart-header");
// const checkoutBody = document.querySelector(".checkout-body");
// const cartBody = document.querySelector(".cart-body");
// const checkoutForm = document.getElementById("checkoutForm");
// // const = document.getElementById()
// const proceedBtn = document.getElementById("proceedBtn");
// const backToCart = document.getElementById("backToCart");
// const closeCart = document.getElementById("closeCart");
// const closeCheckout = document.getElementById("closeCheckout");

// cartBtn.addEventListener("click", () => {
//   cart.style.transform = " translateX(0)";
//   //   document.body.classList.toggle("no-scroll");
// });

// proceedBtn.addEventListener("click", () => {
//   cartModal.style.display = "none";
//   checkoutModal.style.display = "flex";
// });

// backToCart.addEventListener("click", () => {
//   checkoutModal.style.display = "none";
//   cartModal.style.display = "flex";
// });

// closeCart.addEventListener("click", () => {
//   cartModal.style.display = 'none';
// });

// closeCheckout.addEventListener("click", () => {
//   checkoutModal.style.display = 'none';
// });

// Simple interactivity to mirror the two-step flow shown in the design
const cartModal = document.getElementById("cartModal");
const checkoutModal = document.getElementById("checkoutModal");
const cart = document.querySelector(".cart");
const cartBtn = document.querySelector(".cart-btn");
const cartTitle = document.querySelector(".cart-title");
const proceedBtn = document.getElementById("proceedBtn");
const backToCartBtn = document.getElementById("backToCart");
const closeCartBtn = document.getElementById("closeCart");
const closeCheckoutBtn = document.getElementById("closeCheckout");
const empty_cart_text = document.querySelector(".empty-cart-text");
let cart_item = document.querySelector(".cart-item");
const cart_item_image = document.querySelector(".cart-item-image");
const cart_item_name = document.querySelector(".cart-item-name");
const cart_item_price = document.querySelector(".cart-item-price");
const total_value = document.querySelector(".total-value");
const order_btn = document.getElementById("order-btn");
const deleteBtn = document.getElementById("deleteItem");

cart_item = [];

// cartBtn.addEventListener("click", () => {
//   cart.style.transform = " translateX(0)";
//   document.body.classList.add("no-scroll");
// });

proceedBtn.addEventListener("click", () => {
  cartModal.classList.add("slide-out");
  checkoutModal.classList.remove("slide-out");
});

backToCartBtn.addEventListener("click", () => {
  checkoutModal.classList.add("slide-out");
  cartModal.classList.remove("slide-out");
});
// proceedBtn.addEventListener("click", () => {
//   //     e.preventDefault();
//   cart.style.transform = "none";
//   cartModal.style.display = "none";
//   checkoutModal.style.display = "flex";
//   //   cartTitle.textContent = "Checkout";
//   //   backToCartBtn.style.display = "block";
// });

// backToCartBtn.addEventListener("click", () => {
//   checkoutModal.style.display = "none";
//   cartModal.style.display = "flex";
// });

// closeCartBtn.addEventListener("click", () => {
//   cart.style.transform = "translateX(500px)";
//   document.body.classList.remove("no-scroll");
// });

// closeCheckoutBtn.addEventListener("click", () => {
//   //   checkoutModal.style.display = "none";
//   //   cart.style.transform = "translateX(500px)";
//   cart.style.transform = "translateX(500px)";

//   console.log("cliked");
// });

// Quantity stepper
// const qtyValue = document.getElementById("qtyValue");
// let qty = 1;
// document.getElementById("qtyPlus").addEventListener("click", () => {
//   qty++;
//   qtyValue.textContent = qty;
// });
// document.getElementById("qtyMinus").addEventListener("click", () => {
//   if (qty > 1) qty--;
//   qtyValue.textContent = qty;
// });

// document.getElementById("checkoutForm").addEventListener("submit", (e) => {
//   e.preventDefault();
//   alert("Checkout submitted!");
// });

/* ============================================================
   cart.js
   Handles: adding items to cart on click, rendering cart list,
   quantity +/-, delete, live total, and opening the cart modal.

   HOW TO WIRE UP AN "ADD TO CART" BUTTON:
   Give any button these data attributes, e.g.:

   <button
     class="add-to-cart-btn"
     data-id="speaker-01"
     data-name="Heavy bass speaker"
     data-price="17600"
     data-image="https://placehold.co/100x100/e8e8e8/999?text=Speaker">
     Add to Cart
   </button>

   Then just include this file before </body>:
   <script src="cart.js"></script>
   ============================================================ */

// Cart state: array of { id, name, price, image, qty }
// let cart = [];

/* ---------- Currency formatter (Naira, matches design) ---------- */
// function formatPrice(amount) {
//   return '\u20A6' + amount.toLocaleString('en-NG', { minimumFractionDigits: 2 });
// }

// /* ---------- Add item to cart ---------- */
// function addToCart({ id, name, price, image }) {
//   const existing = cart.find(item => item.id === id);

//   if (existing) {
//     existing.qty += 1;
//   } else {
//     cart.push({ id, name, price: Number(price), image, qty: 1 });
//   }

//   renderCart();
//   openCart();
// }

// /* ---------- Remove item ---------- */
// function removeFromCart(id) {
//   cart = cart.filter(item => item.id !== id);
//   renderCart();
// }

// /* ---------- Change quantity ---------- */
// function changeQty(id, delta) {
//   const item = cart.find(item => item.id === id);
//   if (!item) return;

//   item.qty += delta;
//   if (item.qty < 1) item.qty = 1;

//   renderCart();
// }

// /* ---------- Render cart items + total into the modal ---------- */
// function renderCart() {
//   const body = document.getElementById('cartItemsContainer');
//   const totalEl = document.getElementById('cartTotal');
//   const badge = document.getElementById('cartCount');

//   if (!body) return;

//   body.innerHTML = '';

//   if (cart.length === 0) {
//     body.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
//   }

//   let total = 0;

//   cart.forEach(item => {
//     total += item.price * item.qty;

//     const row = document.createElement('div');
//     row.className = 'cart-item';
//     row.innerHTML = `
//       <div class="cart-item-image">
//         <img src="${item.image}" alt="${item.name}">
//       </div>
//       <div class="cart-item-info">
//         <p class="cart-item-name">${item.name}</p>
//         <p class="cart-item-price"><s>${formatPrice(item.price)}</s></p>
//         <div class="quantity-control">
//           <button class="qty-btn qty-btn-minus" data-action="minus" data-id="${item.id}">-</button>
//           <span class="qty-value">${item.qty}</span>
//           <button class="qty-btn qty-btn-plus" data-action="plus" data-id="${item.id}">+</button>
//         </div>
//       </div>
//       <button class="icon-btn delete-btn" data-action="delete" data-id="${item.id}">&#128465;</button>
//     `;
//     body.appendChild(row);
//   });

//   if (totalEl) totalEl.textContent = formatPrice(total);
//   if (badge) badge.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
// }

// /* ---------- Open / close cart modal ---------- */
// function openCart() {
//   const cartModal = document.getElementById('cartModal');
//   if (cartModal) cartModal.style.display = 'flex';
// }

// function closeCart() {
//   const cartModal = document.getElementById('cartModal');
//   if (cartModal) cartModal.style.display = 'none';
// }

// /* ---------- Event delegation: qty buttons + delete inside cart ---------- */
// document.addEventListener('click', (e) => {
//   const target = e.target.closest('[data-action]');
//   if (!target) return;

//   const id = target.dataset.id;
//   const action = target.dataset.action;

//   if (action === 'plus') changeQty(id, 1);
//   if (action === 'minus') changeQty(id, -1);
//   if (action === 'delete') removeFromCart(id);
// });

// /* ---------- Event delegation: any "Add to Cart" button on the page ---------- */
// document.addEventListener('click', (e) => {
//   const btn = e.target.closest('.add-to-cart-btn');
//   if (!btn) return;

//   addToCart({
//     id: btn.dataset.id,
//     name: btn.dataset.name,
//     price: btn.dataset.price,
//     image: btn.dataset.image
//   });
// });

// /* ---------- Initial render on page load ---------- */
// document.addEventListener('DOMContentLoaded', renderCart);

const slides = document.querySelectorAll(".banner");
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider--left");
const btnRight = document.querySelector(".slider--right");
const dotContainer = document.querySelector(".dots");

let curSlide = 0;
const maxSlide = slides.length;
console.log(maxSlide);

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`,
    );
  });
};

const activateDots = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide='${slide}']`)
    .classList.add("dots__dot--active");
};

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`),
  );
};

const backToDefault = function () {
  goToSlide(0);
  createDots();
  activateDots(0);
};
backToDefault();

const updateSection = function () {
  goToSlide(curSlide);
  activateDots(curSlide);
};

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  updateSection();
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  updateSection();
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") nextSlide();
  // e.key === 'ArrowRight' && nextSlide()
  if (e.key === "ArrowLeft") prevSlide();
  activateDots(curSlide);
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    curSlide = Number(e.target.dataset.slide);
    updateSection();
  }
});

const section1 = document.querySelector(".section--1");
const nav = document.querySelector(".nav-section");
const heroSection = document.querySelector(".hero-section");
const navHieght = nav.getBoundingClientRect().height;
console.log(navHieght);

const addBackground = function (entries, observer) {
  // entries.forEach((entry) => console.log(entry));
  const [entry] = entries;
  if (entry.isIntersecting) {
    nav.style.backgroundColor = "#1d1d1f";
    return;
  }
  // not intersecting — check which edge it exited from
  const exitedFromTop = entry.boundingClientRect.top > entry.rootBounds.top;

  if (exitedFromTop) {
    nav.style.backgroundColor = "transparent";
  }
  // console.log(entry.boundingClientRect);
};

const observer = new IntersectionObserver(addBackground, {
  root: null,
  threshold: 0,
  rootMargin: "-5px",
});

observer.observe(section1);

const menuBar = document.querySelector(".menu");
const resp_menu_bar = document.querySelector(".resp-menu-bar");
