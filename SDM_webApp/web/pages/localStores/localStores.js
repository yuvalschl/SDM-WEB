const GET_ALL_STORES_DATA = buildUrlWithContextPath("getStoresData")
const GET_ITEM_DATA = buildUrlWithContextPath("getItemData")
const GET_STORE_ITEMS_DATA = buildUrlWithContextPath("getStoreItemsData")
const GET_STORE_DATA = buildUrlWithContextPath("getStoreData")
var userName;
var userType;
var zoneName

$(document).ready(function() {
    zoneName = decodeURI(GetURLParameter("zonename"))
    ajaxItemTableData();
    ajaxGetStores();
    setInterval(ajaxGetNotifactions, 2000)
    $(document).on('change', "#storesDropDown", function(){
        var storeId = $(this).children(":selected").prop("value");
        if(storeId !== 'pickAStore'){
            $("#storesDropDown option[value=pickAStore]").remove();
            ajaxGetStoreItems(storeId)
            ajaxGetStoreInfo(storeId)
        }
    });

    $(document).on('click', "#firstBtnText", function(){
        if(checkIfCustomer()){
            placeOrderPage()
        }
        else {
            //store history page
            window.location = "ownerPage/ownerStoresHistory/ownerStoresHistory.html?username=" + userName+"&zonename="+zoneName
        }
    });

    $(document).on('click', "#secondBtnText", function(){
        if(checkIfCustomer()){
        }
        else {
            showFeedbacks()
        }
    });

    $(document).on('click', "#thirdBtnText", function(){
        if(checkIfCustomer()){
            window.location = "customerPage/userOrderHistoryPage/userOrderHistoryPage.html";
        }
        else {
            //add store page
            window.location = "ownerPage/addNewStore/addNewStore.html?username=" + userName+"&zonename="+zoneName
        }
    });

    $(document).on('click', "#account", function(){
        goToAccountPg()
    });
});

function goToAccountPg() {
    window.location = "../localStores/Account/account.html?userType=" +userType;
}

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
    return userType === "false";
}


function lodUserUi(){
    if (checkIfCustomer()){
        loadCustomerUi();
    }
    else{
        loadOwnerUi();
    }
    $("#userNameText").text(userName);

}
function loadCustomerUi(){
    $("#firstBtnText").text("Place an order");
    $("#secondBtnText").text("Rate a store");
    $("#thirdBtnText").text("Your orders");
}
function loadOwnerUi(){
    $("#firstBtnText").text("Your stores orders");
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
    var zone = GetURLParameter("zonename");
    $.ajax({
        url: GET_ALL_STORES_DATA,
        dataType: 'json',
        data: "zonename=" + zone,
        success: function (stores){
            $.each(stores || [], addStoresToDropDown)
        },
        error : function (){
            console.log("dani zion")
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
        data: {'storeId' : storeId, 'zonename' : zoneName},
        success : function (data){
            $("#storeItemsTable > tbody").empty()
            $.each(data || [], updateStoreItemsTable)
        }
    })
}
function placeOrderPage(){
    window.location = "customerPage/placeOrder/placeOrder.html?username=" + userName+"&zonename="+zoneName;
}

function showFeedbacks(){
    window.location = "ownerPage/ownerFeedbacks/ownerFeedbacks.html?username=" + userName+"&zonename="+zoneName
}


/**
 * function to update the items table of a specific store
 * @param item
 */
function updateStoreItemsTable(index, item){

    var id = item.id
    var name = item.name
    var sellBy = item.sellBy
    var pricePerUnit = item.pricePerUnit
    var amountSold = item.amountSold
    $("#storeItemsTable").append("<tr>" +
        "<td>" + id + "</td>" +
        "<td>" + name + "</td>" +
        "<td>" + sellBy + "</td>" +
        "<td>" + pricePerUnit + "</td>" +
        "<td>" + amountSold + "</td>" +
        "</tr>")
}

function ajaxGetStoreInfo(storeId){
    $.ajax({
        url: GET_STORE_DATA,
        dataType: 'json',
        data: {'storeId' : storeId, 'zonename' : zoneName},
        success:function (store){
            updateStoreInfoLabels(store)
        }
    })
}

function updateStoreInfoLabels(store){
    $("#storeNameInfoLabel").text(store.storeName)
    $("#storeIdInfoLabel").text(store.storeId)
    $("#storeOwnerInfoLabel").text(store.storeOwnerName)
    $("#itemsSoldCostInfoLabel").text(store.paymentForItems)
    $("#storeLocationInfoLabel").text(store.x + ',' + store.y)
    $("#storePpkInfoLabel").text(store.PPK)
    $("#orderMadeInfoLabel").text(store.numberOfOrderMade)
    $("#shippingMadeCostInfoLabel").text(store.paymentForShipments)
}
