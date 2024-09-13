import ProductItem from '../productItem/productItem.js'; // Importing the ProductItem component
import ProductData from '../../data/dataProducts.js'; // Importing product data

class ProductList extends HTMLElement {
    constructor(){
        super(); // Call the constructor of the parent class
        this.attachShadow({mode: 'open'}); // Attach a shadow DOM to the component
    };

    connectedCallback(){
        this.render(); // Render the component when it is connected to the DOM
        
        const shoppingCart = this.shadowRoot.querySelector('shopping-cart'); // Select the shopping cart element
    
        // Define a global function to update the shopping cart
        window.updateCart = (product) => {
            if (shoppingCart) {
                shoppingCart.updateCart(product); // Update the cart if found
            } else {
                console.error('Shopping cart not found'); // Log an error if not found
            }
        };
    }
    

    render(){
        // Set the inner HTML of the shadow DOM
        this.shadowRoot.innerHTML = `
            <h2>Products</h2>
            <section id="product-list"></section> <!-- Section to hold product items -->
            <shopping-cart></shopping-cart> <!-- Include the shopping cart component -->
        `;

        const productList = this.shadowRoot.querySelector('#product-list'); // Select the product list section
        ProductData.forEach(product => {
            const productItem = document.createElement('product-item'); // Create a new product-item element
            productItem.setAttribute('name', product.name); // Set product attributes
            productItem.setAttribute('price', product.price);
            productItem.setAttribute('quantity', product.quantity);
            productList.appendChild(productItem); // Append the product item to the product list
        });
    }
};

customElements.define('product-list', ProductList); // Define the custom element
export default ProductList; // Export the ProductList class
