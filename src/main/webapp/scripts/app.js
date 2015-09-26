'use strict';

angular.module('conferenceScheduleAPI',['ngRoute','ngResource'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/',{templateUrl:'views/landing.html',controller:'LandingPageController'})
      .when('/Events',{templateUrl:'views/Event/search.html',controller:'SearchEventController'})
      .when('/Events/new',{templateUrl:'views/Event/detail.html',controller:'NewEventController'})
      .when('/Events/edit/:EventId',{templateUrl:'views/Event/detail.html',controller:'EditEventController'})
      .when('/Presentations',{templateUrl:'views/Presentation/search.html',controller:'SearchPresentationController'})
      .when('/Presentations/new',{templateUrl:'views/Presentation/detail.html',controller:'NewPresentationController'})
      .when('/Presentations/edit/:PresentationId',{templateUrl:'views/Presentation/detail.html',controller:'EditPresentationController'})
      .when('/Rooms',{templateUrl:'views/Room/search.html',controller:'SearchRoomController'})
      .when('/Rooms/new',{templateUrl:'views/Room/detail.html',controller:'NewRoomController'})
      .when('/Rooms/edit/:RoomId',{templateUrl:'views/Room/detail.html',controller:'EditRoomController'})
      .when('/Speakers',{templateUrl:'views/Speaker/search.html',controller:'SearchSpeakerController'})
      .when('/Speakers/new',{templateUrl:'views/Speaker/detail.html',controller:'NewSpeakerController'})
      .when('/Speakers/edit/:SpeakerId',{templateUrl:'views/Speaker/detail.html',controller:'EditSpeakerController'})
      .when('/Subtracks',{templateUrl:'views/Subtrack/search.html',controller:'SearchSubtrackController'})
      .when('/Subtracks/new',{templateUrl:'views/Subtrack/detail.html',controller:'NewSubtrackController'})
      .when('/Subtracks/edit/:SubtrackId',{templateUrl:'views/Subtrack/detail.html',controller:'EditSubtrackController'})
      .when('/Tags',{templateUrl:'views/Tag/search.html',controller:'SearchTagController'})
      .when('/Tags/new',{templateUrl:'views/Tag/detail.html',controller:'NewTagController'})
      .when('/Tags/edit/:TagId',{templateUrl:'views/Tag/detail.html',controller:'EditTagController'})
      .when('/Tracks',{templateUrl:'views/Track/search.html',controller:'SearchTrackController'})
      .when('/Tracks/new',{templateUrl:'views/Track/detail.html',controller:'NewTrackController'})
      .when('/Tracks/edit/:TrackId',{templateUrl:'views/Track/detail.html',controller:'EditTrackController'})
      .when('/Users',{templateUrl:'views/User/search.html',controller:'SearchUserController'})
      .when('/Users/new',{templateUrl:'views/User/detail.html',controller:'NewUserController'})
      .when('/Users/edit/:UserId',{templateUrl:'views/User/detail.html',controller:'EditUserController'})
      .otherwise({
        redirectTo: '/'
      });
  }])
  .controller('LandingPageController', function LandingPageController() {
  })
  .controller('NavController', function NavController($scope, $location) {
    $scope.matchesRoute = function(route) {
        var path = $location.path();
        return (path === ("/" + route) || path.indexOf("/" + route + "/") == 0);
    };
  });
