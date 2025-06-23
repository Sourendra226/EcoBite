"use strict";

// Load cart from localStorage or initialize
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.querySelectorAll('.add_cart_btn').forEach(button => {
	button.addEventListener('click', () => {
		const product = {
			id: button.getAttribute('data-id'),
			name: button.getAttribute('data-name'),
			price: parseFloat(button.getAttribute('data-price')) || 0,
			image: button.getAttribute('data-image'),
			quantity: 1
		};

		const existingProduct = cart.find(item => item.id === product.id);
		if (existingProduct) {
			existingProduct.quantity++;
		} else {
			cart.push(product);
		}

		alert(`${product.name} added to cart!`);
	    saveCart();
    	displayCart();
	});
});

function displayCart() {
	const hasCart = document.querySelector('.hasCartContent');
	const noCart = document.querySelector('.noCartContent');
	const cartTable = document.querySelector('.cartTable');

	if (!hasCart || !noCart || !cartTable) return;

	if (cart.length === 0) {
		noCart.style.display = 'block';
		hasCart.style.display = 'none';
		return;
	} else {
		noCart.style.display = 'none';
		hasCart.style.display = 'block';
	}

	let cartData = cart.map((item, index) =>
		`<tr>
	        <td>
	            <div class="d-flex align-items-center flex-column flex-md-row cartProd">
	                <div class="imgBox">
	                    <img src="${item.image}" alt="${item.name}" class="img-fluid w-100">
	                </div>
	                <div class="aboutProd text-center text-md-start">
	                    <p class="prodName">${item.name}</p>
	                    <p class="prodQty mb-0">Qty: ${item.quantity}</p>
	                </div>
	            </div>
	        </td>
	        <td class="text-center prodPrice">$${item.price}</td>
	        <td class="text-center">
	            <div class="d-flex align-items-center justify-content-center flex-column flex-md-row qty_box">
	                <button type="button" class="minus_btn" onclick="decreaseQuantity(${index})">
	                    <i class="fa-solid fa-minus"></i>
	                </button>
	                <input type="text" value="${item.quantity}" placeholder="" autocomplete="off" class="form-control rounded-0 text-center qty_fld" name="Quantity" id="">
	                <button type="button" class="plus_btn" onclick="increaseQuantity(${index})">
	                    <i class="fa-solid fa-plus"></i>
	                </button>
	            </div>
	        </td>
	        <td class="text-center totalPrice">$${(item.price * item.quantity)}</td>
	        <td class="text-center">
	            <button type="button" class="deleteProd_btn" onclick="removeItem(${index})">
	                <i class="fa-solid fa-xmark"></i>
	            </button>
	        </td>
	    </tr>`
	).join('');

	cartTable.innerHTML = cartData;
}

function increaseQuantity(index) {
	cart[index].quantity++;
	saveCart();
	displayCart();
}

function decreaseQuantity(index) {
	if (cart[index].quantity > 1) {
		cart[index].quantity--;
	} else {
		cart.splice(index, 1);
	}
	saveCart();
	displayCart();
}

function removeItem(index) {
	cart.splice(index, 1);
	saveCart();
	displayCart();
}

function updateCartCount() {
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

window.addEventListener('storage', function(event) {
	if (event.key === 'cart') {
		cart = JSON.parse(localStorage.getItem('cart')) || [];
		updateCartCount();
		if (typeof displayCart === 'function') {
	    	displayCart();
	    }
	}
});

function saveCart() {
	localStorage.setItem('cart', JSON.stringify(cart));
	updateCartCount();
}

// Show cart on page load
displayCart();
updateCartCount();


function proceedToCheckout() {
	saveCart(); // ensure cart is saved before navigating
	window.location.href = 'checkout.html';
}


