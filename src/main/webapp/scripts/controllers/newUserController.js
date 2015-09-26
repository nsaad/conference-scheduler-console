
angular.module('conferenceScheduleAPI').controller('NewUserController', function ($scope, $location, locationParser, UserResource , EventResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.user = $scope.user || {};
    
    $scope.eventsList = EventResource.queryAll(function(items){
        $scope.eventsSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.title
            });
        });
    });
    $scope.$watch("eventsSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.user.events = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.user.events.push(collectionItem);
            });
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Users/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        UserResource.save($scope.user, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Users");
    };
    
    $scope.saveAndNew = function () {
    	var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Users/new');
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        UserResource.save($scope.user, successCallback, errorCallback);
        
    	$scope.user = {};
    }
});