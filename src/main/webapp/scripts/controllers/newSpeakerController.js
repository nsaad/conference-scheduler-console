
angular.module('conferenceScheduleAPI').controller('NewSpeakerController', function ($scope, $location, locationParser, SpeakerResource , PresentationResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.speaker = $scope.speaker || {};
    
    $scope.presentationsList = PresentationResource.queryAll(function(items){
        $scope.presentationsSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.title
            });
        });
    });
    $scope.$watch("presentationsSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.speaker.presentations = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.speaker.presentations.push(collectionItem);
            });
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Speakers/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        SpeakerResource.save($scope.speaker, successCallback, errorCallback);
    };
    
    $scope.saveAndNew = function () {
    	var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Speakers/new');
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        SpeakerResource.save($scope.speaker, successCallback, errorCallback);
        
    	$scope.speaker = {};
    }
    
    $scope.cancel = function() {
        $location.path("/Speakers");
    };
});