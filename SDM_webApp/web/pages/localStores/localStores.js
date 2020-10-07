
function updateTableSingleEntry(index, itemInfo){
    var itemdID = itemInfo.itemdID
    var itemName = itemInfo.itemName
    var sellBy = itemInfo.amountOfItemTypes
    var numberOfStoresSelling = itemInfo.amountOfStores
    var averagePrice = itemInfo.averagePrice
    var howManyItemSold = itemInfo.averagePriceOfOrders
    $("#zoneTable").append("<tr>" +
        "<td>" + itemdID + "</td>" +
        "<td>" + itemName + "</td>" +
        "<td>" + sellBy + "</td>" +
        "<td>" + numberOfStoresSelling + "</td>" +
        "<td>" + averagePrice + "</td>" +
        "<td>" +howManyItemSold + "</td>" +
        "</tr>");
}