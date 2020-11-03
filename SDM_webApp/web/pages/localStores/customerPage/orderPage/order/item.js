class item {

    constructor(name, id, amount, isPartOfSale, storeId, forAdditional) {
        this._name = name;
        this._id = id;
        this._amount = amount;
        this._isPartOfSale = isPartOfSale;
        this._storeId = storeId;
        this._forAdditional = forAdditional;
    }

    addToAmount(amountToAdd, forAdditional){
        this._amount = parseInt(this._amount) + parseInt(amountToAdd )
        this._forAdditional += forAdditional
    }
    get storeId() {
        return this._storeId;
    }

    set storeId(value) {
        this._storeId = value;
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