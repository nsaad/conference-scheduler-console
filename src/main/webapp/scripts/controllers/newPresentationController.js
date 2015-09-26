
angular.module('conferenceScheduleAPI').controller('NewPresentationController', function ($scope, $location, locationParser, PresentationResource , SpeakerResource, TagResource, RoomResource, TrackResource, SubtrackResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.presentation = $scope.presentation || {};
    
    $scope.speakersList = SpeakerResource.queryAll(function(items){
        $scope.speakersSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.firstname + " " + item.surname
            });
        });
    });
    
    $scope.roomsSelectionList = RoomResource.queryAll(function() {});
    $scope.sessionTracksSelectionList = TrackResource.queryAll(function() {});
    $scope.sessionSubtracksSelectionList = {};
    
    if ($scope.presentation.sessiontrack != null) {
    	$scope.sessionSubtracksSelectionList = $scope.presentation.sessiontrack.subtracks;
    }
    
    $scope.$watch("presentation.sessiontrack", function(selection) {
        if (typeof selection != 'undefined') {
        	$scope.sessionSubtracksSelectionList = [];
            $.each(selection, function(idx,selectedItem) {
            	$scope.sessionSubtracksSelectionList = $scope.presentation.sessiontrack.subtracks;
            });
        }
    });
    
    $scope.$watch("speakersSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.presentation.speakers = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.presentation.speakers.push(collectionItem);
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
            $scope.presentation.tags = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.presentation.tags.push(collectionItem);
            });
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Presentations/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        PresentationResource.save($scope.presentation, successCallback, errorCallback);
    };
    
    $scope.saveAndNew = function () {
    	var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Presentations/new');
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        PresentationResource.save($scope.presentation, successCallback, errorCallback);
        
    	$scope.presentation = {};
    }
    
    $scope.cancel = function() {
        $location.path("/Presentations");
    };
});