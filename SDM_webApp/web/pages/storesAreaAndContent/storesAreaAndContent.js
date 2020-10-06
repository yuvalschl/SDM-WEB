var USER_DATA_URL = buildUrlWithContextPath("userData");
var refreshRate = 2000; //milli seconds

$(document).ready(function (){
    setInterval(ajaxUsersList, refreshRate);
    $("#uploadButton").on("click", function (event){
        console.log("aaaa")
    })
});

function updateUsersList(entries) {
    // add the relevant entries
    $.each(entries || [], addToUsersList);
}

function addToUsersList(index, entry){
    var entryElement = entry.name + entry.isOwner
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


