angular.module('conferenceScheduleAPI').factory('SubtrackResource', function($resource){
    var resource = $resource('../ConferenceSchedule-API/rest/subtracks/:SubtrackId',{SubtrackId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});