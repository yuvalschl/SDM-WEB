var currOrder
var date
var typeOfOrder
var location
var zone
$(document).ready(function() {
    zone = decodeURI(GetURLParameter("zonename"))
    date = decodeURI(GetURLParameter("date"))
    date = decodeURI(GetURLParameter("typeOfOrder"))
    date = decodeURI(GetURLParameter("location"))
    var data = decodeURI(GetURLParameter("varid"))//gets the object passed from the last page
    var jsonOrder = atob(data);//decodes it
    creatOrderJsObject(jsonOrder)//creates a JS order object
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
})


function approveOrder(){
    $.ajax({
        url: CREAT_ORDER,
        dataType: 'json',
        data: {'zonename': zone, 'location': location, 'items': items, 'date': date, 'type': typeOfOrder, 'store': store },
        type: 'POST',
        success: function (discounts){
            console.log("order was good as bro")
        },
        error : function (){
            console.log("dani zion")
        }
    })
}
function getStoreByName(storeName) {//gets the store object by its name
    for(var i=0; i< currOrder.allStores.length;i++){
        if(currOrder.allStores[i].name === storeName){
            return currOrder.allStores[i]
        }

    }
}
function creatOrderJsObject(JsonOrder) {
   currOrder = JSON.parse(JsonOrder); //parse the json recieved to a JS object
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
    for(var i=0; i< currOrder.allStores.length;i++){
        var currStore = currOrder.allStores[i];
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

function createOrderSummery() {//TODO:enter the real number instead of 120 121 122
    $("#Order-Subtotal").text(currOrder.totalItemCost)
    $("#Shipping-total").text(currOrder.shippingTotal)
    $("#total").text(currOrder.orderTotal)
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

