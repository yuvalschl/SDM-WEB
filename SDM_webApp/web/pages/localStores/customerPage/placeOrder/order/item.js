class item {
    constructor(name, id, amount) {
        this._name = name;
        this._id = id;
        this._amount = amount;
    }

    addToAmount(amountToAdd){
        this._amount += amountToAdd
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