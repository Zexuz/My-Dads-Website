function getDataFromDB(dates) {

    var lables = [];

    var bIn = [];
    var bOut = [];
    var houseEnergy = [];
    var outTemp = [];
    var pumpEnergy = [];
    var runTime = [];
    var warmWater= [];

    //TODO make "förbrukning pump" (delta PumpEnergy) and "förbrukning pump" period (delta pumpEnergy)/ period

    console.log(dates);

    for (var i = 0; i < dates.length; i++) {
        var obj = dates[i];

        console.log(obj);


        (function (date, index, lenght, callback) {
            $.ajax({
                type: "GET",
                url: "/data/" + date,
                success: function (data) {

                    houseEnergy.push(data.response.data.houseEnergy);
                    outTemp.push(data.response.data.outTemp);
                    pumpEnergy.push(data.response.data.pumpEnergy);
                    bOut.push(data.response.data.brineOut);
                    bIn.push(data.response.data.brineIn);
                    lables.push(data.response.data._id);
                    runTime.push(data.response.data.runTime);
                    warmWater.push(data.response.data.warmWater);

                    if(index === lenght-1)
                        callback();
                },
                dataType: 'JSON'
            });


        })(obj, i, dates.length, function () {
            createLineChart($('#myChart'), 'line', lables, bIn, bOut, houseEnergy, outTemp, pumpEnergy,runTime,warmWater);
        });

    }

}


function createLineChart(ctx, type, periodLabel, bIn, bOut, houseEnergy, outTemp, pumpEnergy,runTime,warmWater) {

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
                },
                {
                    label: 'Drift tid',
                    fill: false,
                    data: runTime
                },
                {
                    label: 'Vatten varm',
                    fill: false,
                    data: warmWater
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