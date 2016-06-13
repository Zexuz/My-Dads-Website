function addInfo(callback, event) {
    var inputs = $('#submitForm').find('input');

    console.log(inputs);

    var data = [];
    for (var i = 0; i < inputs.length; i++) {
        var obj = $(inputs[i]);

        var value = parseInt(obj.val().trim());


        if (isNaN(value)) {
            alert("Fel input!");
            return;
        }

        data.push(value);
    }


    restApiHelper.makePost('/day', data.join('/'), callback);
}

$(function () {

    //add restApiHelper to the window object
    window.restApiHelper = new RestApiHelper("http://localhost:3000/api");


    $("input").keyup(inputListener);
    $("#addDataBtn").click(addInfo.bind(null, addInfoCallback));
    $("#getData").click(getDataFromDB);

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
    } else {
        $("#label-" + element.attr("id")).addClass("hidden");
    }

}

function bubbleSort(arr) {
    var len = arr.length;
    for (var i = len - 1; i >= 0; i--) {
        for (var j = 1; j <= i; j++) {
            if (arr[j - 1] > arr[j]) {
                var temp = arr[j - 1];
                arr[j - 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

