const GET_FEEDBACK_URL = buildUrlWithContextPath("getOwnerFeedbacks")
const GET_STORES_FROM_ZONE = buildUrlWithContextPath("getStoresFromZone")
const zone = 'Hasharon' //TODO: remove this


$(document).ready(function (){
    getOwnerStoresFromZone()

    $(document).on('change', "#storesDropDown", function (){
        var currentStoreId = $(this).children(":selected").prop("value");
        $("#commentsSection").empty()
        getStoreFeedbacks(currentStoreId)
    })
})

function addCard(index, feedback){
    var name = feedback.userName
    var rating = "☆".repeat(feedback.rating)
    var text = feedback.feedback
    var data = feedback.date
    $("#commentsSection").append("" +
    "<div class=\"d-flex flex-row comment-row m-t-0\">" +
        "<div class=\"comment-text w-100\">" +
            "<h6 class=\"font-medium\">Name: " + name + "</h6> <span class=\"m-b-15 d-block\">Feedback: " + text + "</span>" +
            "<label>Rating: </label>" +
            "<span class=\"rating\">" + rating + "</span>" +
            "<div class=\"comment-footer\"> <span class=\"text-muted float-right\">" + data + "</span></div>" +
        "</div>" +
    "</div>" +
    "<hr class='solid'>")
}

function getOwnerStoresFromZone(){
    $.ajax({
        url: GET_STORES_FROM_ZONE,
        data: {'zone': zone},
        success: function (data){
            allOrders = data
            $.each(data, addStoresToDropDown)
        },
        error: function (){
            console.log('error in get order history servlet')
        }
    })
}

function getStoreFeedbacks(storeId){
    $.ajax({
        url: GET_FEEDBACK_URL,
        dataType: 'json',
        data: {'storeId': storeId, 'zone': zone},
        success: function (data) {
            $.each(data || [], addCard)
        }
    })
}

function addStoresToDropDown(index, store){
    $("#storesDropDown").append("<option value=" + store.storeId + ">" + store.storeName + "</option")
}
