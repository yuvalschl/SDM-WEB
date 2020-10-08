var GET_ITEM_DATA = buildUrlWithContextPath("getItemData")

var pickedup;

$(document).ready(function() {
    ajaxItemTableData();
    $( "#storesNameTable tbody tr" ).on( "click", function( event ) {

        // get back to where it was before if it was selected :
        if (pickedup != null) {
            pickedup.css( "background-color", "#f8f9fa" );
        }

        $("#fillname").val($(this).find("td").eq(0).html());
        $( this ).css( "background-color", "#a5e3f6" );

        pickedup = $( this );
    });
});

function updateTableSingleEntry(index, itemInfo){
    var itemID = itemInfo.itemdID
    var itemName = itemInfo.itemName
    var sellBy = itemInfo.sellBy
    var numberOfStoresSelling = itemInfo.amountOfStoresSelling
    var averagePrice = itemInfo.averagePrice
    var howManyItemSold = itemInfo.averagePriceOfOrders
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
    $.ajax({
        url: GET_ITEM_DATA,

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
        if (sParameterName[0] === sParam) {
            return sParameterName[1];
        }
    }
}
