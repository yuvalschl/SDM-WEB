var USER_DATA_URL = buildUrlWithContextPath("userData")
var UPLOAD_FILE_URL = buildUrlWithContextPath("uploadFile")
var GET_ZONE_DATA = buildUrlWithContextPath("getZoneData")
var refreshRate = 1000; //milli seconds
var pickedUp

$(document).ready(function (){
    setInterval(ajaxUsersList, refreshRate);
    setInterval(ajaxZoneTableData, refreshRate);

    /**
     * update the file name in the label after a file is chosen
     */
    $("#fileChooser").on("change", function (){
        $("#fileChooserLabel").text($("#fileChooser").val())
    })

    /**
     * chenges the selected row color
     * saves the selected row id in pickUp var
     */
    $( "#zoneTable").on( "click", "tr", function( event ) {
        // get back to where it was before if it was selected :
        if (pickedUp != null) {
            $("#"+pickedUp).css( "background-color", "#f8f9fa");
        }
/*        var buttonText = $(this).find("td").eq(1).html()
        $("#nextButton").html(buttonText);*/
        $(this).css( "background-color", "#17a2b8");
        pickedUp = $(this).attr("id")
    });
});


/**
 * this is the on click method for the upload file button
 */
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
 * @param zoneInfo
 */
function updateTableSingleEntry(index, zoneInfo){
    var ownerName = zoneInfo.zoneOwner
    var zoneName = zoneInfo.zoneName
    var amountOfItems = zoneInfo.amountOfItemTypes
    var amountOfStores = zoneInfo.amountOfStores
    var amountOfOrders = zoneInfo.amountOfOrders
    var averagePriceOfOrders = zoneInfo.averagePriceOfOrders
    var zoneId = zoneName.replace(/\s+/g, '')
    $("#zoneTable").append(
        "<tr id=" + zoneId + ">" +
        "<td>" + ownerName + "</td>" +
        "<td>" + zoneName + "</td>" +
        "<td>" + amountOfItems + "</td>" +
        "<td>" + amountOfStores + "</td>" +
        "<td>" + amountOfOrders + "</td>" +
        "<td>" + averagePriceOfOrders + "</td>" +
        "</tr>");
    $("#"+pickedUp).css( "background-color", "#17a2b8");
}

/**
 *
 * @param table = all the zone table rows
 */
function updateTable(table){
    var value = $("input[name=radios]:checked")[0]
    $("#tableBody").empty()
    $.each(table || [], updateTableSingleEntry)
}

/**
 * get all the table info every refreshRate
 */
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

/**
 * appends the user to the user list
 * @param index = id of the user
 * @param entry = user info
 */
function addToUsersList(index, entry){
    var isOwner = entry.isOwner ? 'Owner' : 'Customer'
    var entryElement = entry.name + isOwner
    $("#userslist").append(entryElement).append("<br>");
}

/**
 * updates the user list every refreshRate
 * @param entries = all the users info
 */
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



/**
 * the on click for the next page button
 * pass the zone name
 */
function nextPage(){
/*    $.redirect("/SDM/pages/localStores/localStores.html", {zoneName : pickedUp}, "POST", "MoveToZonePageServlet")*/
    window.location= "/SDM/pages/localStores/localStores.html?zonename=" + pickedUp
}


