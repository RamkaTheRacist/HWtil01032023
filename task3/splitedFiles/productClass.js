export class Product {
    _name;
    _price;
    _quantity;
    _description;

    /**
     * Create object `Product`
     * 
     * @param {string} name Name [Mandatory parameter]
     * @param {number} price Price [Mandatory parameter]
     * @param {number} quantity Quantity [Mandatory parameter]
     * @param {string} description Description [Optional parameter] (Default is one space in string)
     */
    constructor(name, price, quantity, description = " ") {
        this.setName(name);
        this.setPrice(price);
        this.setQuantity(quantity);
        this.setDescription(description);
    }

    setName(value) {
        if (!value || !value.replace(/\s+/gu, "")) {
            throw new Error("Name can not be empty or null");
        }
        this._name = value;
    }

    setPrice(value) {
        if (!value || !value.replace(/\s+/gu, "")) {
            throw new Error("Price can not be empty or null");
        }
        if (isNaN(value)) {
            throw new Error("Price should be a number");
        }
        if (+value < 0) {
            throw new Error("Price should be more or equals zero");
        }
        this._price = +value;
    }

    setQuantity(value) {
        if (!value || !value.replace(/\s+/gu, "")) {
            throw new Error("Quantity can not be empty or null");
        }
        if (isNaN(value)) {
            throw new Error("Quantity should be a number");
        }
        if (+value < 0) {
            throw new Error("Quantity should be more or equals zero");
        }
        if (value % 1 != 0) {
            throw new Error("Quantity should be integer");
        }
        this._quantity = +value;
    }

    setDescription(value) {
        this._description = value;
    }

    getName() {
        return this._name;
    }
    getPrice() {
        return this._price;
    }
    getQuantity() {
        return this._quantity;
    }
    getDescription() {
        return this._description;
    }

    toString() {
        return `Name: ${this.getName()}\nPrice: ${this.getPrice()}\nQuantity: ${this.getQuantity()}\nDescription: ${this.getDescription()}\n`;
    }
}