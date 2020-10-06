var USER_DATA_URL = buildUrlWithContextPath("userData");
var UPLOAD_FILE_URL = buildUrlWithContextPath("uploadFile")
var refreshRate = 2000; //milli seconds

$(document).ready(function (){
    setInterval(ajaxUsersList, refreshRate);
    $("#uploadButton").on("click", function (event){
        $.ajax({
            url: UPLOAD_FILE_URL,
            dataType: 'json',
            data: {"file" : $("#fileChooser").val()},
            success : function (fileData){
                console.log(fileData)
            }
        })
    })
});

function updateUsersList(entries) {
    $("#userslist").empty()
    // add the relevant entries
    $.each(entries || [], addToUsersList);
}

function addToUsersList(index, entry){
    var isOwner = entry.isOwner ? 'Owner' : 'Customer'
    var entryElement = entry.name + isOwner
    $("#userslist").append(entryElement).append("<br>");
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


