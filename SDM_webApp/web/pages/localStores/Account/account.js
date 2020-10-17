const DEPOSIT= buildUrlWithContextPath("deposit")
const GET_ACCOUNT= buildUrlWithContextPath("getAccount")

var isOwner = decodeURI(GetURLParameter("userType"))

$(document).ready(function() {
    ajaxGetAccount()
    presentDeposit()
    setInterval(ajaxGetAccount, 2000)
    $('#datepicker').datepicker({
        uiLibrary: 'bootstrap4'
    });
    $('#depositBtn').on("click", deposit)
})

function deposit() {
   var date = $('#datepicker').val();
   var amountToDeposit = $('#depositText').val();
    amountToDeposit = parseFloat(amountToDeposit)
   if(!isNaN(amountToDeposit) && date !==""){
       $.ajax({
           url: DEPOSIT,
           dataType: 'json',
           data: {'date': date, 'amount':amountToDeposit},
           success: function (balance){
               console.log("request was good assss bro")
               showBalance(balance)
           },
           error : function (){
               console.log("dani zion")
           }
       })
   }
}
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
            //presentDeposit(isOwner)
        },
        error : function (){
            console.log("dani zion")
        }
    })
}

function presentDeposit() {
    if(isOwner !== "true"){
        var rowToAppend = " <div class=\"bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold row\" style=\"width: 700px;margin-left: 290px;margin-bottom: 20px;\">\n" +
            "                                <div class=\"col2\">\n" +
            "                                    <ul style=\"margin-bottom: 0px;padding-left: 0px;\">Deposit money to account:</ul>\n" +
            "                                </div>\n" +
            "                                <div class=\"col2\">\n" +
            "                                    <input  id=\"depositText\" style=\"border-radius: 1rem;padding-left: 10px; ;margin-left: 1px;width: 96px; border: none;\">\n" +
            "                                    <button type=\"button\" id=\"depositBtn\" class=\"btn btn-primary btn-sm\" style=\"width: 53px; padding-left: 1px;padding-right: 1px;padding-top: 0px; padding-bottom: 0px;border-bottom-width: 0px;border-top-width: 0px;border-left-width: 0px;border-right-width: 0px;\">deposit</button>\n" +
            "                                </div>\n" +
            "                                <div class=\"col2\">\n" +
            "                                    <span style=\"margin-left: 5px\">Date: </span>\n" +
            "                                    <input id=\"datepicker\" width=\"276\" readonly=\"true\" style=\"border: none\"/>\n" +
            "                                </div>\n" +
            "                            </div>"
        $("#deposit").append(rowToAppend)
    }
}

function CreateTable(balance) {
    showBalance(balance)
    $("#actionTable").empty()
    $.each(balance.balanceActions || [], appendRowToActionTable)
}
function showBalance(balance) {
    var currBalance = balance.balance
    $('#balance').text(currBalance.toFixed(2))
}
function appendRowToActionTable(index, action) {

    var beforeAction = action.balanceBeforeAction.toFixed(2)
    var afterAction = action.balanceAfterAction.toFixed(2)
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
        "                        <td class='align-middle'>"+amount.toFixed(2)+"</td>" +
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