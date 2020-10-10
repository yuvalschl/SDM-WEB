var maxLength = 2;
var dropdownHappend = false;
var dropdown = "   <select class='btn btn-secondary' id='storesDropDown' name='storesDropDown'>" +
    "         <option id='pickAStore' value='pickAStore'>Pick a store</option>" +
    "          <div class='dropdown-divider'></div>" +
    "   </select>"
$(document).ready(function() {
    $('#x-cor').keyup(function() {
        //this part check if the number is above 0 or under 50
        var val = parseInt($(this).val());
        if(val <1 || val >50)
            $("#warning-label").text("number must be between 1-50");
        else
            $("#warning-label").empty()}

            );
    //this part displays the date
    var date_input=$('input[name="date"]'); //our date input has the name "date"
    var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
    var options={
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true,
    };
    date_input.datepicker(options);

    $('#staticRadioButton').on("click", showDropDown);
    $('#dynamicRadioButton').on("click", hideDropDown);

})
// Data Picker Initialization

function showDropDown() {
       var isRadioBtnOn =$("input[name='orderType']:checked").val();
        if(isRadioBtnOn === "on" && !dropdownHappend){
            dropdownHappend = true;
            $("#dropDownRow").append(dropdown);
        }
}
function hideDropDown() {
    $("#dropDownRow").empty();
    dropdownHappend = false;
}

/*
location must be between 1-50*/
