class item {
    constructor(name, id, amount, isPartOfSale) {
        this._name = name;
        this._id = id;
        this._amount = amount;
        this._isPartOfSale = isPartOfSale;
    }

    addToAmount(amountToAdd){
        this._amount = parseInt(this._amount) + parseInt(amountToAdd)
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get amount() {
        return this._amount;
    }

    set amount(value) {
        this._amount = value;
    }
}