# 🛒 Simple E-commerce Store (Vanilla JS)

A dynamic front-end e-commerce application that fetches products from an external API and provides a seamless shopping experience with advanced filtering, sorting, and cart management capabilities.

## 🌟 Project Overview
This project demonstrates pure **JavaScript (ES6+)** skills without relying on any frontend frameworks. It focuses on DOM manipulation, asynchronous data fetching, and complex array operations to handle application state.

## 🚀 Features

### 🛍️ Product Browsing
- **Dynamic Fetching:** Consumes data from [FakeStoreAPI](https://fakestoreapi.com/).
- **Pagination:** Client-side pagination logic to display products in chunks (6 per page).
- **Product Details:** A modal (popup) system to view detailed information about a specific product.

### 🔍 Search & Filtering
- **Smart Search:** Filter products by title in real-time.
- **Category Filter:** Dynamic dropdown populated based on available API data.
- **Price Range:** Filter products by minimum and maximum price inputs.

### 📊 Sorting
- **Price Sorting:** Sort products from **Low to High** or **High to Low**.

### 🛒 Shopping Cart System
- **Add to Cart:** Users can add products to the cart.
- **Quantity Management:** Increase or decrease item counts directly from the cart.
- **Auto-Calculations:**
  - **Total Price:** Calculated dynamically using the `.reduce()` method.
  - **Total Quantity:** Real-time update of total items in the cart.
- **Remove Items:** Delete specific items from the cart logic.

## 🛠️ Tech Stack
- **HTML5:** Semantic structure.
- **CSS3:** Styling and responsive layout.
- **JavaScript (Vanilla):**
  - `fetch` API & `async/await`.
  - DOM Manipulation.
  - Array Higher Order Functions (`map`, `filter`, `reduce`, `sort`).

## 📂 Project Structure

```text
/
├── index.html    # Main HTML structure
├── style.css     # Styling for the application
├── main.js       # Core logic (Fetching, Filtering, Cart Logic)
└── README.md     # Project documentation
