var currOrderPGapproveOrder
var currDiscountsPGapproveOrder
var datePGapproveOrder
var typeOfOrder
var currlocation
var zone
var orderWrapper
var items
const CREATE_ORDER= buildUrlWithContextPath("creatOrder")

$(document).ready(function() {
    initializeGlobalVariables()
    presentStores()
    createOrderSummery()
    $(document).on('click', '.storeName', function () {
        var storeName = $(this).text(); // $(this) refers to button that was clicked
        var store = getStoreByName(storeName)
        createItemsTable(store.items)
    });
    $(document).on('click', '#approvedBtn', function () {
        approveOrder()
    });
    $(document).on('click', '#CancelBtn', function () {
        cancelOrder()
    });


})
function initializeGlobalVariables() {//initialize all the global vars used in this page for later use
    zone = decodeURI(GetURLParameter("zonename"))
    datePGapproveOrder = decodeURI(GetURLParameter("date"))
    typeOfOrder = decodeURI(GetURLParameter("type"))
    var xCor =  GetURLParameter("xCor")
    var yCor = GetURLParameter("yCor")
    currlocation = JSON.stringify({"x":xCor,"y":yCor})
    var data = decodeURI(GetURLParameter("varid")) //gets the coded object passed from the last page
    orderWrapper = atob(data);//decodes it to a string
    creatOrderJsObject(orderWrapper)//creates a JS order object
    items = atob(GetURLParameter("orderAfterDiscount"))
    items = JSON.parse(items)
}

function approveOrder(){
    var store = currOrderPGapproveOrder.allStores[0].id
    store = JSON.stringify(store)
    items = items.replace(/\\\//g, "");
    $.ajax({
        url: CREATE_ORDER,
        dataType: 'json',
        data: {'zonename': zone, 'location': currlocation, 'items': items, 'date': datePGapproveOrder, 'type': typeOfOrder, 'approved': true , 'store': store},
        success: function (){
            console.log("order was good assss bro")
            goToFeedbackPg()
        },
        error : function (){
            console.log("dani zion")
        }
    })

}

function cancelOrder() {
    var userName = decodeURI(GetURLParameter("username"))

    window.location = "../../../localStores.html?&zonename="+zone+"&username="+userName;
}
function getStoreByName(storeName) {//gets the store object by its name
    for(var i=0; i< currOrderPGapproveOrder.allStores.length;i++){
        if(currOrderPGapproveOrder.allStores[i].name === storeName){
            return currOrderPGapproveOrder.allStores[i]
        }

    }
}

function creatOrderJsObject(JsonOrder) {
    var wrapper = JSON.parse(JsonOrder); //parse the json recieved to a JS object
    currOrderPGapproveOrder = wrapper.order
    currDiscountsPGapproveOrder = wrapper.discount
    orderWrapper = wrapper

}

function createItemsTable(items) {
    $("#itemsTable").empty()
    $.each(items || [], appendRowToItemstable)
}

function appendRowToItemstable(index, item) {
    var rowToAppend ="      <tr>" +
        "                        <th scope='row'>" +
        "                            <div class='p-2'>" +
        "                                <div class='ml-3 d-inline-block align-middle'>" +
        "                                    <h5 class='mb-0'>"+item.name+"</h5>" +
        "                                </div>" +
        "                            </div>" +
        "                        </th>" +
        "                        <td class='align-middle'>"+item.id+"</td>" +
        "                        <td class='align-middle'>"+item.sellBy+"</td>" +
        "                        <td class='align-middle'>"+item.amount+"</td>" +
        "                        <td class='align-middle'>"+item.totalItemCost+"</td>" +
        "                        <td class='align-middle'>"+item.isPartOfSale+"</td>" +
        "                    </tr>"
    $("#itemsTable").append(rowToAppend)
}

function presentStores(){
    for(var i=0; i< currOrderPGapproveOrder.allStores.length;i++){
        var currStore = currOrderPGapproveOrder.allStores[i];
        appendRowToStoresTable(currStore);
    }
}
//creates the stores table on load
function appendRowToStoresTable(store) {
    var storeName = store.name
    var storeID =store.id
    var ppk = store.ppk
    var distanceToClient = store.distance
    var shippingCost = store.shippingCost
    var rowToAppend =
        "<tr> "+
        "    <th scope='row'>"+
                "<div class='p-2'>"+
                      "<div class='ml-3 d-inline-block align-middle'>"+
                            "<h5 class='mb-0'><a href='#' class='text-dark d-inline-block storeName' >"+storeName+"</a></h5>"+
                        "</div>" +
                "</div>" +
           "  </th>"+
            " <td class='align-middle'>"+storeID+"</td>" +
            " <td class='align-middle'>"+ppk+"</td>" +
            " <td class='align-middle'>"+distanceToClient+"</td>" +
            " <td class='align-middle'>"+shippingCost+"</td>" +
        "</tr>"
    $("#storeTable").append(rowToAppend)
}


function createOrderSummery() {
    $("#Order-Subtotal").text(currOrderPGapproveOrder.totalItemCost)
    $("#Shipping-total").text(currOrderPGapproveOrder.shippingTotal)
    $("#total").text(currOrderPGapproveOrder.orderTotal)
}

function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1];
        }
    }
}

function createStoresIdString() {
    var storesID = ""
    for(var i=0; i < currOrderPGapproveOrder.allStores.length ; i++){
        storesID += currOrderPGapproveOrder.allStores[i].id+" "
    }
    return btoa(storesID)
}

function goToFeedbackPg(){
    var stores = createStoresIdString()
    var userName = decodeURI(GetURLParameter("username"))
    window.location = "../../feedbackPage/feedback.html?&zonename="+zone+"&date="+datePGapproveOrder+"&stores="+stores+"&username="+userName;
}

