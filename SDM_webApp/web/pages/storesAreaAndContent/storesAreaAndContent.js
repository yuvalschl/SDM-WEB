var USER_DATA_URL = buildUrlWithContextPath("userData")
var UPLOAD_FILE_URL = buildUrlWithContextPath("uploadFile")
var GET_ZONE_DATA = buildUrlWithContextPath("getZoneData")
var GET_CURRENT_USER = buildUrlWithContextPath("getCurrentUser")
var refreshRate = 3000; //milli seconds
var userName
var isOwner
var pickedUp //the zone selected

$(document).ready(function (){
    ajaxGetNotifactions()//taken from the notification script
    ajaxGetAllUsers()
    ajaxZoneTableData()
    setInterval(ajaxGetAllUsers, refreshRate);
    setInterval(ajaxZoneTableData, refreshRate);
    getCurrentUser()

    /**
     * update the file name in the label after a file is chosen
     */
    $("#fileChooser").on("change", function (){
        $("#fileChooserLabel").text($("#fileChooser").val())
    })


    $( "#zoneTable").on( "click", "tr", function( event ) {


        // get back to where it was before if it was selected :
        if (pickedUp != null) {
            $("#"+pickedUp).find('input[type=radio]').prop('checked', false);
        }
        $(this).find('input[type=radio]').prop('checked', true);
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
            removeUpload()
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
    $("#zoneTable").append("<tr id=" + zoneId + " >" +
        "<td><input type='radio' name='zoneRadios' id=" + zoneId + "radio" + "/></td>" +
        "<td>" + ownerName + "</td>" +
        "<td>" + zoneName + "</td>" +
        "<td>" + amountOfItems + "</td>" +
        "<td>" + amountOfStores + "</td>" +
        "<td>" + amountOfOrders + "</td>" +
        "<td>" + averagePriceOfOrders + "</td>" +
        "</tr>");
    $("#"+pickedUp).find('input[type=radio]').prop('checked', true);
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
function addToUsersTable(index, entry){
    var isOwner = entry.isOwner ? 'Owner' : 'Customer'
    var name = entry.name
    $("#usersTable").append("<tr>" +
        "<td>" + name + "</td>" +
        "<td>" + isOwner + "</td>" +
        "</tr>")
}

/**
 * updates the user list every refreshRate
 * @param entries = all the users info
 */
function updateUsersTable(entries) {
    $("#usersTable > tbody").empty()
    // add the relevant entries
    $.each(entries || [], addToUsersTable);
}

function ajaxGetAllUsers() {
    $.ajax({
        url: USER_DATA_URL,
        dataType: 'json',
        success: function(users) {
            updateUsersTable(users);
        },
    });
}

/**
 * returns a json with fileds:
 * isOwner
 * userName
 * and updates global variables
 */
function getCurrentUser(){
    $.ajax({
        url: GET_CURRENT_USER,
        dataType: 'json',
        success : function (user){
            userName = user.userName
            isOwner = user.isOwner
            if(isOwner === 'true'){
                addUploadFileWindow()
                $("#userNameText").text(userName);
            }
        }
    })
}

function addUploadFileWindow(){
    $("#uploadFileSpan").append("<h3>Store owner?</h3>\n" +
        "<h4>you can have your own zone</h4><div class='file-upload'>\n" +
        "<button class='file-upload-btn' type='button' onclick='uploadFile()'>Upload file</button>\n" +
        "<div class='image-upload-wrap'>\n" +
        "<input class='file-upload-input' type='file' onchange='readURL(this)' id='fileChooser' style='left: 0px' />\n" +
        "<div class='drag-text'>\n" +
        "<h3>Drag and drop a file or click here</h3>\n" +
        "</div>\n" +
        "</div>\n" +
        "<div class='file-upload-content'>\n" +
        "<div class='image-title-wrap'>\n" +
        "<button type='button' onclick='removeUpload()' class='remove-image'>Remove <span class='image-title'>Uploaded file</span></button>\n" +
        "</div>\n" +
        "</div>\n" +
        " </div>")
}

/**
 * the on click for the next page button
 * pass the zone name
 */
function nextPage(){
    if(pickedUp !== undefined){
        var zoneName = $("#" + pickedUp).find('td')[2].textContent
/*        zoneName = zoneName.replace(/\s+/g, '') //removes the spces from the zone name*/
        window.location= "/SDM/pages/localStores/localStores.html?zonename=" + zoneName
    }
}

function readURL(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function(e) {
            $('.image-upload-wrap').hide();

           /* $('.file-upload-image').attr('src', e.target.result);*/
            $('.file-upload-content').show();

            $('.image-title').html(input.files[0].name);
        };

        reader.readAsDataURL(input.files[0]);

    } else {
        removeUpload();
    }
}

function removeUpload(){
    $("#uploadFileSpan").empty()
    addUploadFileWindow()
}


