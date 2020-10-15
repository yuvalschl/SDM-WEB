const GET_FEEDBACKS_URL = buildUrlWithContextPath("getOwnerFeedbacks")
const zone = 'Hasharon' //TODO: remove this


$(document).ready(function (){
    addFeedbackCards()
})

function addCard(index, store){
    $("#commentsSection").append("" +
    "<div class=\"d-flex flex-row comment-row m-t-0\">" +
        "<div class=\"comment-text w-100\">" +
            "<h6 class=\"font-medium\">user name</h6> <span class=\"m-b-15 d-block\">Comment</span>" +
            "<label class=\"rating\">☆</label>" +
            "<div class=\"comment-footer\"> <span class=\"text-muted float-right\">Date</span></div>" +
        "</div>" +
    "</div>")
}

function addFeedbackCards() {
    $.ajax({
        url: GET_FEEDBACKS_URL,
        data: {'zone': zone}
    })

}
