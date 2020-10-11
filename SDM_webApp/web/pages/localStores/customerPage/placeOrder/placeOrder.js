var maxLength = 2;
var btnsID =0;
var dropdownHappend = false;
var xCoordinateValid = false
var yCoordinateValid = false
var pickedDate = false;
var dropdown = "   <select class='btn btn-secondary' id='storesDropDown' name='storesDropDown'>" +
    "         <option id='pickAStore' value='pickAStore'>Pick a store</option>" +
    "          <div class='dropdown-divider'></div>" +
    "   </select>"
var StoresToPresentInDropDown
const GET_ALL_STORES_DATA = buildUrlWithContextPath("getStoresData")
const GET_ITEM_DATA = buildUrlWithContextPath("getItemNamePriceAndID")
var isDynamicOrder =true


$(document).ready(function() {
    $('#x-cor').keyup(function() {
        //this part check if the number is above 0 or under 50
        var val = parseInt($(this).val());
        if(isNaN(val) ){
            disableSubmitBtn()
            xCoordinateValid = false;
        }
        else{
            if(val <1 || val >50)
                $("#warning-label").text("number must be between 1-50");
            else {
                $("#warning-label").empty()
                xCoordinateValid = true;
                if (isCoordinateValid())
                    enableSubmitBtn()
            }
        }

        }
            );

    $('#y-cor').keyup(function() {
            //this part check if the number is above 0 or under 50
            var val = parseInt($(this).val());
            if(isNaN(val) ){
                disableSubmitBtn()
                yCoordinateValid = false;
            }
            else{
                if(val <1 || val >50){
                    $("#warning-label").text("number must be between 1-50");

                }
                else {
                    $("#warning-label").empty()
                    yCoordinateValid = true;
                    if (isCoordinateValid())
                        enableSubmitBtn()
                }
            }

        }
    );
    $('#datepicker').datepicker({
        uiLibrary: 'bootstrap4'
    });   //this function displays the date

    $('#datepicker').on("keyup change", function (){//listen to the event of picking a date
        if($('#datepicker').length){
            pickedDate =true;
            enableSubmitBtn()
        }
    else
            pickedDate = false
            disableSubmitBtn()
    })

    $('#submitOrder').attr("disabled", true);
    disableSubmitBtn()
    ajaxItemTableData();    //this loads all the items in the zone to the table
    $('#dynamicRadioButton').prop("checked", true);
    $('#staticRadioButton').on("click", showDropDown);
    $('#dynamicRadioButton').on("click", hideDropDown);
    ////


    $(document).on('click', '.addBtn', function(){
        var rowID = $(this).attr('id'); // $(this) refers to button that was clicked
        rowID= rowID.replace( /^\D+/g, '')//this takes only the id number from the string
        updateCart(rowID)
    }
    );

})

function isCoordinateValid() {
    if(yCoordinateValid && xCoordinateValid){
        $("#warning-label").empty()
        return true;
    }
    else{
        disableSubmitBtn()
    }
}
function disableSubmitBtn(){
    $('#submitOrder').css("background-color", "gray");
}

function enableSubmitBtn() {
    if(pickedDate && xCoordinateValid && yCoordinateValid){
        $('#submitOrder').attr("disabled", false);
    $('#submitOrder').css("color"," #fff");
    $('#submitOrder').css("background-color","#007bff");
    $('#submitOrder').css("border-color","  #007bff");
    }
}

function updateCart(rowID, isPartOfSale) {
    var itemName =  $("#tableRow" + rowID ).find('td')[1].textContent
    var itemID = $("#tableRow" + rowID ).find('td')[0].textContent
    var inputID = "#amountInput"+rowID
    var itemAmount = $(inputID).val()
    var cartRowClass;
    if(isPartOfSale){
        cartRowClass = "class = partOfSale"
    }
    if(!checkIfItemExistInCart(itemID)){
        var cartTableRowId = "id = cartRowItemId"+itemID
        var rowToAppend =      "<tr "+cartTableRowId+">" +
            "<td >" + itemName + "</td>" +
            "<td>" + itemAmount + "</td>"
            +"</tr>";
        $("#cartTable").append(rowToAppend)
    }
    else
        addToCartAmount(itemID, itemAmount)

}

function addToCartAmount(itemID, amountToAddString) {
    var cartTableRowId= "#cartRowItemId"+itemID
    var currAmountString =  $(cartTableRowId).find('td')[1].textContent
    var amountToAdd = parseInt(amountToAddString)
    var currAmount = parseInt(currAmountString)
    amountToAdd += currAmount;
    $(cartTableRowId).find('td')[1].innerHTML =amountToAdd;
}

function checkIfItemExistInCart(itemID) {

    if($("#cartRowItemId"+itemID).length)
        return true
    else
        return false;


}

function showDropDown() {
       var isRadioBtnOn =$("input[name='orderType']:checked").val();
        if(isRadioBtnOn === "on" && !dropdownHappend){
            dropdownHappend = true;
            $("#dropDownRow").append(dropdown);
            ajaxGetStores()
        }
}
function hideDropDown() {
    $("#dropDownRow").empty();
    dropdownHappend = false;
}

function ajaxGetStores(){
    var zoneName = GetURLParameter("zonename")
    $.ajax({
        url: GET_ALL_STORES_DATA,
        dataType: 'json',
        data: {'zoneName': zoneName},
        success: function (stores){
            $.each(stores || [], addStoresToDropDown)
        },
        error : function (){
            console.log("dani zion")
        }
    })
}

function ajaxItemTableData(){
    var zone = GetURLParameter("zonename");
    $.ajax({
        url: GET_ITEM_DATA,
        dataType: 'json',
        data: "zonename=" + zone,
        success: function (itemData){
            updateTable(itemData)
            console.log("table loaded")
        },
        error: function (errorInfo){
            console.log("error while uploading file" + errorInfo)
        }
    })
}
function updateTable(table){
    $("#tableBody").empty()
    $.each(table || [], updateTableSingleEntry)
}

function updateTableSingleEntry(index, zoneInfo){
    btnsID++
    var StringbtnID = "btnID"+btnsID.toString()
    var stringRowID = "tableRow"+btnsID.toString()
    var nameColID = "nameOfProd"+btnsID.toString()
    var stringAmountInput ="amountInput"+btnsID.toString()
    var addToCartBtn
    var itemName = zoneInfo.itemName
    var itemPrice = zoneInfo.price
    var ID = zoneInfo.itemID
    var rowToAppend = "<tr"+ " id ="+ "\"" + stringRowID+ "\"" +" >" +
        "<td>" + ID + "</td>" +
        "<td"+ " id ="+ "\"" + nameColID+ "\"" +">" + itemName + "</td>";
    /*if (!isDynamicOrder){//TODO: this if is not good
        addToCartBtn ="<input class=\"btn btn-primary addBtn  float-right\" type=\"button\" value=\"Add\">\n" +
        "<input  type=\"number\" maxlength=\"2\"  name=\"username\" class=\"form-control float-right amountText\">";
        rowToAppend + "<td>" + itemPrice + addToCartBtn+ "</td>"
    }*/
    addToCartBtn ="<input class=\"btn btn-primary addBtn   float-right\"" +
        " id ="+ "\"" + StringbtnID+ "\""
        +" type=\"button\" value=\"Add\">\n" +
        "<input"+ " id ="+ "\"" + stringAmountInput+ "\"" +"  type=\"number\" maxlength=\"2\"  name=\"username\" class=\"form-control float-right amountText\">";
    rowToAppend += "<td>" + addToCartBtn + "</td>";

    rowToAppend+"</tr>";
    $("#itemTable").append(rowToAppend);
}

function addStoresToDropDown(index, store){
    $("#storesDropDown").append("<option value=" + store.storeId + ">" + store.storeName + "</option")
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
/*
location must be between 1-50*/
