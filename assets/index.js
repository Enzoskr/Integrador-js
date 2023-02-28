const products = document.querySelector(".productos-container");
//btn ver mas
const btnLoad = document.querySelector(".btn-load");
//contenedor de las categorias
const categories = document.querySelector(".categorias");
//las categorias en un htmlcollection de los botones
const categoriesList = document.querySelectorAll(".category");

const cartBtn = document.querySelector(".cart-label");
const barsBtn = document.querySelector(".menu-label");
const cartMenu = document.querySelector(".cart");
const barsMenu = document.querySelector(".navbar-list");
const overlay = document.querySelector(".overlay");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const savelocalstorage = (cartlist) => {
  localStorage.setItem("cart", JSON.stringify(cartlist));
};

const renderproduct = (productos) => {
  const { id, name, price, marca, userimg, cardImg } = productos;
  return `  
    <div class="card">
      <img src="${cardImg}" alt="${name}"/>
      <div class="hero-card-info">
      <div class="hero-card-top"><h3>${name} </h3>
    <span><i class="fa-solid fa-truck-fast"></i></span>
     </div>
      <div class="hero-card-botton">
      <div class="marca-ensambladora"><p>${marca}</p></div>
      <div class="hero-card-precio"><p>💲${price}</p></div>
  </div> 
        
  </div> 
    <button
              class="btn-add"
              data-id="${id}"
              data-name="${name}"
              data-price="${price}"
              data-marca="${marca}"
              data-img="${cardImg}">
                Add
            </button>

</div>
           
    `;
};

const renderdividedproducts = (index = 0) => {
  products.innerHTML += productscontroller.dividedproducts[index]
    .map(renderproduct)
    .join("");
};

const renderFilteredProductos = (category) => {
  const productsList = productsdata.filter((productos) => {
    return productos.category === category;
  });
  products.innerHTML = productsList.map(renderproduct).join("");
};

const renderProducts = (index = 0, category = undefined) => {
  if (!category) {
    renderdividedproducts(index);
    return;
  }
  renderFilteredProductos(category);
};
//// renderizado de cards

///paginación

const changeShowMoreBtnState = (category) => {
  if (!category) {
    btnLoad.classList.remove("hidden");
    return;
  }
  btnLoad.classList.add("hidden");
};

const changeBtnActiveState = (selectedCategory) => {
  const categories = [...categoriesList];
  categories.forEach((categoryBtn) => {
    if (categoryBtn.dataset.category !== selectedCategory) {
      categoryBtn.classList.remove("active");
      return;
    }
    categoryBtn.classList.add("active");
  });
};
////
const changeFilterState = (e) => {
  const selectedCategory = e.target.dataset.category;
  changeShowMoreBtnState(selectedCategory);
  changeBtnActiveState(selectedCategory);
};
///
const applyFilter = (e) => {
  if (!e.target.classList.contains("category")) {
    return;
  } else {
    changeFilterState(e);
  }
  if (!e.target.dataset.category) {
    products.innerHTML = "";
    renderProducts();
  } else {
    renderProducts(0, e.target.dataset.category);
    productscontroller.nextProductsIndex = 1;
  }
};

const isLastIndexOf = () => {
  return (
    productscontroller.nextProductsIndex === productscontroller.productslimit
  );
};

const showMoreProducts = () => {
  renderProducts(productscontroller.nextProductsIndex);
  productscontroller.nextProductsIndex++;
  if (isLastIndexOf()) {
    btnLoad.classList.add("hidden");
  }
};

const toggleMenu = () => {
  barsMenu.classList.toggle("open-menu");
  if (cartMenu.classList.contains("open-cart")) {
    cartMenu.classList.remove("open-cart");
    return;
  }
  // overlay.classList.toggle("show-overlay");
};

const toggleCart = () => {
  cartMenu.classList.toggle("open-cart");
  if (barsMenu.classList.contains("open-menu")) {
    barsMenu.classList.remove("open-menu");
    return;
  }
  // overlay.classList.toggle("show-overlay");
};

const closeOnClick = (e) => {
  if (!e.target.classList.contains("navbar-link")) {
    return;
  }
  barsMenu.classList.remove("open-menu");
  // overlay.classList.remove("show-overlay");
};

const closeOnScroll = () => {
  if (
    !barsMenu.classList.contains("open-menu") &&
    !cartMenu.classList.contains("open-cart")
  ) {
    return;
  }
  barsMenu.classList.remove("open-menu");
  cartMenu.classList.remove("open-cart");
  // overlay.classList.remove("showoverlay");
};

//////
const init = () => {
  renderProducts();
  categories.addEventListener("click", applyFilter);
  btnLoad.addEventListener("click", showMoreProducts);
  barsBtn.addEventListener("click", toggleMenu);
  cartBtn.addEventListener("click", toggleCart);
  barsMenu.addEventListener("click", closeOnClick);
  window.addEventListener("scroll", closeOnScroll);
};

init();
