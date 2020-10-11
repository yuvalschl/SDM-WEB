const LOGIN_ERROR_SERVLET_URL = buildUrlWithContextPath("loginError")
const LOGIN_PAGE_URL = "../signup/signup.html"

$(document).ready(function() {
    $.ajax({
        url: LOGIN_ERROR_SERVLET_URL,
        dataType: 'json',
        success: function (response){
            var user = response.userName
            var e = response.errorMsg
            var i = 5
            $("#userName").text(user)
            setInterval(function (){
                if (i < 0){
                    window.location = LOGIN_PAGE_URL
                }
                $("#seconds").text(i)
                i--
                console.log(i)
            },1000)
        }
    })
})