<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Pie.aspx.cs" Inherits="HighCharts.Pie" %>
<%@ Import Namespace="System.Web.Script.Serialization" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
     <script type="text/javascript" ></script>
	<script type="text/javascript">
	    function generateData(entity)
	    {
	        debugger;
	        var data=[];
	        for(var i=0; i < entity.length;i++)
	        {
	            data.push({
	                'name': entity[i].Name,
	                'y': entity[i].Score,
	                'sliced': (entity[i].Name == 'GRE'),
	                'selected': (entity[i].Name == 'GRE'),
	            });
	        }
	        return data;
	    }

	    function generateDataUsingAjax()
	    {
	        entity= MakeAjaxCall();

	        entity= entity.replace(/[{}\n" ]/g,"");

	        var splitdata=entity.split(",");

	        var data=[];
	        for(var i=0; i < splitdata.length;i=i+2)
	        {
	            data.push({
	                'name': splitdata[i].split(":")[1],
	                'y': parseInt(splitdata[i+1].split(":")[1].replace("]",'')),
	                'sliced': ( splitdata[i].split(":")[1] == 'GRE'),
	                'selected': ( splitdata[i].split(":")[1] == 'GRE'),
	            });
	        }
	        return data;
	    }

	    function MakeAjaxCall()
	    {
	        var result;

	        var url = "http://localhost:3000/events/topprograms/3";
	        var representationOfDesiredState = "Sample Text";
	        var client = new XMLHttpRequest();
	        client.open("GET", url, false);
            client.setRequestHeader("Content-Type", "text/plain");
	        client.send(representationOfDesiredState);
	        if (client.status == 200)
	        {
	            result= client.responseText;
	        }
	        else
	        {
	            alert("The request did not succeed!\n\nThe response status was: " + client.status + " " + client.statusText + ".");
	        }

	        return result;
	    }

	    $(document).ready(function () {

	        $("#btnGetData").click(function () {
        
	            debugger;
	            var chartdata = generateDataUsingAjax();

	            $('#container1').highcharts({
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

	        });
	        });

        
	        var entity = <%=new JavaScriptSerializer().Serialize(UserPrograms)%>
	        var chartdata = generateData(entity);

	        $('#container').highcharts({
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

	        });
	    });

	    
		</script>
    <title></title>
</head>
<body>
    
<script src="Scripts/highcharts.js"></script>
<script src="Scripts/modules/exporting.js"></script>
    <form id="form1" runat="server">
    <div>
        <div>
            <input type="button" id="btnGetData" runat="server" name="Get Data" value="GetData" />
        </div>
        <div id="container" style="min-width: 400px; height: 400px; margin: 0 auto"></div>
        <div id="container1" style="min-width: 400px; height: 400px; margin: 0 auto"></div>
    </div>
    </form>
</body>

</html>
'