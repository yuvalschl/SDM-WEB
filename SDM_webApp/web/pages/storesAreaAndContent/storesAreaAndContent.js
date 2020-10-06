var USER_NAME_URL = buildUrlWithContextPath("username");

$(document).ready(function (){
    $.ajax({
        url: USER_NAME_URL,
        success(userName){
            $("#nameTag").text(userName);
            console.log("set user name to " + userName);
        }
    })
});