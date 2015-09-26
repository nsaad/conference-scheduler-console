angular.module('conferenceScheduleAPI').factory('EventResource', function($resource){
    var resource = $resource('../ConferenceSchedule-API/rest/events/:EventId',{EventId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});