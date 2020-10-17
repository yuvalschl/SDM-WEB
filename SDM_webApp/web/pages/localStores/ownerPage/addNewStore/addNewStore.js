const GET_ITEM_DATA = buildUrlWithContextPath("getItemNamePriceAndID")
const ADD_STORE_URL = buildUrlWithContextPath('addStore')
var store
var xCoordinateValid = false
var yCoordinateValid = false
var PPK
var storeName
var zone = decodeURI(GetURLParameter("zonename"))


$(document).ready(function (){
    ajaxItemTableData()
    store = new addStore_store()
    var addStoreButton = $("#addStore")
    addStoreButton.prop("disabled", true);

    $("#PPK").keyup(function () {
        PPK = $("#PPK").val()
        enableSubmitBtn()
    })

    $("#storeName").keyup(function () {
        storeName = $("#storeName").val()
        enableSubmitBtn()
    })

    $('#x-cor').keyup(function() {//add event listener to the x coodrinate
        //this part check if the number is above 0 or under 50
        var val = parseInt($(this).val());
        if(isNaN(val) ){//if the xcor i empety disable submit btn
            disableSubmitBtn()
            xCoordinateValid = false;
        }
        else{
            if(val <1 || val >50) {//pop warning if invalid value
                $("#warning-label").text("number must be between 1-50");
                xCoordinateValid = false
                disableSubmitBtn()
            }
            else {
                $("#warning-label").empty()
                xCoordinateValid = true;
                if (isCoordinateValid())
                    enableSubmitBtn()
            }
        }
    });

    $('#y-cor').keyup(function() {//add event listener to the y coodrinate
            //this part check if the number is above 0 or under 50
            var val = parseInt($(this).val());
            if(isNaN(val) ){//if the ycor i empety disable submit btn
                disableSubmitBtn()
                yCoordinateValid = false;
            }
            else{
                if(val <1 || val >50){//pop warning if invalid value
                    $("#warning-label").text("number must be between 1-50");
                    yCoordinateValid = false
                    disableSubmitBtn()
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
    addStoreButton.on('click', addStore)
})


function ajaxItemTableData(){
    var zone = GetURLParameter("zonename");
    $.ajax({
        url: GET_ITEM_DATA,
        dataType: 'json',
        data: "zonename=" + zone,
        success: function (itemData){
            $.each(itemData || [], function (index, item){
/*                setInputMinVal()*/
                $("#itemTableBody").append("<tr>" +
                    "<td><input class='priceForItem' type=\"checkbox\" name=\"name1\"/></td>" +
                    "<td>" + item.id + "</td>" +
                    "<td>" + item.name + "</td>" +
                    "<td><input type=\"number\" name=\"name1\" onkeyup=\"if(this.value<0){this.value = 0}\"/>" +
            "</tr>")
            })
            console.log("table loaded")
        },
        error: function (errorInfo){
            console.log("error while uploading file" + errorInfo)
        }
    })
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

function addStore(){
    store.ppk = $("#PPK").val()
    store.name = $("#storeName").val()
    store.x = $("#x-cor").val()
    store.y = $("#y-cor").val()

    if(store.inventory.length === 0){
        $("#errorLabel").text('No items in store')
    }

    $("#itemTableBody > tr").each(function () {
        var checked = $(this).children('td').eq(0).find(":checkbox").prop('checked')
        if(checked){
            var id = $(this).children('td').eq(1).text()
            var name = $(this).children('td').eq(2).text()
            var price = $(this).children('td').eq(3).find(":input").val()
            if(price > 0){
                store.inventory.push(new addStoreItem(id, name, price))
            }
            else {
                $("#errorLabel").text("Add a positive price for all the products")
            }
        }
    })
    var dani = JSON.stringify(store.inventory)
    $.ajax({
        url: ADD_STORE_URL,
        type: 'POST',
        data: {'name': store.name, 'ppk': store.ppk, 'x': store.x, 'y': store.y, 'items': dani, 'zone': zone},
        success: function () {
            console.log('store Added')
            window.location= "/SDM/pages/localStores/localStores.html?zonename=" + zone
        },
        error: function () {
            console.log('error in add store servlet')
        }
    })
}

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
    button.attr("disabled", true);
}

function enableSubmitBtn() {
    var button = $('#addStore')
    if(PPK > 0 && xCoordinateValid && yCoordinateValid && storeName){
        button.attr("disabled", false);
    }
    else {
        button.attr("disabled", true);
    }
}