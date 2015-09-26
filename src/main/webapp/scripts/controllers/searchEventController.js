

angular.module('conferenceScheduleAPI').controller('SearchEventController', function($scope, $http, EventResource , RoomResource, TagResource, TrackResource) {

    $scope.search={};
    $scope.currentPage = 0;
    $scope.pageSize= 10;
    $scope.searchResults = [];
    $scope.filteredResults = [];
    $scope.pageRange = [];
    $scope.numberOfPages = function() {
        var result = Math.ceil($scope.filteredResults.length/$scope.pageSize);
        var max = (result == 0) ? 1 : result;
        $scope.pageRange = [];
        for(var ctr=0;ctr<max;ctr++) {
            $scope.pageRange.push(ctr);
        }
        return max;
    };

    $scope.performSearch = function() {
        $scope.searchResults = EventResource.queryAll(function(){
            $scope.numberOfPages();
        });
    };
    
    $scope.previous = function() {
       if($scope.currentPage > 0) {
           $scope.currentPage--;
       }
    };
    
    $scope.next = function() {
       if($scope.currentPage < ($scope.numberOfPages() - 1) ) {
           $scope.currentPage++;
       }
    };
    
    $scope.setPage = function(n) {
       $scope.currentPage = n;
    };
    
    $scope.remove = function (item) {
    	var successCallback = function() {
            $scope.displayError = false;
            $scope.searchResults.splice($scope.searchResults.indexOf(item), 1);
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        item.$remove(successCallback, errorCallback);
        
    };

    $scope.performSearch();
});