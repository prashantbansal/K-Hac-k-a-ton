<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="LineWithSeries.aspx.cs" Inherits="HighCharts.LineWithSeries" %>
<%@ Import Namespace="System.Web.Script.Serialization" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script type="text/javascript">
        function generateData(entity) {
            var data = [];
            for (var i = 0; i < entity.length; i++) {
                data.push({
                    'y': entity[i],
                  });
            }
            return data;
        }

        $(document).ready(function () {
            var entity = <%=new JavaScriptSerializer().Serialize(PointsList)%>

            var chartData= generateData(entity);

            $('#container').highcharts({
                chart: {
                    zoomType: 'x',
                    spacingRight: 20
                },
                title: {
                    text: 'Number of users logged in Past 24 hours'
                },
                subtitle: {
                    text: document.ontouchstart === undefined ?
                        'Click and drag in the plot area to zoom in' :
                        'Drag your finger over the plot to zoom in'
                },
                xAxis: {
                    type: 'datetime',
                    maxZoom: 500, // fourteen days
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    title: {
                        text: 'Users Online'
                    }
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
                        shadow: false,
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
                    pointInterval:24*60*60*24,
                    pointStart: Date.UTC(2013, 0, 01),
                    data: chartData
                    }]
            });
        });
    </script>
<script src="Scripts/highcharts.js"></script>
    <script src="Scripts/modules/exporting.js"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <div id="container" style="min-width: 400px; height: 400px; margin: 0 auto"></div>
    </div>
    </form>
</body>
</html>
