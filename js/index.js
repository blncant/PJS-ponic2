//PRODUCTS
const products = document.querySelector(".discover__grid");
const categories = document.querySelector(".discover__categorias");
const categoriesList = document.querySelectorAll(".category");
const btnLoad = document.querySelector(".btn-load");

//CART
const cartBtn = document.querySelector(".cart-label");
const cartBubble = document.querySelector(".cart-bubble");
const cartMenu = document.querySelector(".cart");
const productsCart = document.querySelector(".cart-container");
const buyBtn = document.querySelector(".btn-buy");
const deleteBtn = document.querySelector(".btn-delete");
const total = document.querySelector(".total");

const barsBtn = document.querySelector(".menu-label");
const barsMenu = document.querySelector(".navbar__list");

const overlay = document.querySelector(".overlay");
//const successModal = document.querySelector(".add-modal");

//ARRAY GUARDADO EN LOCAL STORAGE
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveLocalStorage = (cartList) => {
	localStorage.setItem("cart", JSON.stringify(cartList));
};

const renderProduct = ({ id, name, category, cardImg, cartImg, price }) => {
	return `
        <div class="grid__card">
            <div class="gcard__top">
                <button class="gcard__add" 
                data-id='${id}'
                data-name='${name}'
                data-price='${price}'
                data-img='${cardImg}'
                data-imgCart='${cartImg}'><i class="fas fa-shopping-bag add-icon" title="Comprar"></i>
                </button>
                <img class="gcard__img" src=${cardImg} alt=${name} />
            </div>
           
            <div class="gcard__content">
                <p class="gcard__price">$ ${price}</p>
				<h4 class="gcard__category">${category}</h4>
				<h3 class="gcard__name">${name}</h3>
                <p class="gcard__text">AAAA</p>
			</div>
		</div>
    `;
};

const renderFilteredProducts = (category) => {
	const productsList = productsData.filter((product) => product.category === category);
	products.innerHTML = productsList.map(renderProduct).join("");
};

const renderDividedProducts = (index = 0) => {
	const productsToRender = productsController.dividedProducts[index];
	products.innerHTML += productsToRender.map(renderProduct).join("");
};

const renderProducts = (index = 0, category = null) => {
	if (!category) {
		renderDividedProducts(index);
	} else {
		renderFilteredProducts(category);
	}
};

const isLastIndex = () => productsController.nextProductsIndex === productsController.productsLimit;

const showMoreProducts = () => {
	renderProducts(productsController.nextProductsIndex);
	productsController.nextProductsIndex++;
	if (isLastIndex()) {
		btnLoad.classList.add("hidden");
	}
};

const changeBtnActiveState = (selectedCategory) => {
	const categories = [...categoriesList];
	categories.forEach((categoryBtn) => {
		if (categoryBtn.dataset.category !== selectedCategory) {
			categoryBtn.classList.remove("active");
		} else {
			categoryBtn.classList.add("active");
		}
	});
};

const changeShowMoreBtnState = (selectedCategory) => {
	if (!selectedCategory) {
		btnLoad.classList.remove("hidden");
		return;
	}
	btnLoad.classList.add("hidden");
};

const changeFilterState = (selectedCategory) => {
	changeBtnActiveState(selectedCategory);
	changeShowMoreBtnState(selectedCategory);
};

const applyFilter = (e) => {
	if (!e.target.classList.contains("category")) return;

	const clickedCategory = e.target.dataset.category;
	changeFilterState(clickedCategory);
	if (!clickedCategory) {
		products.innerHTML = "";
		renderProducts();
	} else {
		renderProducts(0, clickedCategory);
		productsController.nextProductsIndex = 1;
	}
};

const toggleMenu = () => {
	barsMenu.classList.toggle("open-menu");
	if (cartMenu.classList.contains("open-cart")) {
		cartMenu.classList.remove("open-cart");
		return;
	}
	overlay.classList.toggle("show-overlay");
};

const toggleCart = () => {
	cartMenu.classList.toggle("open-cart");
	if (barsMenu.classList.contains("open-menu")) {
		barsMenu.classList.remove("open-menu");
		return;
	}
	overlay.classList.toggle("show-overlay");
};

const closeOnClick = (e) => {
	if (!e.target.classList.contains("navbar__link")) return;
	barsMenu.classList.remove("open-menu");
	overlay.classList.remove("show-overlay");
};

const closeOnOverlayClick = () => {
	barsMenu.classList.remove("open-menu");
	cartMenu.classList.remove("open-cart");
	overlay.classList.remove("show-overlay");
};

const closeOnScroll = () => {
	if (!barsMenu.classList.contains("open-menu") && !cartMenu.classList.contains("open-cart")) return;
	barsMenu.classList.remove("open-menu");
	cartMenu.classList.remove("open-cart");
	overlay.classList.remove("show-overlay");
};

//CONTENIDO CARRITO. Cambiar por imagen a tamaño?

const renderCartProduct = ({ id, name, img, price, quantity }) => {
	return `
    <div class="cart__item">
      <img src=${img} alt="Imagen Producto" />
      <div class="item__info">
        <h3 class="item__title">${name}</h3>
        <p class="item__price">$ ${price}</p>
      </div>
      <div class="item__handler">
        <span class="quantity-handler down" data-id=${id}>-</span>
        <span class="item-quantity">${quantity}</span>
        <span class="quantity-handler up" data-id=${id}>+</span>
      </div>
    </div>
    `;
};

//VER SI HAY PRODUCTOS
const renderCart = () => {
	if (!cart.length) {
		productsCart.innerHTML = `<p class='empty-msg'>Tu lista está vacía.</p>`;
		return;
	}
	productsCart.innerHTML = cart.map(renderCartProduct).join("");
};

const isExistingCartProduct = ({ id }) => cart.some((product) => product.id === id);

//LE REASIGNA A CART, TODOS LOS ELEMENTOS ACTUALES Y LE AGREGA LAS PROPIEDADES DEL PRODUCT QUE RECIBI
const newCartProduct = (product) => {
	cart = [...cart, { ...product, quantity: 1 }];
};

//EN VEZ DEL MENSAJE, PROBAR CAMBIAR BOTON AGREGAR Y MOSTRAR CANTIDAD?
/* const showSuccessModal = (msg) => {
	successModal.classList.add("active-modal");
	successModal.textContent = msg;
	setTimeout(() => {
		successModal.classList.remove("active-modal");
	}, 1500);
}; */

const disableBtn = (button) => {
	if (!cart.length) {
		button.classList.add("disabled");
	} else {
		button.classList.remove("disabled");
	}
};

const checkCartState = () => {
	saveLocalStorage(cart);
	renderCart();
	showTotal();
	disableBtn(deleteBtn);
	disableBtn(buyBtn);
	renderCartBubble();
};

//REPASAR OPERADOR TERNARIO! RECORRE EL ARRAY CART Y RETORNA NUEVO ARRAY.

const addUnitToProduct = (product) => {
	cart = cart.map((cartProduct) =>
		cartProduct.id === product.id ? { ...cartProduct, quantity: cartProduct.quantity + 1 } : cartProduct
	);
};

const addProduct = (e) => {
	if (!e.target.classList.contains("gcard__add")) return;

	//EXTRAER DEL DATASET ESTAS VARIABLES
	const { id, name, img, price } = e.target.dataset;
	const product = { id, name, img, price };
	if (isExistingCartProduct(product)) {
		addUnitToProduct(product);
	} else {
		newCartProduct(product);
		//showSuccessModal("Producto guardado.");
	}
	checkCartState();
};

const renderCartBubble = () => {
	cartBubble.textContent = cart.reduce((accum, current) => accum + current.quantity, 0);
};

const getCartTotal = () => {
	return cart.reduce((accum, currentValue) => accum + Number(currentValue.price) * currentValue.quantity, 0);
};

const showTotal = () => {
	total.innerHTML = `$ ${getCartTotal().toFixed(2)}`;
};

const resetCartItems = () => {
	cart = [];
	checkCartState();
};

const completeCartAction = (confirmMsg, succesMsg) => {
	if (!cart.length) return;
	if (window.confirm(confirmMsg)) {
		resetCartItems();
		alert(succesMsg);
	}
};

const completeBuy = () => {
	completeCartAction("Desea confirmar su compra?", "Gracias por la compra");
};

const deleteCart = () => {
	completeCartAction("Desea vaciar la lista?");
};

const cartPlusBtn = (id) => {
	const existingProduct = cart.find((product) => product.id === id);
	addUnitToProduct(existingProduct);
};

//??
const removeProductFromCart = ({ id }) => {
	cart = cart.filter((product) => product.id !== id);
	checkCartState();
};

const substractProductUnit = ({ id }) => {
	cart = cart.map((product) => (product.id === id ? { ...product, quantity: product.quantity - 1 } : product));
};

const cartMinusBtn = (id) => {
	const existingProduct = cart.find((product) => product.id === id);

	if (existingProduct.quantity === 1) {
		if (window.confirm("Desea eliminar este producto?")) {
			removeProductFromCart(existingProduct);
		}
		return;
	}
	substractProductUnit(existingProduct);
};

const handleQuantity = (e) => {
	if (e.target.classList.contains("down")) {
		cartMinusBtn(e.target.dataset.id);
	} else if (e.target.classList.contains("up")) {
		cartPlusBtn(e.target.dataset.id);
	}
	checkCartState();
};

const init = () => {
	renderProducts();
	btnLoad.addEventListener("click", showMoreProducts);
	categories.addEventListener("click", applyFilter);
	barsBtn.addEventListener("click", toggleMenu);
	cartBtn.addEventListener("click", toggleCart);
	barsMenu.addEventListener("click", closeOnClick);
	overlay.addEventListener("click", closeOnOverlayClick);
	window.addEventListener("scroll", closeOnScroll);

	document.addEventListener("DOMContentLoaded", renderCart);
	document.addEventListener("DOMContentLoaded", showTotal);

	productsCart.addEventListener("click", handleQuantity);
	products.addEventListener("click", addProduct);
	buyBtn.addEventListener("click", completeBuy);
	deleteBtn.addEventListener("click", deleteCart);

	disableBtn(deleteBtn);
	disableBtn(buyBtn);
	renderCartBubble();
};

init();
