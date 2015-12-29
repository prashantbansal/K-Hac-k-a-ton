function UserListCtrl($scope)
{
    $scope.UserActivities = [
        {
            "info": "Clicked on Assignment", "time": "5 Min"
        },
        {
            "info": "Clicked on Video", "time": "3 Min"
        }
    ];
    $scope.hello = "Hello, World!";
}

function UserListCtrlCall($scope, $http) {
    $http.defaults.useXDomain = true;
    $http.get('http://localhost:3000/events/topprograms/3').success(function (data) {
        $scope.UserActivities = data;
    });

   // $scope.orderProp = 'age';
}

//function UserListCtrlCall($scope, $http, $resource) {
//    $http.defaults.useXDomain = true;
//    Something = $resource("http://ip-address/something/:id", { id: "@id" });
//    $scope.something = Something.get({ id: 1 });
//});

UserListCtrlCall.$inject = ['$scope', '$http'];