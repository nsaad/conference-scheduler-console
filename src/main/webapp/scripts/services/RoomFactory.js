angular.module('conferenceScheduleAPI').factory('RoomResource', function($resource){
    var resource = $resource('../ConferenceSchedule-API/rest/rooms/:RoomId',{RoomId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});