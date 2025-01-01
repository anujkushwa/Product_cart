document.addEventListener("DOMContentLoaded", () => {
    const cartItems = {};
    const cartTable = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (e) => {
            const product = e.target.closest(".product");
            const id = product.dataset.id;
            const name = product.dataset.name;
            const price = parseFloat(product.dataset.price);
    
            if (!cartItems[id]) {
                cartItems[id] = { name, price, quantity: 1 };
            } else {
                cartItems[id].quantity += 1;
            }

            updateCart();
        });
    });

    function updateCart() {
        cartTable.innerHTML = "";
        let total = 0;

        Object.entries(cartItems).forEach(([id, item]) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>₹${item.price}</td>
                <td>
                    <input type="number" value="${item.quantity}" min="1" class="quantity" data-id="${id}">
                </td>
                <td>₹${itemTotal}</td>
                <td><button class="remove" data-id="${id}">Remove</button></td>
            `;
            cartTable.appendChild(row);
        });

        cartTotal.textContent = total;

        document.querySelectorAll(".quantity").forEach(input => {
            input.addEventListener("input", (e) => {
                const id = e.target.dataset.id;
                const newQuantity = parseInt(e.target.value);
                if (newQuantity > 0) {
                    cartItems[id].quantity = newQuantity;
                    updateCart();
                }
            });
        });

        document.querySelectorAll(".remove").forEach(button => {
            button.addEventListener("click", (e) => {
                const id = e.target.dataset.id;
                delete cartItems[id];
                updateCart();
            });
        });
    }
});
