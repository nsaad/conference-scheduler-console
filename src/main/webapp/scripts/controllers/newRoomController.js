
angular.module('conferenceScheduleAPI').controller('NewRoomController', function ($scope, $location, locationParser, RoomResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.room = $scope.room || {};
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Rooms/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        RoomResource.save($scope.room, successCallback, errorCallback);
    };
    
    $scope.saveAndNew = function () {
    	var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Rooms/new');
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        RoomResource.save($scope.room, successCallback, errorCallback);
        
    	$scope.room = {};
    }
    
    $scope.cancel = function() {
        $location.path("/Rooms");
    };
});