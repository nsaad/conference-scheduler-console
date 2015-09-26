

angular.module('conferenceScheduleAPI').controller('EditUserController', function($scope, $routeParams, $location, UserResource , EventResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.user = new UserResource(self.original);
            EventResource.queryAll(function(items) {
                $scope.eventsSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.user.events){
                        $.each($scope.user.events, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.eventsSelection.push(labelObject);
                                $scope.user.events.push(wrappedObject);
                            }
                        });
                        self.original.events = $scope.user.events;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Users");
        };
        UserResource.get({UserId:$routeParams.UserId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.user);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.user.$update(successCallback, errorCallback);
    };
    
    $scope.saveAndNew = function () {
    	var successCallback = function(){
    		$location.path('/Users/new');
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.user.$update(successCallback, errorCallback);
        
    	$scope.user = {};
    }

    $scope.cancel = function() {
        $location.path("/Users");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Users");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.user.$remove(successCallback, errorCallback);
    };
    
    $scope.eventsSelection = $scope.eventsSelection || [];
    $scope.$watch("eventsSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.user) {
            $scope.user.events = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.user.events.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});