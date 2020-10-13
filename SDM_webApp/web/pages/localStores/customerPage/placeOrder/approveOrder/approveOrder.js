var currOrder
$(document).ready(function() {
    var data= GetURLParameter("varid")
     var disounts =  atob(data);
    creatOrderJsObject()
    creatStoreTable()
    createOrderSummery()
    $(document).on('click', '.storeName', function(){
        var rowID = $(this).text(); // $(this) refers to button that was clicked
        console.log(rowID)

    });
},
    function GetUrlValue(VarSearch) {
        var SearchString = window.location.search.substring(1);
        var arr = SearchString.split('&');
        console.log(arr);
        //Set session variables
        var username = arr[1].split('=')[1];
        var password = arr[2].split('=')[1];
        document.getElementById('username').value = username;
        document.getElementById('password').value = password;
    })

function creatOrderJsObject() {
    var stores = createStoresJsObjects()
    currOrder = new order(stores, orderTotal, shippingTotal, totalItemCost)
}

function createStoresJsObjects() {
    var stores = new Map();
    var store = new store(items, name, id, ppk, distance, shippingCost)
    stores[id] = store
    return stores
}

function createItemsJsObjects() {
    var items = new item(amount, name, id, sellBy, totalItemsCost, isPartOfDiscount)
    return items
}
//creates the stores table on load
function creatStoreTable() {
    //TODO: give real value to the varibales below
    var storeName = "dynamicaly added store"
    var storeID ="9"
    var ppk = "13"
    var distanceToClient = "13"
    var shippingCost = "169"
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
    $("#Order-Subtotal").text(120)
    $("#Shipping-total").text(121)
    $("#total").text(122)

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
