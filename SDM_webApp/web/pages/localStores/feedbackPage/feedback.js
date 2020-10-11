const GET_STORES_BY_ID = buildUrlWithContextPath("getStoresById")
const stores = '1 2 3'

$(document).ready(function () {
    getStoresById()
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
        "            <div class=\"rating\"> <input type=\"radio\" name='rating" + storeId +  " value=\"5\" id=\"5\"><label for=\"5\">☆</label> <input type=\"radio\" name=\"rating\"" + storeId +  " value=\"4\" id=\"4\"><label for=\"4\">☆</label> <input type=\"radio\" name=\"rating\"" + storeId +  " value=\"3\" id=\"3\"><label for=\"3\">☆</label> <input type=\"radio\" name=\"rating\"" + storeId +  " value=\"2\" id=\"2\"><label for=\"2\">☆</label> <input type=\"radio\" name=\"rating\"" + storeId +  " value=\"1\" id=\"1\"><label for=\"1\">☆</label> </div>\n" +
        "            <div class=\"comment-area\"> <textarea class=\"form-control\" placeholder=\"what is your view?\" rows=\"4\"></textarea> </div>\n" +
        "            <div class=\"comment-btns mt-2\">\n" +
        "            <div class=\"pull-right\"> <button class=\"btn btn-success send btn-sm\">Send <i class=\"fa fa-long-arrow-right ml-1\"></i></button> </div>\n" +
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
