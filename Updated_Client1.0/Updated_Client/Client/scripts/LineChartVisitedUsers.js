$(document).ready(function () {
    var dataR;
    var now = new Date();
    var now_utc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours() - 24, now.getUTCMinutes(), now.getUTCSeconds());
    //alert(now_utc); alert(Date.UTC(2013, 07, 1));

    $.ajax({
        type: "GET",
        url: "http://kbr.dev.kaplan.com:3000/events/findActivityForProgram24/2",
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        cache: false,
        error: function (req, status, error) {
            alert("An error occurred while retriving data for Line chart Visited Users");
            alert(req + status + error);
        },
        success: function (data) {
            dataR = parseData(data);
            Bindcharts();
        }
    });

    function parseData(entity) {
        var data = [];
        for (var i = 0; i < entity.length; i++) {
            data.push({
                'y': entity[i].number,
            });
        }
        return data;
    }

    function Bindcharts() {
        $('#dvLineChartVisitedUsers').highcharts({
            chart: {
                zoomType: 'x',
                spacingRight: 20
            },
            title: {
                text: 'Users Activity in Past 24 hours'
            },
            xAxis: {
                type: 'datetime',
                maxZoom: 300, // fourteen days
                title: {
                    text: null
                }
            },
            yAxis: {
                title: {
                    text: 'Activity Count'
                }
            },
            credits: {
                enabled: false
            },
            tooltip: {
                shared: true
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    lineWidth: 1,
                    marker: {
                        enabled: false
                    },
                    shadow: true,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                name: 'Users logged In',
                pointInterval: 24 * 3600 * 1000,
                pointStart: now_utc,
                data: dataR
            }]
        });
    }
   
});