const GET_ACCOUNT= buildUrlWithContextPath("getAccount")
var isOwner = decodeURI(GetURLParameter("userType"))

$(document).ready(function() {
    ajaxGetAccount()
})

function ajaxGetAccount() {
   if(isOwner !== "true"){
       isOwner = null
   }
    $.ajax({
        url: GET_ACCOUNT,
        dataType: 'json',
        data: {'isOwner': isOwner},
        success: function (balance){
            console.log("request was good assss bro")
            CreateTable(balance);
        },
        error : function (){
            console.log("dani zion")
        }
    })
}

function CreateTable(balance) {
    var currBalance = balance.balance
    $('#balance').text(currBalance)
    $.each(balance.balanceActions || [], appendRowToActionTable)
}

function appendRowToActionTable(index, action) {
    var beforeAction = action.balanceBeforeAction
    var afterAction = action.balanceAfterAction
    var amount = Math.abs(beforeAction - afterAction)
    var rowToAppend ="      <tr>" +
        "                        <th scope='row'>" +
        "                            <div class='p-2'>" +
        "                                <div class='ml-3 d-inline-block align-middle'>" +
        "                                    <h5 class='mb-0'>"+action.typeOfAction+"</h5>" +
        "                                </div>" +
        "                            </div>" +
        "                        </th>" +
        "                        <td class='align-middle'>"+action.dateOfAction+"</td>" +
        "                        <td class='align-middle'>"+amount+"</td>" +
        "                        <td class='align-middle'>"+beforeAction+"</td>" +
        "                        <td class='align-middle'>"+afterAction+"</td>" +
        "                    </tr>"
    $("#actionTable").append(rowToAppend)
}

function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1];
        }
    }
}