var USER_DATA_URL = buildUrlWithContextPath("userdata");

$(document).ready(function (){
    $.ajax({
        url: USER_DATA_URL,
        dataType: JSON,
        success(userData){
            $("#nameTag").text(userData.name);
            $("#typeTag").text(userData.type)
            console.log("set user name to " + userData.name);
            console.log("set user type to " + userData.type);
        }
    })
});