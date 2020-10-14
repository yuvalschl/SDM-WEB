
class EntitledDiscounts {

    constructor(currentOrder, discounts) {
        this._entitledDiscounts = clacDiscounts(currentOrder, discounts)
        function clacDiscounts(currentOrder, discounts) {
            var discountMap = new Map
            for(var i=0;i<discounts.length;i++){
                var discountNameNoSpaces = discounts[i].name.replace(/\s+/g, '')
                discountMap[discountNameNoSpaces] = calcSingleDiscount(currentOrder, discounts[i])
            }

            return discountMap
        }
    }
    get entitledDiscounts() {
        return this._entitledDiscounts;
    }

    set entitledDiscounts(value) {
        this._entitledDiscounts = value;
    }
}

function calcSingleDiscount(currentOrder, discount){
    return Math.floor(amountAvailable = currentOrder._items[discount.ifYouBuy.itemId].amount / discount.ifYouBuy.amount);

}
