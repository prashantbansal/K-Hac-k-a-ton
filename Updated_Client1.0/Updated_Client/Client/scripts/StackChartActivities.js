var EnumAssetType = {
    1: "Video",
    2: "On-Site Session",
    3: "Web Reader",
    4: "Test",
    5: "File Download",
    6: "Flex Session"
};

$(document).ready(function () {
    var dataR;
    var seriesData;
    var xCategories;
    var URL = "http://kbr.dev.kaplan.com:3000/events/findActivityForProgram/GRE/2";

    $('#imgStack2').click(function () {
        URL = "http://kbr.dev.kaplan.com:3000/events/findActivityForProgram/GRE/2";

        (function poll() {
            jQuery.support.cors = true;
            $.ajax({
                type: "GET",
                url: URL,
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                cache: false,
                error: function (req, status, error) {
                    alert("An error occurred while retriving data for Stack chart Activities");
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

    $('#imgStack1').click(function () {
        URL = "http://kbr.dev.kaplan.com:3000/events/findActivityForProgram/GRE/1";

        (function poll() {
            jQuery.support.cors = true;
            $.ajax({
                type: "GET",
                url: URL,
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                cache: false,
                error: function (req, status, error) {
                    alert("An error occurred while retriving data for Stack chart Activities");
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

    (function poll() {
        jQuery.support.cors = true;
        $.ajax({
            type: "GET",
            url: URL,
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            cache: false,
            error: function (req, status, error) {
                alert("An error occurred while retriving data for Stack chart Activities");
                alert(req + status + error);
            },
            success: function (data) {
                dataR = parseData(data);
                bindcharts();
                setTimeout(function () { poll() }, 15000);
            }
        });
    })();

    function parseData(data) {
        seriesData = [];
        xCategories = [];
        var i, cat;
        for (i = 0; i < data.length; i++) {
            category = data[i]._id.program;
            if (xCategories.indexOf(category) === -1) {
                xCategories[xCategories.length] = category;
            }
        }

        for (i = 0; i < data.length; i++) {
            var currSeries = seriesData.filter(function (seriesObject) {
                if (seriesObject.name == EnumAssetType[data[i]._id.assetType])
                {
                    return seriesObject;
                }
            });
            if (currSeries.length == 0)
            {
                seriesData.push({
                    name: EnumAssetType[data[i]._id.assetType], data: new Array(0, 0, 0, 0, 0)
                });
            }
        }

        for (i = 0; i < data.length; i++) {
            var itemIndex = xCategories.indexOf(data[i]._id.program);
            var seriesDataIndex;
            
            for (var j = 0; j < seriesData.length; j++) {
                seriesDataIndex = -1;
                if (seriesData[j].name == EnumAssetType[data[i]._id.assetType])
                {
                    seriesDataIndex = j;
                    break;
                }
            }
            seriesData[seriesDataIndex].data[itemIndex] = seriesData[seriesDataIndex].data[itemIndex] + data[i].number;
        }
    }
function bindcharts() {
    $('#dvStackChartActivities').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Program Activities'
        },
        xAxis: { categories: xCategories },
        yAxis: {
            min: 0,
            title: {
                text: 'Total Count'
            }
        },
        credits: {
            enabled: false
        },
        legend: {
            backgroundColor: '#FFFFFF',
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: seriesData
    });
}
});