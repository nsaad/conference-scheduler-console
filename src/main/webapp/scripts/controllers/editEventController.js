

angular.module('conferenceScheduleAPI').controller('EditEventController', function($scope, $routeParams, $location, EventResource , RoomResource, TagResource, TrackResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.event = new EventResource(self.original);
            RoomResource.queryAll(function(items) {
                $scope.roomsSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.roomname
                    };
                    if($scope.event.rooms){
                        $.each($scope.event.rooms, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.roomsSelection.push(labelObject);
                                $scope.event.rooms.push(wrappedObject);
                            }
                        });
                        self.original.rooms = $scope.event.rooms;
                    }
                    return labelObject;
                });
            });
            TagResource.queryAll(function(items) {
                $scope.tagsSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.tagname
                    };
                    if($scope.event.tags){
                        $.each($scope.event.tags, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.tagsSelection.push(labelObject);
                                $scope.event.tags.push(wrappedObject);
                            }
                        });
                        self.original.tags = $scope.event.tags;
                    }
                    return labelObject;
                });
            });
            TrackResource.queryAll(function(items) {
                $scope.tracksSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.trackname
                    };
                    if($scope.event.tracks){
                        $.each($scope.event.tracks, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.tracksSelection.push(labelObject);
                                $scope.event.tracks.push(wrappedObject);
                            }
                        });
                        self.original.tracks = $scope.event.tracks;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Events");
        };
        EventResource.get({EventId:$routeParams.EventId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.event);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.event.$update(successCallback, errorCallback);
    };
    
    $scope.saveAndNew = function () {
    	var successCallback = function(){
    		$location.path('/Events/new');
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.event.$update(successCallback, errorCallback);
        
    	$scope.event = {};
    }

    $scope.cancel = function() {
        $location.path("/Events");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Events");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.event.$remove(successCallback, errorCallback);
    };
    
    $scope.roomsSelection = $scope.roomsSelection || [];
    $scope.$watch("roomsSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.event) {
            $scope.event.rooms = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.event.rooms.push(collectionItem);
            });
        }
    });
    $scope.tagsSelection = $scope.tagsSelection || [];
    $scope.$watch("tagsSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.event) {
            $scope.event.tags = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.event.tags.push(collectionItem);
            });
        }
    });
    $scope.tracksSelection = $scope.tracksSelection || [];
    $scope.$watch("tracksSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.event) {
            $scope.event.tracks = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.event.tracks.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});