var USER_DATA_URL = buildUrlWithContextPath("userData");
var UPLOAD_FILE_URL = buildUrlWithContextPath("uploadFile")
var refreshRate = 2000; //milli seconds

$(document).ready(function (){
    setInterval(ajaxUsersList, refreshRate);

    /*$("#uploadButton").on("click", function (){
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
            success : function (){
                console.log("file uploaded")
            },
            error : function (message){
                console.log("error while uploading file: " + message)
            }
        })
    })*/
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
        success : function (){
            console.log("file uploaded")
        },
        error : function (message){
            console.log("error while uploading file: " + message)
        }
    })
}

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


