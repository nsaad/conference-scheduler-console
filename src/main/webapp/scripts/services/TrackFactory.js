angular.module('conferenceScheduleAPI').factory('TrackResource', function($resource){
    var resource = $resource('../ConferenceSchedule-API/rest/tracks/:TrackId',{TrackId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});