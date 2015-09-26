
angular.module('conferenceScheduleAPI').controller('NewTagController', function ($scope, $location, locationParser, TagResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.tag = $scope.tag || {};
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Tags/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        TagResource.save($scope.tag, successCallback, errorCallback);
    };
    
    $scope.saveAndNew = function () {
    	var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Tags/new');
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        TagResource.save($scope.tag, successCallback, errorCallback);
        
    	$scope.tag = {};
    }
    
    $scope.cancel = function() {
        $location.path("/Tags");
    };
});