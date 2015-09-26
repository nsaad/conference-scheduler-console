
angular.module('conferenceScheduleAPI').controller('NewEventController', function ($scope, $location, locationParser, EventResource , RoomResource, TagResource, TrackResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.event = $scope.event || {};
    
    $scope.roomsList = RoomResource.queryAll(function(items){
        $scope.roomsSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.roomname
            });
        });
    });
    $scope.$watch("roomsSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.event.rooms = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.event.rooms.push(collectionItem);
            });
        }
    });
    
    $scope.tagsList = TagResource.queryAll(function(items){
        $scope.tagsSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.tagname
            });
        });
    });
    $scope.$watch("tagsSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.event.tags = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.event.tags.push(collectionItem);
            });
        }
    });
    
    $scope.tracksList = TrackResource.queryAll(function(items){
        $scope.tracksSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.trackname
            });
        });
    });
    $scope.$watch("tracksSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.event.tracks = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.event.tracks.push(collectionItem);
            });
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Events/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        EventResource.save($scope.event, successCallback, errorCallback);
    };
    
    $scope.saveAndNew = function () {
    	var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Events/new');
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        EventResource.save($scope.event, successCallback, errorCallback);
        
    	$scope.event = {};
    }
    
    $scope.cancel = function() {
        $location.path("/Events");
    };
});