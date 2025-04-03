document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
});

// Fetch all products and display them
function fetchProducts() {
    fetch("http://localhost:5000/get-products")
        .then(response => response.json())
        .then(products => displayProducts(products))
        .catch(error => console.error("Error fetching products:", error));
}

// Display products in the table
function displayProducts(products) {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
            <td>${product.description}</td>
            <td>${product.created_at}</td>
        `;
        productList.appendChild(row);
    });
}

// Search functionality
document.getElementById("searchInput").addEventListener("input", function () {
    const query = this.value.trim();

    if (query === "") {
        fetchProducts(); // Reload all products if search is empty
        return;
    }

    fetch(`http://localhost:5000/search-products?q=${query}`)
        .then(response => response.json())
        .then(products => displayProducts(products))
        .catch(error => console.error("Error searching products:", error));
});
