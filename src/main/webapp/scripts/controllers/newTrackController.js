
angular.module('conferenceScheduleAPI').controller('NewTrackController', function ($scope, $location, locationParser, TrackResource , SubtrackResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.track = $scope.track || {};
    
    $scope.subtracksList = SubtrackResource.queryAll(function(items){
        $scope.subtracksSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.subtrackname
            });
        });
    });
    $scope.$watch("subtracksSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.track.subtracks = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.track.subtracks.push(collectionItem);
            });
        }
    });
    

    $scope.save = function() {
    	var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Tracks/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        TrackResource.save($scope.track, successCallback, errorCallback);
    };
    
    $scope.saveAndNew = function () {
    	var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Tracks/new');
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        TrackResource.save($scope.track, successCallback, errorCallback);
        
    	$scope.track = {};
    }
    
    $scope.cancel = function() {
        $location.path("/Tracks");
    };
});