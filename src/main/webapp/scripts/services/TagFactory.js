angular.module('conferenceScheduleAPI').factory('TagResource', function($resource){
    var resource = $resource('../ConferenceSchedule-API/rest/tags/:TagId',{TagId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});