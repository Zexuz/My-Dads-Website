function getDataFromDB(dates) {

    var lables = [];

    var bIn = [];
    var bOut = [];
    var houseEnergy = [];
    var outTemp = [];
    var pumpEnergy = [];

    console.log(dates);

    for (var i = 0; i < dates.length; i++) {
        var obj = dates[i];

        console.log(obj);


        (function (date, index, lenght, callback) {
            $.ajax({
                type: "GET",
                url: "/data/" + date,
                success: function (data) {
                    houseEnergy.push(data.houseEnergy);
                    outTemp.push(data.outTemp);
                    pumpEnergy.push(data.pumpEnergy);
                    bOut.push(data.brineOut);
                    bIn.push(data.brineIn);
                    lables.push(data._id);

                    if(index === lenght-1)
                        callback();
                },
                dataType: 'JSON'
            });


        })(obj, i, dates.length, function () {
            createLineChart($('#myChart'), 'line', lables, bIn, bOut, houseEnergy, outTemp, pumpEnergy);
        });

    }

}

function transformDBDataToChartData() {

}


function createLineChart(ctx, type, periodLabel, bIn, bOut, houseEnergy, outTemp, pumpEnergy) {

    new Chart(ctx, {
        type: type,
        data: {
            labels: periodLabel,
            datasets: [
                {
                    label: 'Elmätaren',
                    fill: false,
                    borderColor: "rgba(75,192,192,1)",
                    data: houseEnergy,
                    borderWidth: 1
                },
                {
                    label: 'Under mätaren',
                    fill: false,
                    borderColor: "rgba(60,200,100,1)",
                    data: pumpEnergy,
                    borderWidth: 1
                },
                {
                    fill: false,
                    label: 'Brine in',
                    data: bIn
                },
                {
                    label: 'Brine Ut',
                    fill: false,
                    data: bOut
                },
                {
                    label: 'Ute temp',
                    fill: false,
                    data: outTemp
                }
            ]
        },
        options: {
            yAxes: [{
                display: true,
                ticks: {
                    suggestedMin: 0    // minimum will be 0, unless there is a lower value.
                }
            }]
        }
    });
}