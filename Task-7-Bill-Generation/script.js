document.getElementById("productForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get the form values
    const productName = document.getElementById("productName").value;
    const quantity = parseInt(document.getElementById("quantity").value);
    const unitPrice = parseFloat(document.getElementById("unitPrice").value);

    // Calculate total price
    const total = quantity * unitPrice;

    // Create a new table row
    const table = document.getElementById("billTable").getElementsByTagName("tbody")[0];
    const row = table.insertRow(table.rows.length);

    row.innerHTML = `
        <td>${productName}</td>
        <td>${quantity}</td>
        <td>$${unitPrice.toFixed(2)}</td>
        <td>$${total.toFixed(2)}</td>
    `;

    // Update the total amount
    updateTotalAmount();
    
    // Reset the form
    document.getElementById("productForm").reset();
});

function updateTotalAmount() {
    const rows = document.getElementById("billTable").getElementsByTagName("tbody")[0].rows;
    let totalAmount = 0;

    for (let i = 0; i < rows.length; i++) {
        const total = parseFloat(rows[i].cells[3].textContent.replace('$', ''));
        totalAmount += total;
    }

    document.getElementById("total").textContent = totalAmount.toFixed(2);
}
