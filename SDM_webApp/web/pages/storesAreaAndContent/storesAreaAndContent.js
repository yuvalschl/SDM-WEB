var USER_NAME_URL = buildUrlWithContextPath("username");

$(document).ready(function (){
    $.ajax({
        url: USER_NAME_URL,
        dataType: JSON,
        success(userData){
            $("#nameTag").text(userData.name);
            $("#typeTag").text(userData.type)
            console.log("set user name to " + userData.name);
            console.log("set user type to " + userData.type);
        }
    })
});