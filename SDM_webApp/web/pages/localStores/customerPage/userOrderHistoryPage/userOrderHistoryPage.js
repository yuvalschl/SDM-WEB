const GET_ORDER_HISTORY_URL = buildUrlWithContextPath("getOrderHistory")
var allOrders

$(document).ready(function (){
    //http request for getting the order history
    $.ajax({
        url: GET_ORDER_HISTORY_URL,
        dataType: 'json',
        success: function (orders){
            allOrders = orders // this.orders is the global variable
            $.each(orders || [], appendRowToOrdersTable)
        },
        error: function (){
            console.log('error in get order history servlet')
        }
    })

    $(document).on('click', '.orderId', function () {
        var orderId = $(this).attr('id')
        var order = allOrders[orderId]
        createItemsTable(order.orderItems)
    });

})

//creates the stores table on load
function appendRowToOrdersTable(index, order) {
    var orderId = order.orderId
    var orderDate = order.orderDate.toString().slice(0,-11)
    var orderDestination = order.orderDestination.x + ', ' + order.orderDestination.y
    var numberOfStoresInOrder = order.numberOfStoresInOrder
    var amountOfItems = order.amountOfItems
    var itemsCost = order.itemsCost
    var shippingCost = order.shippingCost
    var totalCost = order.totalCost
    var rowToAppend =
        "<tr class='orderId' id='" + orderId + "'> "+
        " <td class='align-middle'>"+orderId+"</td>" +
        " <td class='align-middle'>"+orderDate+"</td>" +
        " <td class='align-middle'>"+orderDestination+"</td>" +
        " <td class='align-middle'>"+numberOfStoresInOrder+"</td>" +
        " <td class='align-middle'>"+amountOfItems+"</td>" +
        " <td class='align-middle'>"+itemsCost+"</td>" +
        " <td class='align-middle'>"+shippingCost+"</td>" +
        " <td class='align-middle'>"+totalCost+"</td>" +
        "</tr>"
    $("#storeTable").append(rowToAppend)
}

function appendRowToItemstable(index, item) {
    var rowToAppend ="      <tr>" +
        "                        <td class='align-middle'>"+item.itemId+"</td>" +
        "                        <td class='align-middle'>"+item.itemName+"</td>" +
        "                        <td class='align-middle'>"+item.sellBy+"</td>" +
        "                        <td class='align-middle'>"+item.storeId+"</td>" +
        "                        <td class='align-middle'>"+item.storeName+"</td>" +
        "                        <td class='align-middle'>"+item.amount+"</td>" +
        "                        <td class='align-middle'>"+item.pricePerUnit+"</td>" +
        "                        <td class='align-middle'>"+item.totalCost+"</td>" +
        "                        <td class='align-middle'>"+item.partOfDiscount+"</td>" +
        "                    </tr>"
    $("#itemsTable").append(rowToAppend)
}

function createItemsTable(items) {
    $("#itemsTable").empty()
    $.each(items || [], appendRowToItemstable)
}