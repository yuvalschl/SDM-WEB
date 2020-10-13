
class EntitledDiscounts {
    constructor(currentOrder, discounts) {
        function clacDiscounts(currentOrder, discounts) {
            var discountMap = new Map
            for(var i=0;i<discounts.length;i++){
                var discountNameNoSpaces = discounts[i].name.replace(/\s+/g, '')
                discountMap[discountNameNoSpaces] = calcSingleDiscount(currentOrder, discounts[i])
            }

            return discountMap
        }
        this.entitledDiscounts = clacDiscounts(currentOrder, discounts)
    }
}

function calcSingleDiscount(currentOrder, discount){

    return amountAvailable = currentOrder._items[discount.ifYouBuy.itemId].amount / discount.ifYouBuy.amount
}
