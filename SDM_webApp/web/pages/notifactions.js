var GET_NOTIFICATION = buildUrlWithContextPath("getNotification")
var isNotificationsShown = false
function showNotifications() {
    var notifacionDiv =
        "        <div>\n" +
        "            <label id=\"WatchNewsLabel\">Account - Notifications</label>\n" +
        "            <button id=\"closeNotificationBtn\" style=\"margin-left: 232px;\">X</button>\n" +
        "            <ol class=\"ListForWatchFeedbackOfRide\">\n" +
        "                <textarea readonly id=\"TextWatchNews\" name=\"TextWatchNews\" placeholder=\"There are currently no notifications\" rows=\"7\" cols=\"50\"></textarea>\n" +
        "            </ol>\n" +
        "            <label id=\"newNotificationLabel\">You got a new notification !</label>\n" +
        "        </div>"
    $('#WatchNews').append(notifacionDiv);
    $(document).on('click', '#closeNotificationBtn', function(){
        $('#WatchNews').empty()
        isNotificationsShown = false
    });

}

function ajaxGetNotifactions() {

    $.ajax({
        url: GET_NOTIFICATION,
        dataType: 'json',
        success : function (notification){
            if(!isNotificationsShown && notification.length !==0){
                showNotifications()
                isNotificationsShown = true
            }
            presentNotifications(notification)
        },
        error: function (errorInfo){
            console.log("Yuval schloser")
        }
    })
}
function presentNotifications(notification) {
    if(notification.length !== 0){
        $.each(notification || [], updateNotificationBox)
    }
}
function updateNotificationBox(index, notification) {
   var msgToAdd = notification.msg
   $('#TextWatchNews').append(msgToAdd)
}