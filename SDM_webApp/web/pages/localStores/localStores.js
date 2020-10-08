var GET_ITEM_DATA = buildUrlWithContextPath("getItemData")


$(document).ready(function() {
    //initalize the item table
    ajaxItemTableData();
    checkIfClientOrUser()
});

function checkIfClientOrUser() {
    var user = GetURLParameter('customerCB');
    /*if(user.localeCompare("on")){
        return true;
    }
    else{
        return false;
    }*/
}
function loadClientPage() {

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

function ajaxItemTableData(){
    var zone = GetURLParameter('zonename');
    $.ajax({
        url: GET_ITEM_DATA,
        data: "zonename="+zone,
        dataType: 'json',
        success: function (itemData){
            updateTable(itemData)
            console.log("table loaded")
        },
        error: function (errorInfo){
            console.log("error while uploading file" + errorInfo)
        }
    })
}
function ajaxItemTableData(){
    var zone = GetURLParameter('zonename');
    $.ajax({
        url: GET_ITEM_DATA,
        data: "zonename="+zone,
        dataType: 'json',
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
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

