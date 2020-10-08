const GET_STORES_DATA = buildUrlWithContextPath("getStoresData");
const GET_ITEM_DATA = buildUrlWithContextPath("getItemData")
const GET_STORE_ITEMS_DATA = buildUrlWithContextPath("getStoreItemsData")
var userName;
var userType;
$(document).ready(function() {
    ajaxItemTableData();
    ajaxGetStores();

    $(document).on('change', "#storesDropDown", function(){
        var temp = $(this).children(":selected").prop("value");
        ajaxGetStoreItems(temp)
    });
});


function updateTableSingleEntry(index, itemInfo){
    userName = itemInfo.userName
    userType = itemInfo.isOwner
    var itemID = itemInfo.itemID
    var itemName = itemInfo.itemName
    var sellBy = itemInfo.sellBy
    var numberOfStoresSelling = itemInfo.amountOfStoresSelling
    var averagePrice = itemInfo.averagePrice
    var howManyItemSold = itemInfo.numberOfTimesItemWasSold
    $("#itemTable").append("<tr>" +
        "<td>" + itemID + "</td>" +
        "<td>" + itemName + "</td>" +
        "<td>" + sellBy + "</td>" +
        "<td>" + numberOfStoresSelling + "</td>" +
        "<td>" + averagePrice + "</td>" +
        "<td>" +howManyItemSold + "</td>" +
        "</tr>");
}


function ajaxItemTableData(){
    var zone = GetURLParameter("zonename");
    $.ajax({
        url: GET_ITEM_DATA,
        dataType: 'json',
        data: "zonename=" + zone,
        success: function (itemData){
            updateTable(itemData)
            lodUserUi()
            console.log("table loaded")
        },
        error: function (errorInfo){
            console.log("error while uploading file" + errorInfo)
        }
    })
}

function checkIfCustomer() {
    if (userType === "false")
        return true;
    else
        return false;
}
function lodUserUi(){
    if (checkIfCustomer()){
        loadCustomerUi();
    }
    else{
        loadOwnerUi();
    }
}
function loadCustomerUi(){
    $("#firstBtnText").text("Place an order");
    $("#secondBtnText").text("Rate a store");
    $("#thirdBtnText").text("Your orders");
}
function loadOwnerUi(){
    $("#firstBtnText").text("You store orders");
    $("#secondBtnText").text("Show feedbacks");
    $("#thirdBtnText").text("Open a new store");
}

function updateTable(table){
    $("#tableBody").empty()
    $.each(table || [], updateTableSingleEntry)
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

function ajaxGetStores(){
    var zoneName = GetURLParameter("zonename")
    $.ajax({
        url: GET_STORES_DATA,
        dataType: 'json',
        data: {'zoneName': zoneName},
        success: function (stores){
            $.each(stores || [], addStoresToDropDown)
        }
    })
}

function addStoresToDropDown(index, store){
    $("#storesDropDown").append("<option value=" + store.storeId + ">" + store.storeName + "</option")
}

function ajaxGetStoreItems(storeId){
    $.ajax({
        url: GET_STORE_ITEMS_DATA,
        dataType: 'json',
        data: {'storeId' : storeId},
        success : function (data){
            console.log(data)
        }
    })
}
