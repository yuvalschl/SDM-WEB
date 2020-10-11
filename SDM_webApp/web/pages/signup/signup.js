var boxChecked = false;
var nameEntered = false
$(document).ready(function() {
    //disables the submit butte while there is no text
    $(':input[type="submit"]').prop('disabled', true);
    $('input[type="text"]').keyup(function() {
        if($(this).val() != '') {
            nameEntered = true;

        }
        else{
            nameEntered = false;
            $(':input[type="submit"]').prop('disabled', true);
        }
        if(nameEntered && boxChecked){
            $(':input[type="submit"]').prop('disabled', false);
        }
    });

    $("#customer").click(function () {
        if($("#customer").prop("checked")){
            $("#store_owner").prop("checked", false);
            $("#store_owner").prop("disabled", true)//disable owner checkBox
            boxChecked =true
            if(nameEntered){
                $(':input[type="submit"]').prop('disabled', false);
            }
            else{
                $(':input[type="submit"]').prop('disabled', true);
            }
        }
        else{
            $("#store_owner").prop("disabled", false)
            boxChecked =false
            $(':input[type="submit"]').prop('disabled', true);
        }
    }),
    $("#store_owner").click(function () {
        if($("#store_owner").prop("checked")){
            $("#customer").prop("checked", false);
            $("#customer").prop("disabled", true)
            boxChecked =true
            if(nameEntered){
                $(':input[type="submit"]').prop('disabled', false);
            }
            else{
                $(':input[type="submit"]').prop('disabled', true);
            }
        }
        else{
            $("#customer").prop("disabled", false)
            boxChecked =false
            $(':input[type="submit"]').prop('disabled', true);

        }
    })
})