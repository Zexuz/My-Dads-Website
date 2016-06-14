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

    var pumpConsumption = [];

    var startDate = $('#startDate').val();
    var endDate = $('#endDate').val();

    if (startDate.trim().length === 0 || startDate.trim().length === 0) {
        return;
    }

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
            lables.push(obj.year + "-" + obj.month + "-" + obj.day);
            runTime.push(obj.runtTime); //misspelled runTime to runtTime in database *facepalm*
            warmWater.push(obj.warmWater);

            if (i > 0)
                pumpConsumption.push(pumpEnergy[i] - pumpEnergy[i -1])

        }

        createLineChart($('#myChart'), 'line', lables, bIn, bOut, houseEnergy, outTemp, pumpEnergy, runTime, warmWater,pumpConsumption);
        createLineChart($('#myChart1'), 'line', lables, bIn, bOut, houseEnergy, outTemp, pumpEnergy, runTime, warmWater,pumpConsumption);


    });

    //TODO make "förbrukning pump" (delta PumpEnergy) and "förbrukning pump" period (delta pumpEnergy)/ period


}


function createLineChart(ctx, type, periodLabel, bIn, bOut, houseEnergy, outTemp, pumpEnergy, runTime, warmWater,pumpConsumption) {

    new Chart(ctx, {
        type: type,
        data: {
            labels: periodLabel,
            datasets: [
                {
                    label: 'Elmätaren',
                    fill: false,
                    borderColor: "rgba(75,192,192,1)",
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    data: houseEnergy,
                    borderWidth: 1
                },
                {
                    label: 'Under mätaren',
                    fill: false,
                    borderColor: "rgba(60,200,100,1)",
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    data: pumpEnergy,
                    borderWidth: 1
                },
                {
                    fill: false,
                    label: 'Brine in',
                    borderColor: "rgba(75,192,192,1)",
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderWidth: 1,
                    data: bIn
                },
                {
                    label: 'Brine Ut',
                    fill: false,
                    borderColor: "rgba(75,192,192,1)",
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1,
                    data: bOut
                },
                {
                    label: 'Ute temp',
                    fill: false,
                    borderColor: "rgba(75,192,192,1)",
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderWidth: 1,
                    data: outTemp
                },
                {
                    label: 'Drift tid',
                    fill: false,
                    borderColor: "rgba(75,192,192,1)",
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderWidth: 1,
                    data: runTime
                },
                {
                    label: 'Förbruk, pump',
                    fill: false,
                    borderColor: "rgba(75,192,192,1)",
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderWidth: 1,
                    data: pumpConsumption
                },
                {
                    label: 'Vatten varm',
                    fill: false,
                    borderColor: "rgba(75,192,192,1)",
                    backgroundColor: 'rgba(255, 70, 80, 0.2)',
                    borderWidth: 1,
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