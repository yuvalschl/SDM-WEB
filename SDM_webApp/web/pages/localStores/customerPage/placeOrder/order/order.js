class order {
    constructor() {
        this._items = new Map();
        this._discountItems = new Map();
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