"use strict";

// Order Summary Section
document.addEventListener('DOMContentLoaded', function () {
	const cart = JSON.parse(localStorage.getItem('cart')) || [];
	const prodSummaryBox = document.querySelector('.prodSummaryBox');
	const totalPrice = document.querySelector('.totalPriceAmt');
	const shipPriceAmt = document.querySelector('.shipPriceAmt');
	const grandTotal = document.querySelector('.grandTotalAmt');

	if (cart.length === 0) {
		prodSummaryBox.innerHTML = '<p class="cartEmptyText">Your cart is empty.</p>';
		return;
	}

	let total = 0;
	let summaryHTML = '';

	cart.forEach(item => {
	const itemTotal = item.quantity * item.price;
	total += itemTotal;

	summaryHTML += `
		<div class="d-flex justify-content-between align-items-center orderItems">
            <div class="d-flex align-items-center summaryProd">
                <div class="imgBox">
                    <img src="${item.image}" alt="${item.name}" class="img-fluid w-100">
                </div>
                <div class="aboutProd">
                    <p class="prodName">${item.name}</p>
                    <p class="prodQty mb-0">Qty: ${item.quantity}</p>
                </div>
            </div>
            <p class="prodPrice mb-0">$${itemTotal.toFixed(2)}</p>
        </div>
	`;
	});

	prodSummaryBox.innerHTML = summaryHTML;

	totalPrice.innerHTML = `$${total.toFixed(2)}`;

	let shipPrice = total <= 100 ? 5.00 : 0.00;
	shipPriceAmt.innerHTML = `$${shipPrice.toFixed(2)}`;

	grandTotal.innerHTML = `$${(total + shipPrice).toFixed(2)}`;
});



document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('checkoutForm');
	const cart = JSON.parse(localStorage.getItem('cart')) || [];

	const differentShipping = document.getElementById('differentShipping');
	const shippingFields = document.querySelector('.shipping_details');
	const billingFields = document.querySelector('.billing_details');
	const billingFormHandler = document.getElementById('toggleBillingForm');
	const paymentFields = document.querySelector('.payment_details');

	// Toggle Billing Form
	billingFormHandler.addEventListener('change', () => {
		billingFields.style.display = billingFormHandler.checked ? 'none' : 'block';

		const inputs = billingFields.querySelectorAll('input, select');
		inputs.forEach(input => {
			input.required = billingFormHandler.checked;
		});
	});

	form.addEventListener('submit', function (e) {
		e.preventDefault(); // Stop default form submit

		// Terms and conditions check
		if (!document.getElementById('agreeTerms').checked) {
			alert("You must agree to the terms and conditions to proceed.");
			return;
		}

		// Collect billing data
		const shippingData = {
			firstName: form.shipping_firstName.value,
			lastName: form.shipping_lastName.value,
			country: form.shipping_country.value,
			city: form.shipping_city.value,
			state: form.shipping_state.value,
			zipCode: form.shipping_zipCode.value,
			address: form.shipping_address.value,
			addressTwo: form.shipping_address2.value,
			phone: form.shipping_phone.value,
			email: form.shipping_email.value
		};

		// Collect shipping data if different
		let billingData = { ...shippingData }; // default to billing
		if (billingFormHandler.checked) {
			billingData = {
				firstName: form.billing_firstName.value,
				lastName: form.billing_lastName.value,
				city: form.billing_city.value,
				state: form.billing_state.value,
				zipCode: form.billing_zipCode.value,
				address: form.billing_address.value,
				addressTwo: form.billing_address2.value,
				phone: form.billing_phone.value,
				email: form.billing_email.value
			};
		}

		// Collect payment data
		const paymentData = {
			cardNumber: form.creditCardNumber.value,
			cardExpiry: form.cardExpiry.value,
			cardCvv: form.cardCvv.value
		}

		// Final order data
		const order = {
			shipping: shippingData,
			billing: billingData,
			payment: paymentData,
			cart: cart,
			totalAmount: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
		};

		console.log("Order placed:", order);

		// Show thank-you message or redirect
		alert("Order placed successfully!");
		localStorage.removeItem('cart'); // Clear cart
		window.location.href = 'thank-you.html';
	});
});



