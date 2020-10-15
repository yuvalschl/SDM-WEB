var maxLength = 2;
//var maxItemID;
var btnsID =0;
var store
var xcor
var ycor
var zone = decodeURI(GetURLParameter("zonename"))
var dropdownHappend = false;
var discountDropHappened = false
var xCoordinateValid = false
var yCoordinateValid = false
var pickedDate = false;
var itemHeaderForStaticOrderAdded = false//this variable determine if the price header is added to the items table
var itemHeaderForDynamicOrderAdded = false//this variable determine if the price header is added to the items table
var currentOrder
var availableDiscounts
var availableItems
var currDiscountItem
var currOffers
var dropdown = "   <select class='btn btn-secondary' id='storesDropDown' name='storesDropDown'>" +
    "         <option id='pickAStore' value='pickAStore'>Pick a store</option>" +
    "          <div class='dropdown-divider'></div>" +
    "   </select>"

var StoresToPresentInDropDown
const GET_ALL_STORES_DATA = buildUrlWithContextPath("getStoresData")
const GET_ITEM_DATA = buildUrlWithContextPath("getItemNamePriceAndID")
const GET_STORE_ITEMS_DATA = buildUrlWithContextPath("getStoreItemsData")
const CREATE_ORDER= buildUrlWithContextPath("creatOrder")
const GET_DISCOUNTS_URL = buildUrlWithContextPath("getDiscounts")
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
var isDynamicOrder = true
var showedDiscounts = false

$(document).ready(function() {
    $('#userNameText').text(decodeURI(GetURLParameter("username")))
    currentOrder = new order(0)
    currDiscountItem = new item()
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

    $('#datepicker').datepicker({
        uiLibrary: 'bootstrap4'
    });   //this function displays the date

    $('#datepicker').on("keyup change", function (){//listen to the event of picking a date
        if($('#datepicker').length){
            pickedDate =true;
            enableSubmitBtn()
        }
    else{
            pickedDate = false
            disableSubmitBtn()
    }
    })

    //disable submit btn on load
    $('#submitOrder').attr("disabled", true);
    disableSubmitBtn()

    ajaxItemTableData();    //this loads all the items in the zone to the table
    $('#dynamicRadioButton').prop("checked", true);
    $('#staticRadioButton').on("click", showDropDown);//set a listener to the static order radio button and initalize the items table accordingly
    $('#dynamicRadioButton').on("click", hideDropDown);//set a listener to the static order radio button and initalize the items table accordingly

    $('#submitOrder').on("click", ajaxCreatOrder);//add listner to the submit butten


    $(document).on('click', '.addBtn', function(){
        var rowID = $(this).attr('id'); // $(this) refers to button that was clicked
        rowID= rowID.replace( /^\D+/g, '')//this takes only the id number from the string
        updateCart(rowID, false)
    });

    $(document).on('change', ".discountDropDown", function (){
        $(this).find('option[value=pickAnItem]').remove();
        var rowId = 'row' + $(this).attr('id').slice(8) //generate the row id
        var json = JSON.parse($(this).val()) // $(this) refers to button that was clicked //value is the forAdditional of the discount
        $("#"+rowId).find('td').eq(3).text(json.forAdditional)
        currDiscountItem.amount = json.itemAmount
        currDiscountItem.name = json.itemName
        currDiscountItem.id = json.itemId
        discountDropHappened = true
    })

    $(document).on('click', ".addDiscount", function (){
        var discountName = $(this).attr('id').slice(6)
        discountName.replace(/[^a-zA-Z ]/g, "")
        var storeId = $("#"+'row'+discountName).find('td').eq(0).attr('id')
        var forAdditional = parseInt($("#"+'row'+discountName).find('td').eq(3).text())
        currentOrder._amountAddedByDiscounts += forAdditional//add the for additional to the amount added to order by discounts
        if(availableDiscounts.entitledDiscounts[discountName] <= 0){
            $(this).prop('disabled', true)
        }else {
            availableDiscounts.entitledDiscounts[discountName]--
            if(!discountDropHappened){//if the then you get is all or nothing add all the items offered
                for (var i=0;i<currOffers.length;i++){
                    discountUpdateCart(currOffers[i].amount, currOffers[i].id, currOffers[i].itemName, storeId, forAdditional)
                }
            }else{
                discountUpdateCart(currDiscountItem.amount, currDiscountItem.id,currDiscountItem.name, storeId, forAdditional)
            }


        }
    })

    $(document).on('change', "#storesDropDown", function(){
        var storeId = $(this).children(":selected").prop("value");
        if(storeId !== 'pickAStore'){
            $("#storesDropDown option[value=pickAStore]").remove();
            ajaxGetStoreItems(storeId)
            store = storeId
        }
    });

    $(document).on('click', "#submitOrder", function(){
       // checkForDiscount()
       // goToOrderSummeryPg()
    });

    $(document).on('keypress', ".quantity", function(e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });
})
//end of onload



function addToAvailableItems(index, data) {
    availableItems[data.id] = {
        'id': data.id,
        'name': data.name,
        'price': data.pricePerUnit,
        'sellBy': data.sellBy
    }
}

function ajaxGetStoreItems(storeId){
    isDynamicOrder = false
    var zoneName = decodeURI(GetURLParameter("zonename"))
    $.ajax({
        url: GET_STORE_ITEMS_DATA,
        dataType: 'json',
        data: {'storeId' : storeId, 'zonename' : zoneName},
        success : function (data){
            $("#itemTableBody").empty()
            $.each(data || [], updateTable)
            availableItems = new AvailableItems()
            $.each(data || [], addToAvailableItems)
        },
        error: function (errorInfo){
            console.log("error on getStoreItem ajax call")
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

/*function findDiscountItemIDByName(name) {
    for (var i=0; i<currentOrder.items.length; i++){
        if(currentOrder.items[i].name === name)
            return currentOrder.items[i].id
    }
}*/
function discountUpdateCart(amount, id, name, storeId, forAdditional) {
    var itemAmount = amount
    var itemID = id
    var itemName = name
   // var cartTableRowId = "id = cartRowItemId" + itemID
    if (!checkIfItemExistInCart(itemID, true)) {
        var cartTableRowId = "id = cartRowItemIdDiscount" + itemID
        var rowToAppend = "<tr " + cartTableRowId + ">" +
            "<td >" + itemName + "</td>" +
            "<td>" + itemAmount + "</td>"
            + "</tr>";
        $("#cartTable").append(rowToAppend)
        currentOrder.discountItems[itemID] = new item(itemName, itemID, itemAmount,true,storeId, forAdditional)
    }
    else{
        addToCartAmount(itemID, itemAmount, true)
        currentOrder.discountItems[itemID].addToAmount(itemAmount, forAdditional)

    }
}


function updateCart(rowID, partOfDiscount) {
    var itemName =  $("#tableRow" + rowID ).find('td')[1].textContent
    var itemID = $("#tableRow" + rowID ).find('td')[0].textContent
    var inputID = "#amountInput"+rowID
    var itemAmount = $(inputID).val()
    var cartType = partOfDiscount === true ? currentOrder.discountItems : currentOrder.items
    if(itemAmount !== "0") {
        if (!checkIfItemExistInCart(itemID, false)) {
            var cartTableRowId = "id = cartRowItemId" + itemID
            var rowToAppend = "<tr " + cartTableRowId + ">" +
                "<td >" + itemName + "</td>" +
                "<td>" + itemAmount + "</td>"
                + "</tr>";
            $("#cartTable").append(rowToAppend)
            cartType[itemID] = new item(itemName, itemID, itemAmount, false)
        } else{
            addToCartAmount(itemID, itemAmount,false)
            cartType[itemID].addToAmount(itemAmount)
        }
    }
}

function addToCartAmount(itemID, amountToAddString, isPartOfDiscount) {

    var cartTableRowId
    if(isPartOfDiscount){
        cartTableRowId ="#cartRowItemIdDiscount"+itemID
    }else{
        cartTableRowId = "#cartRowItemId"+itemID
    }
    var currAmountString =  $(cartTableRowId).find('td')[1].textContent
    var amountToAdd = parseFloat(amountToAddString)
    var currAmount = parseFloat(currAmountString)
    amountToAdd += currAmount;
    $(cartTableRowId).find('td')[1].innerHTML =amountToAdd;
}

function checkIfItemExistInCart(itemID, isPartOfDiscount) {
    var rowIdToSearch
    if(isPartOfDiscount){
        rowIdToSearch = "#cartRowItemIdDiscount"
    }
    else {
        rowIdToSearch = "#cartRowItemId"
    }
    if($(rowIdToSearch+itemID).length)
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
            isDynamicOrder = false
        }
}
function hideDropDown() {
    $("#dropDownRow").empty();
    dropdownHappend = false;
    ajaxItemTableData();
}

function ajaxGetStores(){
    var zoneName = decodeURI(GetURLParameter("zonename"))
    $.ajax({
        url: GET_ALL_STORES_DATA,
        dataType: 'json',
        data: {'zonename': zoneName},
        success: function (stores){
            $.each(stores || [], addStoresToDropDown)
        },
        error : function (){
            console.log("dani zion")
        }
    })
}

function ajaxItemTableData(){
    isDynamicOrder = true
    var zone = GetURLParameter("zonename");
    $.ajax({
        url: GET_ITEM_DATA,
        dataType: 'json',
        data: "zonename=" + zone,
        success: function (itemData){
            $.each(itemData || [], updateTable)
            console.log("table loaded")
        },
        error: function (errorInfo){
            console.log("error while uploading file" + errorInfo)
        }
    })
}
function updateTable(index, table){
    if(itemHeaderForStaticOrderAdded && isDynamicOrder){
    $("tr").each(function() {
        $(this).children("td:eq(2)").remove();
    });
    $("th").eq(2).remove()
    btnsID = 0;
    itemHeaderForStaticOrderAdded=false
        isDynamicOrder = true
    }
    updateTableSingleEntryDynamicOrder(table)
}

function updateTableSingleEntryDynamicOrder(itemInfo) {
    btnsID++
    var StringbtnID = "btnID" + btnsID.toString()
    var stringRowID = "tableRow" + btnsID.toString()
    var nameColID = "nameOfProd" + btnsID.toString()
    var stringAmountInput = "amountInput" + btnsID.toString()
    var addToCartBtn
    var itemName = itemInfo.name
    var itemPrice = itemInfo.pricePerUnit
    var ID = itemInfo.id
    var className
    var sellByUnit = itemInfo.sellBy === "UNIT" ? className = "quantity" : className = ""

    var rowToAppend = "<tr" + " id =" + "\"" + stringRowID + "\"" + " >" +
        "<td>" + ID + "</td>" +
        "<td" + " id =" + "\"" + nameColID + "\"" + ">" + itemName + "</td>";
    if (isDynamicOrder) {//if it is a dynamic order set the right col text to price
        itemHeaderForStaticOrderAdded = false;
    }
    else{
        addTableHeaderRow();
        rowToAppend+="<td>"+itemPrice +"</td>"
    }
    addToCartBtn ="<input class=\"btn btn-primary addBtn   float-right\"" +
        " id ="+ "\"" + StringbtnID+ "\""
        +" type=\"button\" value=\"Add\">\n" +
        "<input"+ " id ="+ "\"" + stringAmountInput+ "\"" +"  type=\"number\" min=\"0\" maxlength=\"2\"  name=\"username\" class=\"form-control float-right "+className+"  amountText\">";
    rowToAppend += "<td>" + addToCartBtn + "</td>";
    setInputMinVal()
    rowToAppend+"</tr>";
    $("#itemTableBody").append("");
    $("#itemTableBody").append(rowToAppend);
}

function setInputMinVal(){
    $(function () {
        $("input").keydown(function () {
            // Save old value.
            if (!$(this).val() || ( parseInt($(this).val()) >= 0))
                $(this).data("old", $(this).val());
        });
        $("input").keyup(function () {
            // Check correct, else revert back to old value.
            if (!$(this).val() || ( parseInt($(this).val()) >= 0))
                ;
            else
                $(this).val($(this).data("old"));
        });
    });
}
function addTableHeaderRow() {
    if(!itemHeaderForStaticOrderAdded) {//add the price table header in case that it hadn't been added yet
        $("#itemNameCol").after("<th id= \" priceCol\">Price</th>")
        itemHeaderForStaticOrderAdded = true;
    }
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

function createDiscountSelectionWindow(discounts){
    showedDiscounts = true
    $("#itemTable").empty()
    $("#itemTable").append("<table class=\"table\" id=\"discountTable\">\n" +
        "    <thead>\n" +
        "    <tr>\n" +
        "        <th scope=\"col\">Name</th>\n" +
        "        <th scope=\"col\">Because you bought</th>\n" +
        "        <th scope=\"col\">then you get</th>\n" +
        "        <th scope=\"col\">for additional</th>\n" +
        "        <th scope=\"col\">add to cart</th>\n" +
        "    </tr>\n" +
        "    </thead>\n" +
        "    <tbody id=\"discountTableBody\">\n" +
        "    </tbody>\n" +
        "</table>")
    $.each(discounts || [], addDiscountToTable)
}

function addDiscountToTable(index, discount){
    var name = discount.name
    var storeId = discount.storeId
    //var becauseYouBoughtItemId = discount.ifYouBuy.itemId
    var becauseYouBoughtItemName = discount.ifYouBuy.itemName
    //var becauseYouBoughtItemAmount = discount.ifYouBuy.amount
    var thenYouGet
    var forAdditional = ""
    var discountNameNoSpaces = name.replace(/\s+/g, '') //removes the spces from the zone name
    //TODO: check spelling
    if(discount.thenYouGet.operator === "All or nothing" || discount.thenYouGet.operator === 'irrelevant'){
        thenYouGet = createThenYouGetLabels(discount.thenYouGet)
        forAdditional = discount.thenYouGet.allOffers[0].forAdditional
        currOffers = discount.thenYouGet.allOffers;
        discountDropHappened = false
    }
    else {
        thenYouGet = createThenYouGetDropDown(discount.thenYouGet, name)
    }
    $("#discountTableBody").append("<tr id='row" + discountNameNoSpaces + "'>" +
        "<td id ="+storeId+">" + name + "</td>" +
        "<td>" + becauseYouBoughtItemName + "</td>" +
        "<td>" + thenYouGet + "</td>" +
        "<td>" + forAdditional +"</td>" +
        "<td><button class='btn btn-dark addDiscount' id='button" + discountNameNoSpaces + "'>add</button></td>")
}

function createThenYouGetDropDown(thenYouGet, discountName){
    var discountNameNoSpaces = discountName.replace(/\s+/g, '')
    var dropDown =  "<select class='btn btn-secondary discountDropDown' id='dropDown" + discountNameNoSpaces + "' name='storesDropDown'>" +
                    "<option id='pickItem' value='pickAnItem'>pick an item</option>" +
                    "<div class='dropdown-divider'></div>"
    $.each(thenYouGet.allOffers || [], function (index, offer){
        var json = JSON.stringify({
            "forAdditional": offer.forAdditional,
            "itemId": offer.id,
            "itemName": offer.itemName,
            "itemAmount":offer.amount
        })
        dropDown += "<option id='" + discountNameNoSpaces + "-" + offer.id +"' value='" + json + "'>" + offer.itemName + ", amount: " + offer.amount + "</option>"
    })
    return dropDown += "</select>"
}



function createThenYouGetLabels(thenYouGet) {
    var val = ""
    $.each(thenYouGet.allOffers || [], function (index, offer){
        val += "<span id='" + offer.id + "'>" + offer.itemName + "</span>"
    })
    return val
}

function ajaxCreatOrder() {
    var date = $("#datepicker").val()
    xcor = $("#x-cor").val()
    ycor = $("#y-cor").val()
    var location = new Point(xcor,ycor)
    location = JSON.stringify(location)
    var items = JSON.stringify(currentOrder)

    type = isDynamicOrder === true ? "dynamic":"static"

    $.ajax({
        url: CREATE_ORDER,
        dataType: 'json',
        data: {'zonename': zone, 'location': location, 'items': items, 'date': date, 'type': type, 'store': store },
        success: function (wrapper){
            if(!showedDiscounts){
                availableDiscounts = new EntitledDiscounts(currentOrder, wrapper.discount)
                if(wrapper.discount.length !==0){
                    maxItemID = wrapper.order.maxID
                    createDiscountSelectionWindow(wrapper.discount)
                    $('#submitOrder').val("Proceed to checkout")
                }
                else{
                    showedDiscounts = true
                    goToOrderApprovePg(wrapper,items)
                }

            }else {
                goToOrderApprovePg(wrapper,items)
            }
        },
        error : function (){
            console.log("dani zion")
        }
    })

}

function goToOrderApprovePg(order, itemsToSend){
    var json = JSON.stringify(order)
    var dataObjectBase64 = btoa(json);
    var date = $("#datepicker").val()
    var stringOrderAfterDiscount = JSON.stringify(currentOrder);
    var orderAfterDiscount = btoa(stringOrderAfterDiscount);
    var StringItemToSend = JSON.stringify(itemsToSend)
    var itemsEncoded = btoa(StringItemToSend);
    var type = isDynamicOrder === true ? "dynamic":"static"
    window.location = "approveOrder/approveOrder.html?&varid=" + dataObjectBase64 +"&zonename="+zone+"&date="+date+"&type="+type+"&xCor="+xcor+"&yCor="+ycor+"&orderAfterDiscount="+itemsEncoded;
}

