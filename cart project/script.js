let cart = [];

function addToCart(name, price) {
    let item = cart.find(product => product.name === name);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCartDisplay();
}

function updateCartDisplay() {
    let cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';

    if (cart.length === 0) {
        cartDiv.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            let cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <span>${item.name} - $${item.price} x ${item.quantity}</span>
                <div>
                    <button onclick="changeQuantity(${index}, -1)">-</button>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                    <button onclick="removeItem(${index})">Remove</button>
                </div>
            `;
            cartDiv.appendChild(cartItem);
        });
    }
    document.getElementById('total').textContent = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function checkout() {
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let amountPaid = parseFloat(document.getElementById('amount-paid').value);

    if (amountPaid >= total) {
        let change = amountPaid - total;
        let receipt = document.getElementById('receipt');
        receipt.innerHTML = `<h3>🧾 Receipt</h3>`;
        cart.forEach(item => {
            receipt.innerHTML += `<p>${item.quantity} x ${item.name} - $${item.price * item.quantity}</p>`;
        });

        receipt.innerHTML += `<hr>`;
        receipt.innerHTML += `<p><strong>Total:</strong> $${total.toFixed(2)}</p>`;
        receipt.innerHTML += `<p><strong>Paid:</strong> $${amountPaid.toFixed(2)}</p>`;
        receipt.innerHTML += `<p><strong>Change:</strong> $${change.toFixed(2)}</p>`;

        document.getElementById('receipt-container').style.display = "block"; 
    } else {
        alert("Insufficient funds!");
    }
}

function resetCart() {
    cart = [];
    document.getElementById('cart').innerHTML = '';
    document.getElementById('receipt-container').style.display = "none"; 
    document.getElementById('receipt').innerHTML = '';
    document.getElementById('amount-paid').value = '';
    updateCartDisplay();
}

document.getElementById('toggle-theme').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
