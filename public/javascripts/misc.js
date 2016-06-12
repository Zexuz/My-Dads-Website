function addInfo(callback,event) {
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

    restApiHelper.makePost('/data', data.join('/'), callback);
}

$(function () {

    //add restApiHelper to the window object
    window.restApiHelper = new RestApiHelper("http://localhost:3000");


    $("input").keyup(inputListener);
    $("#addDataBtn").click(addInfo.bind(null,addInfoCallback));

});

function addInfoCallback(err, data) {
    if (err) {
        console.error(err);
        return;
    }

    console.log("data added to the database");
}

function inputListener(event) {
    var element = $(event.target);

    if (event.which === 9)return;

    console.log(parseInt(element.val()));

    if (element.attr('data-type') !== "number" || Number.isInteger(parseInt(element.val())) !== true) {
        $("#label-" + element.attr("id")).addClass("error").removeClass("success").removeClass("hidden");
    }else{
        $("#label-" + element.attr("id")).addClass("hidden");
    }

}


