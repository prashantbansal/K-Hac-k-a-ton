$(document).ready(function () {
    $('#btnPopulateData').click(function () {
        URL = "http://kbr.dev.kaplan.com:3000/events/populateUsers";

        jQuery.support.cors = true;
        $.ajax({
            type: "GET",
            url: URL,
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            cache: false,
            error: function (req, status, error) {
                alert("An error occurred while retriving data for populate Users");
                alert(req + status + error);
            },
            success: function (data) {
            }
        });
    });
});