class ShoppingCart extends HTMLElement {
    constructor(){
        super(); // Call the constructor of the parent class
        this.attachShadow({mode: 'open'}); // Attach a shadow DOM to the component
        this.cart = []; // Initialize an empty cart array
    }

    connectedCallback(){
        this.render(); // Render the component when it is connected to the DOM
    }

    updateCart(product){
        // Check if the product already exists in the cart
        const existingProduct = this.cart.find(item => item.name === product.name);

        if (existingProduct) {
            existingProduct.quantity += 1; // Increase quantity if product exists
        } else {
            this.cart.push(product); // Add new product to the cart
        }

        this.render(); // Re-render the cart
    }

    removeFromCart(productName) {
        // Remove a product from the cart by name
        this.cart = this.cart.filter(item => item.name !== productName);
        this.render(); // Re-render the cart
    }

    render(){
        // Check if the cart is empty and display a message if it is
        if (this.cart.length === 0) {
            this.shadowRoot.innerHTML = `<p>Your cart is empty.</p>`;
            return; // Exit the function if the cart is empty
        }

        // Calculate the total price of items in the cart
        const total = this.cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);

        // Set the inner HTML of the shadow DOM for the shopping cart
        this.shadowRoot.innerHTML = `
            <h2>Shopping Cart</h2>
            <ul>
                ${this.cart.map(product => `
                    <li>
                        ${product.name} - $${product.price} x ${product.quantity} <!-- Display product details -->
                        <button class="remove-button" data-name="${product.name}">Remove</button> <!-- Button to remove product -->
                    </li>
                `).join('')} <!-- Join the list items into a single string -->
            </ul>
            <p>Total: $${total.toFixed(2)}</p> <!-- Display total price -->
        `;
        // Add event listeners to each remove button
        this.shadowRoot.querySelectorAll('.remove-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const productName = event.target.getAttribute('data-name'); // Get product name from button
                this.removeFromCart(productName); // Remove product from cart
            });
        });
    }
}

customElements.define('shopping-cart', ShoppingCart); // Define the custom element
export default ShoppingCart; // Export the ShoppingCart class