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
const openCartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.getElementById("closeCart");
const cart = document.querySelector(".cart");
const pageBackdrop = document.querySelector(".page-backdrop");
const empty_cart_text = document.querySelector(".empty-cart-text");
const cart_item = document.querySelector(".cart-item");
const addToCartBtn = document.querySelectorAll("#order-btn");
const cartBody = document.querySelector(".cart-body");
const proceedBtn = document.getElementById("proceedBtn");
const section1 = document.querySelector(".section--1");
const nav = document.querySelector(".nav-section");
const heroSection = document.querySelector(".hero-section");
const navHieght = nav.getBoundingClientRect().height;
const slides = document.querySelectorAll(".banner");
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider--left");
const btnRight = document.querySelector(".slider--right");
const dotContainer = document.querySelector(".dots");
const customAlert = document.querySelector(".custom-alert");
const successIcon = document.querySelector(".success-icon");
const failureIcon = document.querySelector(".failure-icon");
const alertText = document.querySelector(".alert-text");
//

const successAlert = function (num, [...text]) {
  customAlert.style.color = "green";
  successIcon.style.display = "inline";
  failureIcon.style.display = "none";
  alertText.textContent = `${text}`;
  customAlert.style.display = "flex";

  setTimeout(() => {
    customAlert.style.display = "none";
  }, `${num}`);
};

const failureAlert = function (num, [...text]) {
  customAlert.style.color = "red";
  successIcon.style.display = "none";
  failureIcon.style.display = "inline";
  alertText.textContent = `${text}`;
  customAlert.style.display = "flex";

  setTimeout(() => {
    customAlert.style.display = "none";
  }, `${num}`);
};

const addBackground = function (entries) {
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
//
let curSlide = 0;
const maxSlide = slides.length;

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
// // //
openCartBtn.addEventListener("click", () => {
  cart.style.transform = " translateX(0)";
  pageBackdrop.style.display = "block";
});
closeCartBtn.addEventListener("click", () => {
  cart.style.transform = "translateX(120%)";
  pageBackdrop.style.display = "none";
});

addToCartBtn.forEach((button) => {
  button.addEventListener("click", (event) => {
    const productBox = event.target.closest(".product-box");
    // console.log(productBox);
    addToCart(productBox);
    // redirectToWhatsapp(productBox);
  });
});

const addToCart = function (productbox) {
  if (!productbox) return;

  proceedBtn.style.background = "#f5701f";
  const productImgSrc = productbox.querySelector("img").src;
  const productItemName = productbox.querySelector(".product-desc").textContent;
  const productItemPrice =
    productbox.querySelector(".product-amount").textContent;

  const cartItem = cartBody.querySelectorAll(".cart-item-name");

  for (let item of cartItem) {
    if (item.textContent === productItemName) {
      failureAlert(500, ["Product already in cart"]);
      return;
    }
  }
  // if ([...cartBody.querySelectorAll(".cart-item-name")].some(item => item.textContent === productItemName)) {
  //   alert("product already in cart");
  //   return;
  // }
  const cartBox = document.createElement("div");
  cartBox.classList.add("cart-item");
  cartBox.innerHTML = `<div class="cart-item-image">
            <img
              src="${productImgSrc}"
              alt="gadgets"
            />
          </div>

          <div class="cart-item-info">
            <p class="cart-item-name">${productItemName}</p>
            <p class="cart-item-price">${productItemPrice}</p>

            <div class="quantity-control">
              <button class="qty-btn qty-btn-minus qty-minus">
                <i class="fa-solid fa-minus"></i>
              </button>
              <span class="qty-value">1</span>
              <button class="qty-btn qty-btn-plus qty-plus">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>

          <button
            class="icon-btn delete-btn"
            aria-label="Remove item"
          >
            <i class="fa-solid fa-trash-can"></i>
          </button>`;
  empty_cart_text.style.display = "none";
  cartBody.appendChild(cartBox);

  successAlert(500, ["Item added to cart"]);
  // // // // // // // // //
  saveCartToLocalStorage();
  // const setLocalStorage = function () {
  //   localStorage.setItem("items", JSON.cartBox);
  // };
  // setLocalStorage();
  // _getLocalStorage() {
  //   const data = JSON.parse(localStorage.getItem('workouts'));

  //   if (!data) return;

  //   this.#workouts = data;

  //   this.#workouts.forEach(work => this._renderWorkout(work));
  // }

  // reset() {
  //   localStorage.removeItem('workouts');
  //   location.reload();
  // }

  // // // //
  const showEmptyText = function () {
    if (cartBody.children.length - 1 === 0) {
      empty_cart_text.style.display = "flex";
    }
  };
  // delete button scoped to this cart item
  const deleteBtn = cartBox.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    cartBox.remove();
    updateCartCount(-1);

    updateTotalPrice();
    saveCartToLocalStorage();
    showEmptyText();
    proceedBtn.style.background = "#f4a97f";
  });

  // quantity controls scoped to this cart item
  let qty = 1;
  const qtyValueEl = cartBox.querySelector(".qty-value");
  const plusBtn = cartBox.querySelector(".qty-plus");
  const minusBtn = cartBox.querySelector(".qty-minus");

  plusBtn.addEventListener("click", () => {
    qty++;
    qtyValueEl.textContent = qty;
    updateTotalPrice();
  });

  minusBtn.addEventListener("click", () => {
    if (qty > 1) qty--;
    qtyValueEl.textContent = qty;
    updateTotalPrice();
  });

  updateCartCount(1);
  updateTotalPrice();
};

const updateTotalPrice = function () {
  const totalValueEl = document.querySelector(".total-value");
  const cartBoxes = document.querySelectorAll(".cart-item");
  let total = 0;

  cartBoxes.forEach((cartbox) => {
    const cartPriceEl = cartbox.querySelector(".cart-item-price");
    const quantityEl = cartbox.querySelector(".qty-value");
    if (!cartPriceEl || !quantityEl) return;

    const price =
      Number(cartPriceEl.textContent.replace(/[^0-9.-]+/g, "")) || 0;
    const quantity = Number(quantityEl.textContent) || 0;

    total += price * quantity;
  });

  totalValueEl.textContent = `₦${total.toLocaleString()}`;
};

let cartItemCount = 0;

const updateCartCount = (change) => {
  const cartItemCountBadge = document.querySelector(".cart-item-count");
  cartItemCount += change;
  if (cartItemCount > 0) {
    cartItemCountBadge.style.visibility = "visible";
    cartItemCountBadge.textContent = cartItemCount;
  } else {
    cartItemCountBadge.style.visibility = "hidden";
    cartItemCountBadge.textContent = "";
  }
};
const saveCartToLocalStorage = function () {
  const cartItems = [];
  document.querySelectorAll(".cart-item").forEach((item) => {
    cartItems.push({
      name: item.querySelector(".cart-item-name").textContent,
      price: item.querySelector(".cart-item-price").textContent,
      image: item.querySelector("img").src,
      quantity: item.querySelector(".qty-value").textContent,
    });
  });
  localStorage.setItem("cart", JSON.stringify(cartItems));
};
// // //
const loadCartFromLocalStorage = function () {
  const saved = localStorage.getItem("cart");

  if (!saved) return;

  const cartItems = JSON.parse(saved);
  cartItems.forEach((item) => {
    const productBox = document.createElement("div");
    productBox.className = "product-box";
    productBox.innerHTML = `
      <img src="${item.image}" alt="product"/>
      <span class="product-desc">${item.name}</span>
      <span class="product-amount">${item.price}</span>
    `;

    addToCart(productBox);
    const lastCartItem = document.querySelector(".cart-item:last-child");
    const qtyEl = lastCartItem.querySelector(".qty-value");
    qtyEl.textContent = item.quantity;
  });
};
loadCartFromLocalStorage();
// // //
proceedBtn.addEventListener("click", () => {
  // const cartBoxes = cart
  const cartBoxes = document.querySelectorAll(".cart-item");
  if (cartBoxes.length === 0) return;

  cartBoxes.forEach((cartbox) => cartbox.remove());

  cartItemCount = 0;

  updateCartCount(0);

  updateTotalPrice();

  cart.style.transform = "translateX(120%)";
  pageBackdrop.style.display = "none";

  successAlert(1000, [
    "Your order is being processed. Thank you for your patronage",
  ]);

  proceedBtn.style.background = "#f4a97f";
  localStorage.removeItem("cart");
  // successAlert(1000, [
  //   "Thank you for your patronage, you will be redirected in a second....",
  // ]);
  // //
  const redirectToWhatsapp = function () {
    const cartItems = [];
    document.querySelectorAll(".cart-item").forEach((item) => {
      cartItems.push({
        name: item.querySelector(".cart-item-name").textContent,
        price: item.querySelector(".cart-item-price").textContent,
        image: item.querySelector("img").src,
        quantity: item.querySelector(".qty-value").textContent,
      });
    });

    let message = `Hi, i want to pay for ${productItemName}i need the account number`;

    let phoneNumber = "2347045170938"; // 👉 change to client number

    let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };
  // redirectToWhatsapp(cartBox);

  //
  if (cartBody.children.length - 1 === 0) {
    empty_cart_text.style.display = "flex";
  }
});
