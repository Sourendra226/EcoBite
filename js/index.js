"use strict";

$(document).ready(function (){
	// Product list for New Arrivals
	/* const products = [
		{
			id: 9,
			name: "Watermelon",
			oldPrice: 26.99,
			price: 15.99,
			image: "images/watermelon.jpg",
			images: ["images/watermelon-1.jpg", "images/watermelon-2.jpg", "images/watermelon-3.jpg"]
		},
		{
			id: 10,
			name: "Litchi",
			oldPrice: 30.50,
			price: 26.99,
			image: "images/litchi.jpg",
			images: ["images/litchi-1.jpg", "images/litchi-2.jpg", "images/litchi-3.jpg"]
		},
		{
			id: 11,
			name: "Peach",
			oldPrice: 30.50,
			price: 18.50,
			image: "images/peach.jpg",
			images: ["images/peach-1.jpg", "images/peach-2.jpg", "images/peach-3.jpg"]
		},
		{
			id: 12,
			name: "Kiwi",
			oldPrice: 32.00,
			price: 22.00,
			image: "images/kiwi.jpg",
			images: ["images/kiwi-1.jpg", "images/kiwi-2.jpg", "images/kiwi-3.jpg"]
		},
		{
			id: 1,
			name: "Alphonso Mango",
			oldPrice: 30.00,
			price: 20.00,
			image: "images/mango.jpg",
			images: ["images/mango-1.jpg", "images/mango-2.jpg", "images/mango-3.jpg"]
		},
		{
			id: 2,
			name: "Pine Apple",
			oldPrice: 18.50,
			price: 15.00,
			image: "images/pineapple.jpg",
			images: ["images/pineapple-1.jpg", "images/pineapple-2.jpg", "images/pineapple-3.jpg"]
		},
		{
			id: 3,
			name: "Organic Beetroot",
			oldPrice: 22.50,
			price: 12.50,
			image: "images/beetroot.jpg",
			images: ["images/beetroot-1.jpg", "images/beetroot-2.jpg", "images/beetroot-3.jpg"]
		},
		{
			id: 4,
			name: "Sweet Corn",
			oldPrice: 10.99,
			price: 8.50,
			image: "images/sweetcorn.jpg",
			images: ["images/sweetcorn-1.jpg", "images/sweetcorn-2.jpg", "images/sweetcorn-3.jpg"]
		}
	]; */

	// New Arrival Slider
	$('.newArrival_slider').slick({
		dots: false,
		infinite: true,
		speed: 300,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		responsive: [
			{
				breakpoint: 1280,
				settings: {
					dots: true,
					arrows: false
				}
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					dots: true,
					arrows: false
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: false
				}
			}
		]
	});

	// Add Slides Dynamically for New Arrivals
	/* products.forEach(product => {
	    const slide = `
	      	<div class="col-md-3">
	            <div class="prod_card">
	                <div class="prod_img_box">
	                    <img src="${product.image}" alt="${product.name}" class="img-fluid w-100" />
						<div class="prod_hover_box d-none d-md-flex justify-content-center align-items-center">
	                        <a href="javascript:void(0);" class="text-decoration-none d-flex justify-content-center align-items-center add_cart_btn" data-id="${product.id}" data-name="${product.name}" data-old-price="${product.oldPrice}" data-price="${product.price}" data-image="${product.image}">
	                            <i class="fa-solid fa-bag-shopping"></i>
	                        </a>
	                        <a href="javascript:void(0);" class="text-decoration-none d-flex justify-content-center align-items-center prod_btn" data-id="${product.id}" data-name="${product.name}" data-old-price="${product.oldPrice}" data-price="${product.price}" data-images="${product.images.join('|')}">
	                            <i class="fa-solid fa-magnifying-glass"></i>
	                        </a>
	                    </div>
	    			</div>
	                <p class="prod_name">${product.name}</p>
	                <p class="prod_prc mb-md-0">${(product.price).toFixed(2)}</p>
					<a href="javascript:void(0);" class="text-decoration-none text-uppercase d-block d-md-none common_btn add_cart_btn" data-id="${product.id}" data-name="${product.name}" data-old-price="${product.oldPrice}" data-price="${product.price}" data-image="${product.image}">Add To Cart</a>
	            </div>
	        </div>
	    `;

	    $('.newArrival_slider').slick('slickAdd', slide);
	}); */
});


