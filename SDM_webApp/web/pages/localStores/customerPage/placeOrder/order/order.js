class order {
    get amountAddedByDiscounts() {
        return this._amountAddedByDiscounts;
    }

    set amountAddedByDiscounts(value) {
        this._amountAddedByDiscounts = value;
    }
    constructor(amountAddedByDiscounts) {
        this._items = new Map();
        this._discountItems = new Map();
        this._amountAddedByDiscounts = amountAddedByDiscounts;
    }

    get discountItems() {
        return this._discountItems;
    }

    set discountItems(value) {
        this._discountItems = value;
    }

    get items() {
        return this._items;
    }

    set items(value) {
        this._items = value;
    }
}