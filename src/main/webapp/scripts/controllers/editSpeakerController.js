

angular.module('conferenceScheduleAPI').controller('EditSpeakerController', function($scope, $routeParams, $location, SpeakerResource , PresentationResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
        	
            self.original = data;
            $scope.speaker = new SpeakerResource(self.original);
            PresentationResource.queryAll(function(items) {
                $scope.presentationsSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    
                    var labelObject = {
                        value : item.id,
                        text : item.title
                    };
                    if($scope.speaker.presentations){
                        $.each($scope.speaker.presentations, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.presentationsSelection.push(labelObject);
                                $scope.speaker.presentations.push(wrappedObject);
                            }
                        });
                        self.original.presentations = $scope.speaker.presentations;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Speakers");
        };
        SpeakerResource.get({SpeakerId:$routeParams.SpeakerId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.speaker);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.speaker.$update(successCallback, errorCallback);
    };
    
    $scope.saveAndNew = function () {
    	var successCallback = function(){
    		$location.path('/Speakers/new');
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.speaker.$update(successCallback, errorCallback);
        
    	$scope.speaker = {};
    }

    $scope.cancel = function() {
        $location.path("/Speakers");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Speakers");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.speaker.$remove(successCallback, errorCallback);
    };
    
    $scope.presentationsSelection = $scope.presentationsSelection || [];
    $scope.$watch("presentationsSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.speaker) {
            $scope.speaker.presentations = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.speaker.presentations.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});