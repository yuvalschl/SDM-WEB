var GET_ITEM_DATA = buildUrlWithContextPath("getItemData")

var pickedup;

$(document).ready(function() {
    $( "#sourcetable tbody tr" ).on( "click", function( event ) {

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
    $("#zoneTable").append("<tr>" +
        "<td>" + itemID + "</td>" +
        "<td>" + itemName + "</td>" +
        "<td>" + sellBy + "</td>" +
        "<td>" + numberOfStoresSelling + "</td>" +
        "<td>" + averagePrice + "</td>" +
        "<td>" +howManyItemSold + "</td>" +
        "</tr>");
}

function ajaxZoneTableData(){
    $.ajax({
        url: GET_ZONE_DATA,
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

