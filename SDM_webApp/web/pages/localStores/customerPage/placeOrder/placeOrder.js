var maxLength = 2;
var dropdownHappend = false;
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
    ajaxItemTableData();    //this loads all the items in the zone to the table
    $('#dynamicRadioButton').prop("checked", true);
    $('#staticRadioButton').on("click", showDropDown);
    $('#dynamicRadioButton').on("click", hideDropDown);
    ////
    $(".addBtn").click(function() {
        var id = $(this).attr('id'); // $(this) refers to button that was clicked
        var name = $(nameOfProd1).val()
        updateCart(id[id.length-1])
    });

})


function updateCart(id) {
    var itemNameID = "#nameOfProd"+id
    var inputID = "#amountInput"+id
    var itemAmount = $(inputID).val()
    var itemName =$(itemNameID).val()

    var rowToAppend =      "<tr>" +
        "<td>" + itemName + "</td>" +
        "<td>" + itemAmount + "</td>"
                        +"</tr>";
    $("#cartTable").append(rowToAppend)
    console.log("btn ID "+id+" amount "+ $(inputID).val())
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
    var addToCartBtn
    var itemName = zoneInfo.itemName
    var itemPrice = zoneInfo.price
    var ID = zoneInfo.itemID
    var rowToAppend = "<tr>" +
        "<td>" + ID + "</td>" +
        "<td>" + itemName + "</td>";
    /*if (!isDynamicOrder){//TODO: this if is not good
        addToCartBtn ="<input class=\"btn btn-primary addBtn  float-right\" type=\"button\" value=\"Add\">\n" +
        "<input  type=\"number\" maxlength=\"2\"  name=\"username\" class=\"form-control float-right amountText\">";
        rowToAppend + "<td>" + itemPrice + addToCartBtn+ "</td>"
    }*/
    addToCartBtn ="<input class=\"btn btn-primary addBtn  float-right\" type=\"button\" value=\"Add\">\n" +
        "<input  type=\"number\" maxlength=\"2\"  name=\"username\" class=\"form-control float-right amountText\">";
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
