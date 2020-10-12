class order {
    constructor() {
        this._items = new Map();
    }


    get items() {
        return this._items;
    }

    set items(value) {
        this._items = value;
    }
}