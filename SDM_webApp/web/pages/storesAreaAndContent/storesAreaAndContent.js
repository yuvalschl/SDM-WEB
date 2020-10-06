var USER_DATA_URL = buildUrlWithContextPath("userData");
var refreshRate = 2000; //milli seconds

$(document).ready(function (){
    setInterval(ajaxUsersList, refreshRate);
    $("#uploadButton").on("click", function (event){
        console.log("aaaa")
    })
});

function refreshUsersList(users) {
    //clear all current users
    $("#userslist").empty();

    // rebuild the list of users: scan all users and add them to the list of users
    $.each(users || [], function(index, username, title) {
        console.log("Adding user #" + index + ": " + username + "title:" + title);
        //create a new <option> tag with a value in it and
        //appeand it to the #userslist (div with id=userslist) element
        $('<li>' + username + " " + title + '</li>').appendTo($("#userslist"));
    });
}

function ajaxUsersList() {
    $.ajax({
        url: USER_DATA_URL,
        dataType: JSON,
        success: function(users) {
            refreshUsersList(users);
        },
        error: function (e){
            console.log("falid");
        }
    });
}


