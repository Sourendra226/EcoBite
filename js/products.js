"use strict";

function allProducts() {
  return [
    {
      id: 1,
      name: "Alphonso Mango",
      oldPrice: 30.0,
      price: 20.0,
      image: "images/mango.jpg",
      images: [
        "images/mango-1.jpg",
        "images/mango-2.jpg",
        "images/mango-3.jpg",
      ],
    },
    {
      id: 2,
      name: "Pine Apple",
      oldPrice: 18.5,
      price: 15.0,
      image: "images/pineapple.jpg",
      images: [
        "images/pineapple-1.jpg",
        "images/pineapple-2.jpg",
        "images/pineapple-3.jpg",
      ],
    },
    {
      id: 3,
      name: "Organic Beetroot",
      oldPrice: 22.5,
      price: 12.5,
      image: "images/beetroot.jpg",
      images: [
        "images/beetroot-1.jpg",
        "images/beetroot-2.jpg",
        "images/beetroot-3.jpg",
      ],
    },
    {
      id: 4,
      name: "Sweet Corn",
      oldPrice: 10.99,
      price: 8.5,
      image: "images/sweetcorn.jpg",
      images: [
        "images/sweetcorn-1.jpg",
        "images/sweetcorn-2.jpg",
        "images/sweetcorn-3.jpg",
      ],
    },
    {
      id: 5,
      name: "Organic Tomato",
      oldPrice: 20.99,
      price: 10.0,
      image: "images/tomatoes.jpg",
      images: [
        "images/tomatoes-1.jpg",
        "images/tomatoes-2.jpg",
        "images/tomatoes-3.jpg",
      ],
    },
    {
      id: 6,
      name: "Mushrooms",
      oldPrice: 23.5,
      price: 14.5,
      image: "images/mushrooms.jpg",
      images: [
        "images/mushrooms-1.jpg",
        "images/mushrooms-2.jpg",
        "images/mushrooms-3.jpg",
      ],
    },
    {
      id: 7,
      name: "Avocado",
      oldPrice: 55.5,
      price: 35.0,
      image: "images/avocado.jpg",
      images: [
        "images/avocado-1.jpg",
        "images/avocado-2.jpg",
        "images/avocado-3.jpg",
      ],
    },
    {
      id: 8,
      name: "Fresh Carrots",
      oldPrice: 20.99,
      price: 16.5,
      image: "images/carrots.jpg",
      images: [
        "images/carrots-1.jpg",
        "images/carrots-2.jpg",
        "images/carrots-3.jpg",
      ],
    },
    {
      id: 9,
      name: "Watermelon",
      oldPrice: 26.99,
      price: 15.99,
      image: "images/watermelon.jpg",
      images: [
        "images/watermelon-1.jpg",
        "images/watermelon-2.jpg",
        "images/watermelon-3.jpg",
      ],
    },
    {
      id: 10,
      name: "Litchi",
      oldPrice: 30.5,
      price: 26.99,
      image: "images/litchi.jpg",
      images: [
        "images/litchi-1.jpg",
        "images/litchi-2.jpg",
        "images/litchi-3.jpg",
      ],
    },
    {
      id: 11,
      name: "Peach",
      oldPrice: 30.5,
      price: 18.5,
      image: "images/peach.jpg",
      images: [
        "images/peach-1.jpg",
        "images/peach-2.jpg",
        "images/peach-3.jpg",
      ],
    },
    {
      id: 12,
      name: "Kiwi",
      oldPrice: 32.0,
      price: 22.0,
      image: "images/kiwi.jpg",
      images: ["images/kiwi-1.jpg", "images/kiwi-2.jpg", "images/kiwi-3.jpg"],
    },
  ];
}

document.addEventListener("DOMContentLoaded", () => {
  const products = allProducts();
  const productsPerPage = 8;
  let currentPage = 1;

  const productList = document.getElementById("productList");
  const paginationNumbers = document.getElementById("paginationNumbers");
  const nextPageBtn = document.getElementById("nextPage");
  const noMoreMessage = document.getElementById("noMoreMessage");

  const totalPages = Math.ceil(products.length / productsPerPage);

  function renderProducts() {
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const pageItems = products.slice(start, end);

    productList.innerHTML = "";
    pageItems.forEach((product) => {
      productList.innerHTML += `
				<div class="col-md-3">
                    <div class="prod_card">
                        <div class="prod_img_box">
                            <img src="${product.image}" alt="${
        product.name
      }" class="img-fluid w-100" />
                            <div class="prod_hover_box d-none d-md-flex justify-content-center align-items-center">
                                <a href="javascript:void(0);" class="text-decoration-none d-flex justify-content-center align-items-center add_cart_btn" data-id="${
                                  product.id
                                }" data-name="${
        product.name
      }" data-old-price="${product.oldPrice}" data-price="${
        product.price
      }" data-image="${product.image}">
                                    <i class="fa-solid fa-bag-shopping"></i>
                                </a>
                                <a href="javascript:void(0);" class="text-decoration-none d-flex justify-content-center align-items-center prod_btn" data-id="${
                                  product.id
                                }" data-name="${
        product.name
      }" data-old-price="${product.oldPrice}" data-price="${
        product.price
      }" data-image="${product.image}" data-images="${product.images.join(
        "|"
      )}">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                </a>
                            </div>
                        </div>
                        <p class="prod_name">${product.name}</p>
                        <p class="prod_prc mb-md-0">$${product.price.toFixed(
                          2
                        )}</p>
                        <a href="javascript:void(0);" class="text-decoration-none text-uppercase d-block d-md-none common_btn add_cart_btn" data-id="${
                          product.id
                        }" data-name="${product.name}" data-old-price="${
        product.oldPrice
      }" data-price="${product.price}" data-image="${
        product.image
      }">Add To Cart</a>
                    </div>
                </div>
			`;
    });

    noMoreMessage.style.display = pageItems.length === 0 ? "block" : "none";
    renderPagination();

    attachProductButtonListeners();
  }

  function renderPagination() {
    paginationNumbers.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("li");
      btn.textContent = i;
      btn.className =
        "list-inline-item d-flex justify-content-center align-items-center " +
        (i === currentPage ? "active" : "");
      btn.addEventListener("click", () => {
        currentPage = i;
        renderProducts();
      });
      paginationNumbers.appendChild(btn);
    }

    // Disable "›" on last page
    nextPageBtn.disabled = currentPage >= totalPages;
  }

  nextPageBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderProducts();
    }
  });

  renderProducts();

  function attachProductButtonListeners() {
    document.querySelectorAll(".add_cart_btn").forEach((button) => {
      button.addEventListener("click", () => {
        const cart = getCart();

        const product = {
          id: button.getAttribute("data-id"),
          name: button.getAttribute("data-name"),
          oldPrice: parseFloat(button.getAttribute("data-old-price")) || 0,
          price: parseFloat(button.getAttribute("data-price")) || 0,
          image: button.getAttribute("data-image"),
          quantity: 1,
        };

        const existingProduct = cart.find((item) => item.id === product.id);
        if (existingProduct) {
          existingProduct.quantity++;
        } else {
          cart.push(product);
        }

        alert(`${product.name} added to cart!`);
        saveCart(cart);
      });
    });

    document.querySelectorAll(".prod_btn").forEach((button) => {
      button.addEventListener("click", () => {
        let images = [];
        try {
          const rawImages = button.getAttribute("data-images");
          images = rawImages ? rawImages.split("|") : [];
        } catch (e) {
          console.error("Image parse error", e);
        }

        const product = {
          id: button.getAttribute("data-id"),
          name: button.getAttribute("data-name"),
          oldPrice: button.getAttribute("data-old-price"),
          price: button.getAttribute("data-price"),
          image: button.getAttribute("data-image"),
          images: images,
        };

        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "product-details.html";
      });
    });
  }

  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }

  function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const badge = document.querySelector(".cartCount");

    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? "inline-block" : "none";
      badge.classList.remove("bump");
      void badge.offsetWidth;
      badge.classList.add("bump");
    }
  }

  updateCartCount();
});

if (window.location.href.includes("product-details.html")) {
  document.addEventListener("DOMContentLoaded", () => {
    const product = JSON.parse(localStorage.getItem("selectedProduct"));
    if (!product) return;

    // Basic product info
    const nameEl = document.getElementById("productName");
    const breadcrumbEl = document.getElementById("prodNameBreadcrumb");
    const oldPriceEl = document.getElementById("oldPrice");
    const priceEl = document.getElementById("productPrice");

    if (nameEl) nameEl.textContent = product.name;
    if (breadcrumbEl) breadcrumbEl.textContent = product.name;
    if (oldPriceEl)
      oldPriceEl.textContent = `$${parseFloat(product.oldPrice).toFixed(2)}`;
    if (priceEl)
      priceEl.textContent = `$${parseFloat(product.price).toFixed(2)}`;

    // Images
    const sliderFor = document.querySelector(".productSlider_slide");
    const sliderNav = document.querySelector(".productSlider_thumb");

    if (sliderFor && sliderNav && Array.isArray(product.images)) {
      sliderFor.innerHTML = "";
      sliderNav.innerHTML = "";

      product.images.forEach((img) => {
        sliderFor.innerHTML += `<div><img src="${img}" alt="${product.name}" class="img-fluid w-100"></div>`;
        sliderNav.innerHTML += `<div><img src="${img}" alt="${product.name}" class="img-fluid w-100"></div>`;
      });

      setTimeout(() => {
        $(".productSlider_slide").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          fade: true,
          asNavFor: ".productSlider_thumb",
        });
        $(".productSlider_thumb").slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          asNavFor: ".productSlider_slide",
          dots: false,
          centerMode: false,
          focusOnSelect: true,
        });
      }, 100); // Let DOM settle before initializing
    }
  });
}
