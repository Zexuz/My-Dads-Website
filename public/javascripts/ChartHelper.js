function getDataFromDB(callback) {


    //get input dates
    //send to rest apiDay (need new endpoint) /:start/:end
    //convert the dates to unix time and run mongo query
    //return all data found
    //controll sort the data on client side
    //loop in data
    //show data eg, run callback

    var lables = [];

    var bIn = [];
    var bOut = [];
    var houseEnergy = [];
    var outTemp = [];
    var pumpEnergy = [];
    var runTime = [];
    var warmWater = [];

    /*
     var startDate = $('#startDate').val();
     var endDate = $('#endDate').val();

     if (startDate.trim().length === 0 || startDate.trim().length === 0) {
     return;
     }
     */
    var startDate = 2016;
    var endDate = 2017;

    restApiHelper.makeGet('/day/', startDate + '/' + endDate, function (err, data) {
        if (err) {
            console.error(err);
            return;
        }

        var sortedData = bubbleSort(data);

        for (var i = 0; i < sortedData.length; i++) {
            var obj = sortedData[i];

            houseEnergy.push(obj.houseEnergy);
            outTemp.push(obj.outTemp);
            pumpEnergy.push(obj.pumpEnergy);
            bOut.push(obj.brineOut);
            bIn.push(obj.brineIn);
            lables.push(obj.year +"-" + obj.month +"-" + obj.day);
            runTime.push(obj.runTime);
            warmWater.push(obj.warmWater);

        }

        createLineChart($('#myChart'), 'line', lables, bIn, bOut, houseEnergy, outTemp, pumpEnergy, runTime, warmWater);


    });

    //TODO make "förbrukning pump" (delta PumpEnergy) and "förbrukning pump" period (delta pumpEnergy)/ period


}


function createLineChart(ctx, type, periodLabel, bIn, bOut, houseEnergy, outTemp, pumpEnergy, runTime, warmWater) {

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