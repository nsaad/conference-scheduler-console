

angular.module('conferenceScheduleAPI').controller('EditRoomController', function($scope, $routeParams, $location, RoomResource ) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.room = new RoomResource(self.original);
        };
        var errorCallback = function() {
            $location.path("/Rooms");
        };
        RoomResource.get({RoomId:$routeParams.RoomId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.room);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.room.$update(successCallback, errorCallback);
    };
    
    $scope.saveAndNew = function () {
    	var successCallback = function(){
    		$location.path('/Rooms/new');
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.room.$update(successCallback, errorCallback);
        
    	$scope.room = {};
    }

    $scope.cancel = function() {
        $location.path("/Rooms");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Rooms");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.room.$remove(successCallback, errorCallback);
    };
    
    
    $scope.get();
});