

angular.module('conferenceScheduleAPI').controller('EditTagController', function($scope, $routeParams, $location, TagResource ) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.tag = new TagResource(self.original);
        };
        var errorCallback = function() {
            $location.path("/Tags");
        };
        TagResource.get({TagId:$routeParams.TagId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.tag);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.tag.$update(successCallback, errorCallback);
    };
    
    $scope.saveAndNew = function () {
    	var successCallback = function(){
    		$location.path('/Tags/new');
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.tag.$update(successCallback, errorCallback);
        
    	$scope.tag = {};
    }

    $scope.cancel = function() {
        $location.path("/Tags");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Tags");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.tag.$remove(successCallback, errorCallback);
    };
    
    
    $scope.get();
});