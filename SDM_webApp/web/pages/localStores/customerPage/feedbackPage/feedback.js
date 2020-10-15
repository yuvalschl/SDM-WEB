const GET_STORES_BY_ID = buildUrlWithContextPath("getStoresById")
const SEND_FEEDBACK_URL = buildUrlWithContextPath("sendFeedback")
const stores = '1 2 3'
const zone = 'Hasharon'

$(document).ready(function () {
    getStoresById()
    $("#backToMainPage").on('click', goToMainPage)
    $(document).on('click', '.addFeedback', addFeedback)
})

function buildStoreCards(orderStores){
    $.each(orderStores || [] , addCard)
}

function addCard(index, store){
    var storeName = store.storeName
    var storeId = store.storeId
    $("#cardsContainer").append("<div class=\"row\">\n" +
        "    <div class=\"col-10\">\n" +
        "        <div class=\"comment-box ml-2\">\n" +
        "            <h4>Add a comment on: " + storeName + "</h4>" +
        "            <div class=\"rating\"><input type=\"radio\" name='rating" + storeId +  "' value=\"5\" id=\'5" + storeId + "'><label for=\'5" + storeId + "'>☆</label> <input type=\"radio\" name='rating" + storeId +  "' value=\"4\" id='4" + storeId + "'><label for=\'4" + storeId + "'>☆</label> <input type=\"radio\" name='rating" + storeId +  "' value=\"3\" id=\'3" + storeId + "'><label for=\'3" + storeId + "'>☆</label> <input type=\"radio\" name='rating" + storeId +  "' value=\"2\" id=\'2" + storeId + "'><label for=\'2" + storeId + "'>☆</label> <input type=\"radio\" name='rating" + storeId +  "' value=\"1\" id=\'1" + storeId + "'><label for=\'1" + storeId + "'>☆</label> </div>\n" +
        "            <div class=\"comment-area\"> <textarea class=\"form-control\" placeholder=\"what is your view?\" rows=\"4\" id='textArea" + storeId + "'></textarea> </div>\n" +
        "            <div class=\"comment-btns mt-2\">\n" +
        "            <div class=\"pull-right\"> <button class=\"btn btn-success send btn-sm addFeedback\" id='addFeedback" + storeId + "'>Send <i class=\"fa fa-long-arrow-right ml-1\"></i></button> </div>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>\n" +
        "</div>" +
        "<hr class='solid'>")
}

function getStoresById(){
    $.ajax({
        url: GET_STORES_BY_ID,
        dataType: 'json',
        data:{'orderStores': stores, "zoneName": "Hasharon"},
        success: function (stores){
            buildStoreCards(stores)
        }
    })
}

function addFeedback(){
    var buttonPressed = $(this)
    var storeId = $(this).attr('id'); // $(this) refers to button that was clicked
    storeId = storeId.replace( /^\D+/g, '')//this takes only the id number from the
    var feedback = $("#textArea" + storeId).val()
    var radioName = "rating" + storeId
    var rating = $("input[name=" + radioName +"]:checked").val();
    var date = GetURLParameter("date")
    $.ajax({
        url: SEND_FEEDBACK_URL,
        data: {'feedback' : feedback, 'rating' : rating, 'zoneName': zone, 'store': storeId, 'date': date},
        type : 'POST',
        success:function (){
            buttonPressed.attr('disabled', true)
        }
    })
}

function goToMainPage(){
    window.location= "/SDM/pages/localStores/localStores.html?zonename=" + zone
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