

angular.module('conferenceScheduleAPI').controller('EditSubtrackController', function($scope, $routeParams, $location, SubtrackResource ) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.subtrack = new SubtrackResource(self.original);
        };
        var errorCallback = function() {
            $location.path("/Subtracks");
        };
        SubtrackResource.get({SubtrackId:$routeParams.SubtrackId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.subtrack);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.subtrack.$update(successCallback, errorCallback);
    };
    
    $scope.saveAndNew = function () {
    	var successCallback = function(){
    		$location.path('/Subtracks/new');
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.subtrack.$update(successCallback, errorCallback);
        
    	$scope.subtrack = {};
    }

    $scope.cancel = function() {
        $location.path("/Subtracks");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Subtracks");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.subtrack.$remove(successCallback, errorCallback);
    };
    
    
    $scope.get();
});