var maxLength = 2;
$('#x-cor').keyup(function() {
    var val = $(this).val();
    if(val <1 || val >50)
        $("warning-label").text("location must be between 1-50");
});

/*
location must be between 1-50*/
