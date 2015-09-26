

angular.module('conferenceScheduleAPI').controller('EditTrackController', function($scope, $routeParams, $location, TrackResource , SubtrackResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    console.log("in edit track controller");
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.track = new TrackResource(self.original);
            SubtrackResource.queryAll(function(items) {
                $scope.subtracksSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    
                    var labelObject = {
                        value : item.id,
                        text : item.subtrackname
                    };
                    if($scope.track.subtracks){
                        $.each($scope.track.subtracks, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.subtracksSelection.push(labelObject);
                                $scope.track.subtracks.push(wrappedObject);
                            }
                        });
                        self.original.subtracks = $scope.track.subtracks;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Tracks");
        };
        TrackResource.get({TrackId:$routeParams.TrackId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.track);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.track.$update(successCallback, errorCallback);
    };
    
    $scope.saveAndNew = function () {
    	var successCallback = function(){
    		$location.path('/Tracks/new');
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.track.$update(successCallback, errorCallback);
        
    	$scope.track = {};
    }

    $scope.cancel = function() {
        $location.path("/Tracks");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Tracks");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.track.$remove(successCallback, errorCallback);
    };
    
    $scope.subtracksSelection = $scope.subtracksSelection || [];
    $scope.$watch("subtracksSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.track) {
            $scope.track.subtracks = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.track.subtracks.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});