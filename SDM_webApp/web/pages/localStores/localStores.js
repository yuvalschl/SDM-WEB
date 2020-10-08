const GET_ITEM_DATA = buildUrlWithContextPath("getItemData");
const GET_STORES_DATA = buildUrlWithContextPath("getStoresData");
$(document).ready(function() {
    ajaxItemTableData();
    ajaxGetStores();

    $(document).on('change', ".btn btn-secondary[name=storesDropDown]", function(){
        alert($(this).val())
    });

/*    $("#storesDropDown li a").click(function() {
        console.log( $(this).value);
    });*/
});

function checkIfCustomer() {
   /* $.ajax({
        url: GET_ITEM_DATA,
        dataType: 'json',
        data: "zonename=" + zone,
        success: function (itemData){
            updateTable(itemData)
            console.log("table loaded")
        },
        error: function (errorInfo){
            console.log("error while uploading file" + errorInfo)
        }
    })*/
}
function updateTableSingleEntry(index, itemInfo){
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

function ajaxGetUser(){

}
function ajaxItemTableData(){
    var zone = GetURLParameter("zonename");
    $.ajax({
        url: GET_ITEM_DATA,
        dataType: 'json',
        data: "zonename=" + zone,
        success: function (itemData){
            updateTable(itemData)
            console.log("table loaded")
        },
        error: function (errorInfo){
            console.log("error while uploading file" + errorInfo)
        }
    })
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
    $("#storesDropDown").append("<option>" + store.storeName + "</option")
}

function dropDownOnClick(){
    var i = $(this)
}

