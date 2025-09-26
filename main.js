// Global variable definitions
let allProducts = [];
let filterProducts = [];
let cartItems = [];
let currentPage = 1;
const productsPerPage = 6;

// Fetch products from API and update main variables
async function fetchProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const fetchData = await res.json();
    allProducts = fetchData;
    filterProducts = [...allProducts];
    displayProducts(allProducts);
    populateCategories(allProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
fetchProducts();

// Display products using pagination
function displayProducts(products) {
  const container = document.getElementById("productsContainer");
  container.innerHTML = "";

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

  paginatedProducts.forEach((Product) => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${Product.image}" width="100" />
      <h3>${Product.title}</h3>
      <p>$${Product.price}</p>
      <button onclick="addToCart(${Product.id})">Add to Cart</button>
      <button onclick="showProductDetails(${Product.id})">Learn More</button>
    `;
    container.appendChild(div);
  });

  setupPagination(products);
}

// Create pagination buttons
function setupPagination(products) {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(products.length / productsPerPage);

  // Create "Back" button
  const backBtn = document.createElement("button");
  backBtn.id = "Backbtn";
  backBtn.className = "back-btn";
  backBtn.textContent = "Back";
  backBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayProducts(filterProducts);
    }
  });
  paginationContainer.appendChild(backBtn);

  // Create numbered page buttons
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.classList.add("page-btn");
    if (i === currentPage) btn.classList.add("active");

    btn.addEventListener("click", () => {
      currentPage = i;
      displayProducts(filterProducts);
    });

    paginationContainer.appendChild(btn);
  }

  // Create "Next" button
  const nextBtn = document.createElement("button");
  nextBtn.id = "Nextbtn";
  nextBtn.className = "next-btn";
  nextBtn.textContent = "Next";
  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayProducts(filterProducts);
    }
  });
  paginationContainer.appendChild(nextBtn);

  // Disable Back/Next buttons at limits
  backBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

// Show product details in a modal
function showProductDetails(productid) {
  const productDetails = allProducts.find((item) => item.id === productid);
  if (!productDetails) {
    console.error("Product not found");
    return;
  }

  const container = document.getElementById("productDetailsContainer");
  container.innerHTML = "";
  container.style.display = "flex";

  const div = document.createElement("div");
  div.className = "product-details";
  div.innerHTML = `
    <button class="close-btn" onclick="closeProductDetails()">×</button>
    <img src="${productDetails.image}" />
    <h3>${productDetails.title}</h3>
    <h3>Price: $${productDetails.price}</h3>
    <h5>Category: ${productDetails.category}</h5>
    <p>Description: ${productDetails.description}</p>
    <p>Rate: ${productDetails.rating.rate}</p>
    <p>Rate Count: ${productDetails.rating.count}</p>
  `;
  container.appendChild(div);
}

// Close product details modal
function closeProductDetails() {
  document.getElementById("productDetailsContainer").style.display = "none";
}

// Close modal when clicking outside the content area
window.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("productDetailsContainer")
    .addEventListener("click", function (e) {
      if (e.target.id === "productDetailsContainer") {
        closeProductDetails();
      }
    });
});

// Add product to cart
function addToCart(productid) {
  const productAdded = allProducts.find((item) => item.id === productid);
  if (!productAdded) {
    console.error("Product not found");
    return;
  }

  const existingItem = cartItems.find((item) => item.id === productid);
  if (existingItem) {
    existingItem.count++;
  } else {
    cartItems.push({ ...productAdded, count: 1 });
  }

  displayCart();
}

// Display cart items with quantity and price
function displayCart() {
  const container = document.getElementById("productAddedToCart");
  container.innerHTML = "";

  cartItems.forEach((item) => {
    const div = document.createElement("div");
    div.className = "product-details";
    div.innerHTML = `
      <h5>Title: ${item.title}</h5>
      <p>Price: $${item.price}</p>
      <div class="count-controls">
        <button class="btn-increase" onclick="increaseCount(${item.id})">+</button>
        <span id="count-${item.id}">${item.count}</span>
        <button class="btn-decrease" onclick="decreaseCount(${item.id})">-</button>
      </div>
      <button class="btn-remove" onclick="removeProductFromCart(${item.id})">Remove</button>
    `;
    container.appendChild(div);
  });

  if (cartItems.length > 0) {
    const totalQuantityToBuy = totoalQuantity();
    document.getElementById(
      "totalquantity"
    ).innerHTML = `Total Quantity : ${totalQuantityToBuy}`;

    const totalPriceToBuy = totalPrice();
    document.getElementById(
      "totalPrice"
    ).innerText = `Total: $${totalPriceToBuy.toFixed(2)}`;
  } else {
    document.getElementById("totalquantity").innerHTML = "";
    document.getElementById("totalPrice").innerText = "";
  }
}

// Increase item quantity in cart
function increaseCount(id) {
  const item = cartItems.find((i) => i.id === id);
  if (item) {
    item.count++;
    document.getElementById(`count-${id}`).innerText = item.count;
  }
  displayCart();
}

// Decrease item quantity or remove if zero
function decreaseCount(id) {
  const item = cartItems.find((i) => i.id === id);
  if (item) {
    item.count--;
    if (item.count === 0) {
      const index = cartItems.indexOf(item);
      cartItems.splice(index, 1);
    }
    displayCart();
  }
}

// Remove item completely from cart
function removeProductFromCart(id) {
  cartItems = cartItems.filter((item) => item.id !== id);
  displayCart();
}

// Calculate total quantity in cart
function totoalQuantity() {
  let totalQuantityToBuy = cartItems.reduce(
    (acc, current) => acc + current.count,
    0
  );
  return totalQuantityToBuy;
}

// Calculate total price in cart
function totalPrice() {
  let totalPriceToBuy = cartItems.reduce(
    (acc, current) => acc + current.price * current.count,
    0
  );
  return totalPriceToBuy;
}

// Populate category options for filtering
function populateCategories(products) {
  const select = document.getElementById("ProductsFilter");
  const categories = [...new Set(products.map((p) => p.category))];

  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

// Filter button: filter by search text, category and price range
document.getElementById("btn-filter").addEventListener("click", function () {
  const search = document.getElementById("search-input").value.toLowerCase();
  const selectedCategory = document.getElementById("ProductsFilter").value;
  const minPrice = document.getElementById("min-Price").value || 0;
  const maxPrice = document.getElementById("max-Price").value || Infinity;

  let filtered = allProducts;

  if (search) {
    filtered = filtered.filter((product) =>
      product.title.toLowerCase().includes(search)
    );
  }

  if (selectedCategory !== "All Categories") {
    filtered = filtered.filter(
      (product) => product.category === selectedCategory
    );
  }

  filtered = filtered.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );
  filterProducts = [...filtered];

  currentPage = 1;
  displayProducts(filtered);
});

// Reset button: clear filters and show all products
document.getElementById("btn-reset").addEventListener("change", function () {
  document.getElementById("search-input").value = "";
  document.getElementById("ProductsFilter").value = "All Categories";
  document.getElementById("min-Price").value = "";
  document.getElementById("max-Price").value = "";

  displayProducts(allProducts);
});

// Sort products by price from dropdown
document.getElementById("PriceSort").addEventListener("change", function () {
  const sortValue = this.value;
  let sortedProducts = [...filterProducts];

  if (sortValue === "low-to-high") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortValue === "high-to-low") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  currentPage = 1;
  displayProducts(sortedProducts);
});
