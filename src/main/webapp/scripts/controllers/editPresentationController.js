

angular.module('conferenceScheduleAPI').controller('EditPresentationController', function($scope, $routeParams, $location, PresentationResource , SpeakerResource, TagResource, RoomResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.presentation = new PresentationResource(self.original);
            SpeakerResource.queryAll(function(items) {
                $scope.speakersSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };

                    var labelObject = {
                        value : item.id,
                        text : item.firstname + " " + item.surname
                    };
                    if($scope.presentation.speakers){
                        $.each($scope.presentation.speakers, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.speakersSelection.push(labelObject);
                                $scope.presentation.speakers.push(wrappedObject);
                            }
                        });
                        self.original.speakers = $scope.presentation.speakers;
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
                    if($scope.presentation.tags){
                        $.each($scope.presentation.tags, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.tagsSelection.push(labelObject);
                                $scope.presentation.tags.push(wrappedObject);
                            }
                        });
                        self.original.tags = $scope.presentation.tags;
                    }
                    return labelObject;
                });
            });
            $scope.roomsSelectionList = RoomResource.queryAll(function() {});
        };
        var errorCallback = function() {
            $location.path("/Presentations");
        };
        PresentationResource.get({PresentationId:$routeParams.PresentationId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.presentation);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.presentation.$update(successCallback, errorCallback);
    };
    
    $scope.saveAndNew = function () {
    	var successCallback = function(){
    		$location.path('/Presentations/new');
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.presentation.$update(successCallback, errorCallback);
        
    	$scope.presentation = {};
    }

    $scope.cancel = function() {
        $location.path("/Presentations");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Presentations");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.presentation.$remove(successCallback, errorCallback);
    };
    
    $scope.speakersSelection = $scope.speakersSelection || [];
    $scope.$watch("speakersSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.presentation) {
            $scope.presentation.speakers = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.presentation.speakers.push(collectionItem);
            });
        }
    });
    $scope.tagsSelection = $scope.tagsSelection || [];
    $scope.$watch("tagsSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.presentation) {
            $scope.presentation.tags = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.presentation.tags.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});