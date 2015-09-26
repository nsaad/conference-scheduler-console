
angular.module('conferenceScheduleAPI').controller('NewSubtrackController', function ($scope, $location, locationParser, SubtrackResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.subtrack = $scope.subtrack || {};
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Subtracks/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        SubtrackResource.save($scope.subtrack, successCallback, errorCallback);
    };
    
    $scope.saveAndNew = function () {
    	var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Subtracks/new');
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        SubtrackResource.save($scope.subtrack, successCallback, errorCallback);
        
    	$scope.subtrack = {};
    }
    
    $scope.cancel = function() {
        $location.path("/Subtracks");
    };
});