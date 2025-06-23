"use strict";

document.querySelectorAll('.prod_btn').forEach(button => {
	button.addEventListener('click', () => {
		let images = [];
		try {
			const rawImages = button.getAttribute('data-images');
			images = rawImages ? JSON.parse(rawImages.replace(/'/g, '"')) : [];
		} catch (e) {
			console.error("Image parse error", e);
		}

		const product = {
			id: button.getAttribute('data-id'),
			name: button.getAttribute('data-name'),
			oldPrice: button.getAttribute('data-old-price'),
			price: button.getAttribute('data-price'),
			image: button.getAttribute('data-image'),
			images: images
		};

		localStorage.setItem('selectedProduct', JSON.stringify(product));
		window.location.href = 'product-details.html';
	});
});


document.addEventListener('DOMContentLoaded', () => {
	const product = JSON.parse(localStorage.getItem('selectedProduct'));
	if (!product) return;

	// Basic info
	const nameEl = document.getElementById('productName');
	const breadcrumbEl = document.getElementById('prodNameBreadcrumb');
	const oldPriceEl = document.getElementById('oldPrice');
	const priceEl = document.getElementById('productPrice');

	if (nameEl) nameEl.textContent = product.name;
	if (breadcrumbEl) breadcrumbEl.textContent = product.name;
	if (oldPriceEl) oldPriceEl.textContent = `$${parseFloat(product.oldPrice).toFixed(2)}`;
	if (priceEl) priceEl.textContent = `$${parseFloat(product.price).toFixed(2)}`;

	// Images
	if (product.images && Array.isArray(product.images)) {
		const sliderFor = document.querySelector('.productSlider_slide');
		const sliderNav = document.querySelector('.productSlider_thumb');

		if (sliderFor && sliderNav) {
			sliderFor.innerHTML = '';
			sliderNav.innerHTML = '';

			product.images.forEach(img => {
				sliderFor.innerHTML += `<div><img src="${img}" alt="${product.name}" class="img-fluid"></div>`;
				sliderNav.innerHTML += `<div><img src="${img}" alt="${product.name}" class="img-fluid"></div>`;
			});

			setTimeout(() => {
				$('.productSlider_slide').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					fade: true,
					asNavFor: '.productSlider_thumb'
				});
				$('.productSlider_thumb').slick({
					slidesToShow: 3,
					slidesToScroll: 1,
					asNavFor: '.productSlider_slide',
					dots: false,
					centerMode: false,
					focusOnSelect: true
				});
			}, 50);
		}
	}

	const addToCartBtn = document.querySelector('.addCart_btn');
	const buyNowBtn = document.querySelector('.buy_btn');

	function getCart() {
		return JSON.parse(localStorage.getItem('cart')) || [];
	}

	function saveCart(cart) {
		localStorage.setItem('cart', JSON.stringify(cart));
		updateCartCount();
	}

	function addProductToCart(product) {
		const cart = getCart();
		const existing = cart.find(item => item.id === product.id);

		if (existing) {
			existing.quantity += 1;
		} else {
			cart.push({ ...product, quantity: 1 });
		}
		saveCart(cart);
	}

	if (addToCartBtn) {
		addToCartBtn.addEventListener('click', () => {
			addProductToCart(product);
			alert(`${product.name} added to cart!`);
		});
	}

	if (buyNowBtn) {
		buyNowBtn.addEventListener('click', () => {
			addProductToCart(product);
			window.location.href = 'checkout.html';
		});
	}

	function updateCartCount() {
		const cart = getCart();
		const count = cart.reduce((total, item) => total + item.quantity, 0);
		const badge = document.querySelector('.cartCount');

		if (badge) {
			badge.textContent = count;
			badge.style.display = count > 0 ? 'inline-block' : 'none';
			badge.classList.remove('bump');
			void badge.offsetWidth;
			badge.classList.add('bump');
		}
	}

	updateCartCount();
});


