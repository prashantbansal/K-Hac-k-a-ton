function UserDetailsCtrl($scope, $http) {
    $http.defaults.useXDomain = true;
    $http.get('http://kbr.dev.kaplan.com:3000/events/500').success(function (data)
    {
        for (var i = 0; i < data.length; i++) {
            data[i].time = jQuery.timeago(data[i].time);

            if (data[i].verb == "completed" && data[i].score != null) {
                data[i].score = "with score " + data[i].score;
            }
            else {
                data[i].score = "";
            }

            if (data[i].browser == "Chrome") {
                data[i].browser = "images/chrome.jpg";
            }
            
            else {
                data[i].browser = "";
            }

            if (data[i].OS == "Windows 7") {
                data[i].OS = "images/operatingSystem.gif";
            }
            else {
                data[i].OS = "";
            }

            if (data[i].assetType == 4) {
                data[i].assetType = "images/video.png";
            }
            else if (data[i].assetType == 3) {
                data[i].assetType = "images/read.png";
            }
            
            else {
                data[i].assetType = "images/download.png";
            }
        }
        $scope.UserActivities = data;

        $scope.userID= "400";
        $scope.firstName= "Michael";
        $scope.lastName= "Adams";
        $scope.email= "michaeladams@google.com";
        $scope.enrollmentID= "1028025863";
        $scope.location= "New York, New York";
        $scope.product= "MCAT";
        $scope.program = "MCAT - On Demand";
        $scope.lastActivity = "7 days ago";
        $scope.totalActivities = "240";

        $scope.UserDetails = [
           {
               "userID": "400",
               "firstName": "Michael",
               "lastName": "Adams",
               "email": "michaeladams@google.com",
               "enrollmentID": "1028025863",
               "location": "New York, New York",
               "product": "MCAT",
               "program": "MCAT - On Demand"

           },
           {
               "userID": "201",
               "firstName": "Kara",
               "lastName": "Keith",
               "email": "karaKeith@hotmail.com",
               "enrollmentID": "1028026629",
               "location": "Florida, Florida",
               "product": "GMAT",
               "program": "GMAT Advantage - Anywhere"

           }
        ];
    });
}

