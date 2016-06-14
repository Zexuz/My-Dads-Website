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

function updateInfo(callback, event) {
    var inputs = $('#submitForm').find('input');

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


    restApiHelper.makePut('/day', data.join('/'), callback);
}


$(function () {

    //add restApiHelper to the window object
    window.restApiHelper = new RestApiHelper("http://localhost:3000/api");


    $("input").keyup(inputListener);
    $("#addDataBtn").click(addInfo.bind(null, addInfoCallback));
    $("#getData").click(getDataFromDB);
    $("#updateDataBtn").click(updateInfo.bind(null,addInfoCallback));

});

function getList() {
    restApiHelper.makeGet('/day', '2000/2100', function (err, data) {

        if (err) {
            console.error(err);
            Materialize.toast('Något gick fel pappa och jag vet inte vad..', 4000);
            return;
        }

        console.log(data.length);
        var listElement = $('#list');
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];

            var link = $('<a>').text(obj.year + "-" + obj.month + "-" + obj.day)
                .attr('href',
                    '/update/' + obj.year + '/' + obj.month + '/' + obj.day + '/' + obj.houseEnergy + '/' + obj.pumpEnergy + '/' + obj.brineIn + '/' + obj.brineOut + '/' + obj.outTemp + '/' + obj.runtTime + '/' + obj.warmWater);
            var li = $('<li>').append(link);
            listElement.append(li);
        }

    });
}

function addInfoCallback(err, data) {
    if (err) {
        console.error(err);
        Materialize.toast('Tyvärr blev något fel pappa...', 4000);// 4000 is the duration of the toast
        return;
    }
    Materialize.toast('Bra pappa, du har nu lagt till en ny dag i databasen!', 4000);// 4000 is the duration of the toast

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

