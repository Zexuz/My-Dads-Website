function addInfo() {
    var inputs = $('#submitForm').find('input');

    console.log(inputs);

    var data = [];
    for (var i = 0; i < inputs.length; i++) {
        var obj = $(inputs[i]);

        var value = obj.val().trim();

        if (value.length === 0)
            continue;

        if (obj.attr('data-type') === "number" && Number.isInteger(parseInt(value)) === true) {
            console.log("Correct input!");
            data.push(value);
        } else {
            console.error("Wrong inpout");
            return;
        }


    }

    $.ajax({
        type: "POST",
        url: "/data/"+ data.join('/'),
        success: function (data) {
            console.log(data);
        },
        dataType: 'JSON'
    });

}

$(function () {
    $("input").keyup(function (event) {
        var element = $(event.target);

        if (event.which === 9)return;

        console.log(parseInt(element.val()));

        if (element.attr('data-type') === "number" && Number.isInteger(parseInt(element.val())) === true) {
            $("#label-" + element.attr("id")).addClass("success").removeClass("error").removeClass("hidden").text("Korrekt!");
        } else {
            $("#label-" + element.attr("id")).addClass("error").removeClass("success").removeClass("hidden").text("Felaktig information!");
        }

    });
});


