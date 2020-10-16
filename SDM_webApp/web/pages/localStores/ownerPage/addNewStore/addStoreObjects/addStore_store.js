class addStore_store {
    constructor() {
        this._name = 0
        this._ppk = 0;
        this._items = new Map()
        this._x = 0;
        this._y = 0;
    }


    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get ppk() {
        return this._ppk;
    }

    set ppk(value) {
        this._ppk = value;
    }

    get items() {
        return this._items;
    }

    set items(value) {
        this._items = value;
    }
}