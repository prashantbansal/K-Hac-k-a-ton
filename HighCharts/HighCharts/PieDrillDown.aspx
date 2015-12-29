<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PieDrillDown.aspx.cs" Inherits="HighCharts.PieDrillDown" %>
<%@ Import Namespace="System.Web.Script.Serialization" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
	<script type="text/javascript">
	    function generateData(entity)
	    {
	        debugger;
	        var data=[];
	        for(var i=0; i < entity.length;i++)
	        {
	            var innerEntity=entity[i].userSubPrograms;
	            var innerData=[];
	            for(var j=0; j < innerEntity.length; j++)
	            {
	                innerData.push({
	                    'name': innerEntity[j].Name,
	                    'y': innerEntity[j].Score,
	                    //'sliced': (innerEntity[i].Name == 'GRE'),
	                    //'selected': (innerEntity[i].Name == 'GRE'),
	                });
	            }

	            data.push({
	                'name': entity[i].Name,
	                'y': entity[i].Score,
	                //'sliced': (entity[i].Name == 'GRE'),
	                //'selected': (entity[i].Name == 'GRE'),
	                'drilldown': innerData
	            });
	        }
	        return data;
	    }

	    $(document).ready(function () {
	        debugger;
	        var entity = <%=new JavaScriptSerializer().Serialize(UserPrograms)%>

	        var chartdata = generateData(entity);

	        function setChart(name, data) 
	        {
	            debugger;
	            chart.series[0].remove(false);
	            chart.addSeries({
	                type: 'pie',
	                name: name,
	                data: data,
	            }, false);
	            chart.redraw();
	        }


	        var chart = $('#container').highcharts({
	            chart: {
	                plotBackgroundColor: null,
	                plotBorderWidth: null,
	                plotShadow: false
	            },
	            title: {
	                text: 'Enrollment of Students in Kaplan, 2010'
	            },
	            tooltip: {
	                pointFormat: '{series.name}: <b>{point.percentage}%</b>',
	                percentageDecimals: 1
	            },
	            plotOptions: {
	                pie: {
	                    allowPointSelect: true,
	                    cursor: 'pointer',
	                    point: {
	                        events: {
	                            click: function() {
	                                debugger;
	                                var drilldown = this.drilldown;
	                                if (drilldown) { // drill down
	                                    setChart('drillDown', drilldown);
	                                } else { // restore
	                                    setChart(name, chartdata);
	                                }
	                            }
	                        }
	                    },
	                    dataLabels: {
	                        enabled: true,
	                        color: '#000000',
	                        connectorColor: '#000000',
	                        formatter: function () {
	                            return '<b>' + this.point.name + '</b>: ' + this.percentage + ' %';
	                        }
	                    }
	                }
	            },
	            series: [{
	                type: 'pie',
	                name: 'Browser share',
	                data: chartdata
	            }]

	        }).highcharts();
	    });
		</script>
    <title></title>
</head>
<body>
    
<script src="Scripts/highcharts.js"></script>
<script src="Scripts/modules/exporting.js"></script>
    <form id="form1" runat="server">
    <div>
        <div id="container" style="min-width: 400px; height: 400px; margin: 0 auto"></div>
    </div>
    </form>
</body>

</html>
