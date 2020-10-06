$(document).ready(function() {
    $("#customer").click(function () {
        if($("#customer").prop("checked"))
            $("#store_owner").prop("disabled", true)
        else
            $("#store_owner").prop("disabled", false)
    }),
    $("#store_owner").click(function () {
        if($("#store_owner").prop("checked"))
            $("#customer").prop("disabled", true)
        else
            $("#customer").prop("disabled", false)
    })
})