const GET_ALL_STORES_DATA = buildUrlWithContextPath("getStoresData")
const GET_ITEM_DATA = buildUrlWithContextPath("getItemNamePriceAndID")
const GET_STORE_ITEMS_DATA = buildUrlWithContextPath("getStoreItemsData")
const CREATE_ORDER= buildUrlWithContextPath("creatOrder")

var availableItems

$(document).ready(function () {
    currentOrder = new order(0)

})


function ajaxItemTableData(){
    var zone = GetURLParameter("zonename");
    $.ajax({
        url: GET_ITEM_DATA,
        dataType: 'json',
        data: "zonename=" + zone,
        success: function (itemData){
            $.each(itemData || [], updateTable)
            console.log("table loaded")
        },
        error: function (errorInfo){
            console.log("error while uploading file" + errorInfo)
        }
    })
}

function ajaxGetStoreItems(storeId){
    isDynamicOrder = false
    var zoneName = decodeURI(GetURLParameter("zonename"))
    $.ajax({
        url: GET_STORE_ITEMS_DATA,
        dataType: 'json',
        data: {'storeId' : storeId, 'zonename' : zoneName},
        success : function (data){
            $("#itemTableBody").empty()
            $.each(data || [], updateTable)
            availableItems = new AvailableItems()
            $.each(data || [], addToAvailableItems)
        },
        error: function (errorInfo){
            console.log("error on getStoreItem ajax call")
        }
    })
}

function addToAvailableItems(index, data) {
    availableItems[data.id] = {
        'id': data.id,
        'name': data.name,
        'price': data.pricePerUnit,
        'sellBy': data.sellBy
    }
}

function updateCart(i){
    //todo: upadte the cart, item id is in the input data-itemId tag
}

function enforceMinMax(el){
    if(el.value !== ""){
        if(parseInt(el.value) < parseInt(el.min)){
            el.value = el.min;
        }
        if(parseInt(el.value) > parseInt(el.max)){
            el.value = el.max;
        }
    }
}