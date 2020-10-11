const LOGIN_ERROR_SERVLET_URL = buildUrlWithContextPath("loginError")

$(document).ready(function() {
    $.ajax({
        url: LOGIN_ERROR_SERVLET_URL,
        dataType: 'json',
        success: function (userName, userName2, error){
            var user = userName
            var user2 = userName2
            var e = error
        }
    })
})