<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Charts.aspx.cs" Inherits="HighCharts.Charts" %>
<%@ Import Namespace="System.Web.Script.Serialization" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <script type="text/javascript" src="js/highcharts.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            var entity = <%=new JavaScriptSerializer().Serialize(UserPrograms)%>
            var schoolname=<%=new JavaScriptSerializer().Serialize(SchoolName)%>
        var attemptedTotal=0;
        var totalStudents=0;
        var barXWidth=0;
        var barYHeight=0;
        var drillbarXWidth=0;
        var drillbarYHeight=0;
        var chart;
        var chartdata = generateData(entity);
        display();
        function display() {
            Highcharts.setOptions({
                colors: ['#FFC62D', '#EA509B', '#01A4DA', '#C2D837', '#1C267D', '#43A743']
            });
            chart = new Highcharts.Chart({

                chart: {
                    renderTo: 'chartContainer',
                    type: 'column',
                    style: {
                        fontFamily: 'Arial',
                        color: "gray",
                        overflow: ($.browser.msie) ? '': 'none'
                         
                    }
                },
                credits: {
                    enabled: false
                },
                yAxis:{
                    title: { text: null},
                    labels: {
                        formatter: function() {
                            return this.value +'%';
                        }
                    }
                },

                xAxis: {
                    labels: { enabled: false }, tickWidth: 0,title: {
                        text:'Data is displayed for all '+schoolname+' students active in the QBank during the dates selected',
                        style:{
                            fontSize:'11px',
                            fontFamily: 'Arial, Helvetica, sans-serif',
                            fontWeight:'normal',
                            color: "gray",
                        }
                    }
                },
                title: {
                    text: 'MBE Qbank Performance for '+schoolname +' Students',
                    style:{
                        fontFamily: 'Arial, Helvetica, sans-serif',
                        color:'black'
                    },
                    x:101,
                    y:1.5
                },
                subtitle: {
                    text: 'Click on the chart area to drill down',
                    style:{
                        color: "gray",
                        fontFamily: 'Arial, Helvetica, sans-serif'
                    },
                    x: 101,
                    y: 20
                },
                tooltip: {
                    animation: false,
                    positioner: function () {
                        return {x:barXWidth+150 , y: barYHeight-20 }
                    },
                    formatter: function () {
                        barXWidth = this.point.graphic.x;
                        barYHeight = this.point.graphic.y;

                        var nume=this.point.attempted;
                        var deno=totalStudents;

                        return  checkToolTip(nume,deno);
                    
                    },
                    style:{
                        color: 'gray',
                        fontFamily: 'Arial'
                    }
                },
                plotOptions: {
                    column: {
                        events: {
                            legendItemClick: function () {
                                var drilldown = this.data[0].drilldown;
                                drillDisplay(drilldown.L2name, drilldown.data, drilldown.name, drilldown.color,drilldown.attempted,drilldown.l2Attempted);
                            },
                            mouseOver: function () {
                                //return false;
                            }
                        },
                        dataLabels: {
                            enabled: true,
                            style: {
                                color: "gray",
                                fontWeight: 'bold'
                            },
                            formatter: function () {
                                return this.y + '%';
                            }
                        }
                    },
                    chart: {
                        size: '100%'
                    },
                    series: {
                        groupPadding: 0,
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function () {
                                    var drilldown = this.drilldown;
                                    drillDisplay(drilldown.L2name, drilldown.data, drilldown.name, drilldown.color,drilldown.attempted,drilldown.l2Attempted );
                                }
                            }
                        }
                    },

                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    padding: 10,
                    backgroundColor: '#F8F8F8',
                    borderColor: '#F8F8F8',
                    floating: false,
                    align: 'left',
                    verticalAlign: 'middle',
                    shadow: false,
                    fontColor: "gray",
               
               
                    itemStyle: {
                        lineHeight: '20px',
                        fontFamily: 'Arial, Helvetica, sans-serif',
                        color: "gray",
                        fontSize: '15px'
                    }
                },
                series: chartdata
            });

        }

        function drillDisplay(L2name, data, name, color,attempted, l2Attempted) {
            var newdata = generateDrillDownSeries(data, name, color,attempted, l2Attempted);
            if ($.browser.msie) 
            {
                var parentEl = $('#chartContainer').parent();
                $('#chartContainer').remove();
                parentEl.html('<div id="chartContainer"></div>');
            }

            chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'chartContainer',
                    type: 'column',
                    style: {
                        overflow: ($.browser.msie) ? '': 'none',
                        fontFamily: 'Arial, Helvetica, sans-serif'
                    }
                },
                credits: {
                    enabled: false
                },
                yAxis:{
                    title: { text: null},
                    labels: {
                        formatter: function() {
                            return this.value +'%';
                        }
                    }
                },
                xAxis: {
                    labels: { enabled: false }, tickWidth: 0,title: {
                        text:'Data is displayed for all '+schoolname+' students active in the QBank during the dates selected',
                        style:{
                            fontSize:'11px',
                            color: "gray",
                            fontWeight:'normal',
                            fontFamily: 'Arial, Helvetica, sans-serif'
                        }
                    }
                },
                title: {
                    text: 'MBE Qbank Performance for '+schoolname +' Students',
                    style:{
                        color:'black',
                        fontFamily: 'Arial, Helvetica, sans-serif'
                    },
                    x:101,
                    y:1.5
                },
                subtitle: {
                    text: 'Click on the chart area to return',
                    style:{
                        color: "gray",
                        fontFamily: 'Arial, Helvetica, sans-serif'
                    },
                    x: 101,
                    y: 20
                },
                tooltip: {
                    animation: false,
                    positioner: function () {
                        return {x:drillbarXWidth+150 , y: drillbarYHeight-20 }
                    },
                    formatter: function () {
                        drillbarXWidth = this.point.graphic.x;
                        drillbarYHeight = this.point.graphic.y;

                        var nume=this.point.attempted;
                        var deno=totalStudents;
                        return  checkToolTip(nume,deno);
                    },
                    style:{
                        color: 'gray',
                        fontFamily: 'Arial'
                    }
                },
                labels: {
                    items: [{
                        html: L2name,
                        style: {
                            fontFamily: 'Arial, Helvetica, sans-serif',
                            layout: 'vertical',
                            top: '-40px',
                            fontSize: '15px',
                            fontWeight: 'normal',
                            color: "gray",
                            floating: false
                        }
                    },{
                        html: "Topic breakdown",
                        style: {
                            fontFamily: 'Arial, Helvetica, sans-serif',
                            // backgroundColor: '#F8F8F8',
                            borderColor: '#F8F8F8',
                            border: 1,
                            borderRadius: 0,
                            symbolPadding: 10,
                            layout: 'vertical',
                            top: '60px',
                            fontSize: '14px',
                            color: "gray",
                            fontWeight: 'normal',
                            floating: false
                        }
            
                    }
                    ]
                },
                plotOptions: {
                    column: {
                        events: {
                            legendItemClick: function () {
                                display();
                            }
                        },
                        dataLabels: {
                            enabled: true,
                            style: {
                                fontWeight: 'bold',
                                color: "gray",
                                fontFamily: 'Arial, Helvetica, sans-serif'
                            },
                            formatter: function () {
                                return this.y + '%';
                            }
                        }
                    },
                    chart: {
                        size: '100%'
                    },
                    series: {
                        groupPadding: 0,
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function () {
                                    display();
                                }
                            }
                        }
                    }
                },
                legend: {
                    layout: 'vertical',
                    //align: 'center',
                    backgroundColor: '#F8F8F8',
                    borderColor: '#F8F8F8',
                    floating: false,
                    align: 'left',
                    verticalAlign: 'middle',
                    shadow: false,
                    border: 1,
                    borderRadius: 0,
                    symbolPadding: 10,
                    x:-10,
                    color: "gray",
                    navigation: {

                    },
                    itemStyle: {
                        lineHeight: '20px',
                        fontFamily: 'Arial, Helvetica, sans-serif',
                        color: "gray",
                        fontSize: '15px'
            
                    }
                },
                series: newdata
            });


            new Highcharts.Chart(chart.options, callback);
        }

        function callback($this) {
            var img = $this.renderer.image('../WebFiles/Image/IP/btn_back.jpg', 0, 23, 20, 20);
            img.add();
            img.css({ 'cursor': 'pointer' });
            img.attr({ 'title': 'Back' });
            img.on('click', function () {
                display();
            });
        }


        function checkToolTip(nume,deno) {
            var result=0;
            if (deno==0) {
                return false;
            }
            else if(deno<0)
            {
                return false;
            }
            else if(nume>0)
            {
                var result=parseInt(nume/deno);
                if(result==0)
                {
                    return false;
                }
                else{
                    return   "Average Questions <br/>Completed " + result;
                }
            }
            else
            {
                return false;
            }
        }

        function generateData(entity) {
            debugger;
            var data = [];
            var drilldownName=null;
            var drilldownValue=null;
            var attemptedValue=null;
            for (var i = 0; i < entity.length; i++) 
            {
                var l2AttemptedValue = entity[i].Attempted;
                attemptedTotal +=  l2AttemptedValue;
        
                var drilldownName = $.map(entity[i].userSubPrograms, function (item, index) {
                    return [item.Name];
                });

                var drilldownValue = $.map(entity[i].userSubPrograms, function (item, index) {
                    return [item.Score];
                });
       
                var attemptedValue = $.map(entity[i].userSubPrograms, function (item, index) {
                    return [item.Score];
                });

                totalStudents=entity[i].Score;
        
                data.push({
                    "name": entity[i].Name,
                    "data": [{
                        "y": (entity[i].Score > 0 ? parseInt((entity[i].Score * 100.0) / entity[i].Total) : 0),
                        "attempted":entity[i].Answered,
                        drilldown: {
                            "L2name": entity[i].Name,
                            "name": drilldownName,
                            "data": drilldownValue,
                            "attempted" : attemptedValue,
                            "l2Attempted" : l2AttemptedValue
                        }
                    }]
                });
            }
            return data;
        }

        function generateDrillDownSeries(data1, series, color,attempted, l2Attempted) {
            var localdata = [];
            for (var i = 0; i < data1.length; i++) {
                localdata.push({
                    "name": series[i],
                    "data": [{
                        "attempted":attempted[i],
                        "l2Attempted" : l2Attempted,
                        "y": data1[i]
                    }],
                    "color": color
                });
            }
            return localdata;
        }
    });
</script>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="main">
        <div>
            This is test page
        </div>
        <div align="left" id="chartContainer">
        </div>
    </div>
    </form>
</body>
</html>
