$(document).ready(function () {
    var dataR;
    var URL = "http://kbr.dev.kaplan.com:3000/events/topprograms/3";

    (function poll() {
        jQuery.support.cors = true;
        $.ajax({
            type: "GET",
            url: URL,
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            cache: false,
            error: function (req, status, error) {
                alert("An error occurred while retriving data for Pie chart Programs");
                alert(req + status + error);
            },
            success: function (data) {
                dataR = parseData(data);
                bindcharts();
                setTimeout(function () { poll() }, 15000);
            }
        });
    })();

    $('#img1Day').click(function () {
        URL = "http://kbr.dev.kaplan.com:3000/events/topprograms/2";

        (function poll() {
            jQuery.support.cors = true;
            $.ajax({
                type: "GET",
                url: URL,
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                cache: false,
                error: function (req, status, error) {
                    alert("An error occurred while retriving data for Pie chart Programs");
                    alert(req + status + error);
                },
                success: function (data) {
                    dataR = parseData(data);
                    bindcharts();
                    setTimeout(function () { poll() }, 15000);
                }
            });
        })();
    });

    $('#img1Month').click(function () {
        URL = "http://kbr.dev.kaplan.com:3000/events/topprograms/1";

        (function poll() {
            jQuery.support.cors = true;
            $.ajax({
                type: "GET",
                url: URL,
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                cache: false,
                error: function (req, status, error) {
                    alert("An error occurred while retriving data for Pie chart Programs");
                    alert(req + status + error);
                },
                success: function (data) {
                    dataR = parseData(data);
                    bindcharts();
                    setTimeout(function () { poll() }, 15000);
                }
            });
        })();
    });

    function parseData(entity) {
        var data = [];
        for (var i = 0; i < entity.length; i++) {
            data.push({
                'name': entity[i]._id,
                'y': entity[i].number,
                'sliced': (entity[i].value == 'GRE'),
                'selected': (entity[i].value == 'GRE'),
            });
        }
        return data;
    }

    function bindcharts() {
        $('#dvPieChartPrograms').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: true
            },
            title: {
                text: 'Program Enrollments Distribution'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage}%</b>',
                percentageDecimals: 1
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',
                        formatter: function () {
                            return '<b>' + this.point.name + '</b>: ' + this.percentage.toFixed(2) + ' %';
                        }
                    }
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                data: dataR
            }]

        });
    }

});