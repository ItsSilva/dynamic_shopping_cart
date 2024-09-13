class ProductItem extends HTMLElement {
    constructor(){
        super(); // Call the constructor of the parent class
        this.attachShadow({mode: 'open'}); // Attach a shadow DOM to the component
    };

    static get observedAttributes(){
        return ['name', 'price', 'quantity']; // Specify which attributes to observe for changes
    };

    connectedCallback(){
        this.render(); // Render the component when it is connected to the DOM
        this.shadowRoot.querySelector('.add-button').addEventListener('click', this.addToCart.bind(this)); // Add event listener for the add button
    };

    addToCart(){
        // Create a product object with the current attributes
        const product = {
            name: this.getAttribute('name'),
            price: parseFloat(this.getAttribute('price')), // Convert price to a float
            quantity: 1 // Default quantity to 1
        };

        window.updateCart(product); // Call the global function to update the cart
        alert(`${product.name} added to cart!`); // Alert user that the product was added
    };

    render(){
        // Set the inner HTML of the shadow DOM for the product item
        this.shadowRoot.innerHTML = `
            <div class="product-item">
                <h3>${this.getAttribute('name')}</h3> <!-- Display product name -->
                <p>Price: $${this.getAttribute('price')}</p> <!-- Display product price -->
                <p>Available: ${this.getAttribute('quantity')}</p> <!-- Display available quantity -->
                <input class='add-button' type='button' value='Add to cart'/> <!-- Button to add to cart -->
            </div>
        `;
    }
};

customElements.define('product-item', ProductItem); // Define the custom element
export default ProductItem; // Export the ProductItem class