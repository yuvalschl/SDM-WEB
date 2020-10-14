const GET_ORDER_HISTORY_URL = buildUrlWithContextPath("getOrderHistory")


$(document).ready(function (){
    //http request for getting the order history
    $.ajax({
        url: GET_ORDER_HISTORY_URL,
        dataType: 'json',
        success: function (allOrders){
            $.each(allOrders || [], appendRowToOrdersTable)
        },
        error: function (){
            console.log('error in get order history servlet')
        }
    })
})

//creates the stores table on load
function appendRowToOrdersTable(order) {
    var orderId = order.orderId
    var orderDate = order.orderDate
    var orderDestination = order.orderDestination
    var numberOfStoresInOrder = order.numberOfStoresInOrder
    var amountOfItems = order.amountOfItems
    var itemsCost = order.itemsCost
    var shippingCost = order.shippingCost
    var totalCost = order.totalCost
    var rowToAppend =
        "<tr> "+
        "    <th scope='row'>"+
        "<div class='p-2'>"+
        "<div class='ml-3 d-inline-block align-middle'>"+
        "<h5 class='mb-0'><a href='#' class='text-dark d-inline-block storeName' >"+orderId+"</a></h5>"+
        "</div>" +
        "</div>" +
        "  </th>"+
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
        "                        <th scope='row'>" +
        "                            <div class='p-2'>" +
        "                                <div class='ml-3 d-inline-block align-middle'>" +
        "                                    <h5 class='mb-0'>"+item.itemName+"</h5>" +
        "                                </div>" +
        "                            </div>" +
        "                        </th>" +
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
