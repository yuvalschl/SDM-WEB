var USER_DATA_URL = buildUrlWithContextPath("userData")
var UPLOAD_FILE_URL = buildUrlWithContextPath("uploadFile")
var GET_ZONE_DATA = buildUrlWithContextPath("getZoneData")
var refreshRate = 2000; //milli seconds

$(document).ready(function (){
    setInterval(ajaxUsersList, refreshRate);
    setInterval(ajaxZoneTableData, refreshRate);
});

function uploadFile(){
    var form = new FormData();
    var files = $("#fileChooser")[0].files[0];
    form.append("file", files)
    $.ajax({
        type: 'POST',
        url: UPLOAD_FILE_URL,
        data: form,
        enctype : 'multipart/form-data',
        contentType : false,
        processData : false,
        success : function (response){
            console.log("file uploaded")
        },
        error : function (message){
            console.log("error while uploading file: " + message)
        }
    })
}


/**
 *
 * recives a zone info json with:
 * zoneOwner
 * zoneName
 * amountOfItemTypes
 * amountOfStores
 * amountOfOrders
 * averagePriceOfOrders
 * @param index
 * @param info
 */
function updateTableSingleEntry(index, zoneInfo){
    var ownerName = zoneInfo.zoneOwner
    var zoneName = zoneInfo.zoneName
    var amountOfItems = zoneInfo.amountOfItemTypes
    var amountOfStores = zoneInfo.amountOfStores
    var amountOfOrders = zoneInfo.amountOfOrders
    var averagePriceOfOrders = zoneInfo.averagePriceOfOrders
    $("#zoneTable").append("<tr>" +
        "<td>" + ownerName + "</td>" +
        "<td>" + zoneName + "</td>" +
        "<td>" + amountOfItems + "</td>" +
        "<td>" + amountOfStores + "</td>" +
        "<td>" + amountOfOrders + "</td>" +
        "<td>" +averagePriceOfOrders + "</td>" +
        "</tr>");
}

function updateTable(table){
    $("#tableBody").empty()
    $.each(table || [], updateTableSingleEntry)
}

function ajaxZoneTableData(){
    $.ajax({
        url: GET_ZONE_DATA,
        dataType: 'json',
        success: function (zoneData){
            updateTable(zoneData)
            console.log("table refreshed")
        },
        error: function (errorInfo){
            console.log("error while uploading file" + errorInfo)
        }
    })
}

function addToUsersList(index, entry){
    var isOwner = entry.isOwner ? 'Owner' : 'Customer'
    var entryElement = entry.name + isOwner
    $("#userslist").append(entryElement).append("<br>");
}

function updateUsersList(entries) {
    $("#userslist").empty()
    // add the relevant entries
    $.each(entries || [], addToUsersList);
}

function ajaxUsersList() {
    $.ajax({
        url: USER_DATA_URL,
        dataType: 'json',
        success: function(users) {
            updateUsersList(users);
        },
    });
}


