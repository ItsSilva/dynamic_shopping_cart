import { ProductList } from "./components/index.js";

class AppContainer extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    };
    connectedCallback(){
        this.render();
    };
    render(){
        this.shadowRoot.innerHTML = `
        <h1>Shopping Products</h1>
        <product-list></product-list>
        `;
    }
};
customElements.define('app-container', AppContainer);