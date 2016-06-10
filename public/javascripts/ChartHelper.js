function createLineChart(ctx, type) {
    type = "line";

    new Chart(ctx, {
        type: type,
        data: {
            labels: ["8/12", "15/12", "22/12", "29/12", "05/01"],
            datasets: [
                {
                    label: 'Elmätaren',
                    fill: false,
                    borderColor: "rgba(75,192,192,1)",
                    data: [104330, 104624, 104905, 105262, 105597],
                    borderWidth: 1
                },
                {
                    label: 'Under mätaren',
                    fill: false,
                    borderColor: "rgba(60,200,100,1)",
                    data: [49209, 49427, 49615, 49845, 50081],
                    borderWidth: 1
                },
                {
                    fill: false,
                    label: 'Brine in',
                    data: [2, 1, 1, 2, 1]
                },
                {
                    label: 'Brine Ut',
                    fill: false,
                    data: [-2, -2, -2, -2, -2]
                },
                {
                    label: 'Ute temp',
                    fill: false,
                    data: [10, -13, 1, -10, 17]
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