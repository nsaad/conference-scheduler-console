angular.module('conferenceScheduleAPI').factory('SpeakerResource', function($resource){
    var resource = $resource('../ConferenceSchedule-API/rest/speakers/:SpeakerId',{SpeakerId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});