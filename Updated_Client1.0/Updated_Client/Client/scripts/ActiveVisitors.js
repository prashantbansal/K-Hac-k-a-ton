$(document).ready(function () {
    var dataR;

    (function poll() {
        jQuery.support.cors = true;
        $.ajax({
            type: "GET",
            url: "http://kbr.dev.kaplan.com:3000/events/findActiveVisitors/2",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            cache: false,
            error: function (req, status, error) {
                alert("An error occurred while retriving data for Active Users");
                alert(req + status + error);
            },
            success: function (data) {                
                setTimeout(function () { poll() }, 15000);
                document.getElementById('activeVisitors').innerHTML = data.count;                
            }
        });
    })();
});