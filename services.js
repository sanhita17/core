
angular.module('appServices').service('classService',classService)
function classService ($http,$q){
    classService ={};
    classService.getData = function(){
        var deferred = $q.defer();
        var credentials={
                            "jsonrpc": "2.0",
                            "id" : "123",
                            "method" : "getSchoolClassList",
                            "params" : [{"classUuid":"88881AA5-F57A-40ED-886C-FC3AA2300009", 
                            "teacherUuid":"12345AA5-F57A-40ED-886C-FC3AA2300009"}]

                           };

        $http.post("/ws/TeacherService.json",credentials,{headers: {'Content-Type': 'application/json',"CSESSIONID": window.globals ? window.globals.csessionid : ''}})
           
            .success(function(data, status, header, config){
                     deferred.resolve(data.result);
               });
         
            return deferred.promise;
    }
    
    return classService
}


angular.module('appServices').service('rosterService',rosterService)
function rosterService ($http,$q,tempStorage){
    rosterService ={};
    
    rosterService.getData = function(){
        var deferred = $q.defer();

        var credentials={
                            "jsonrpc": "2.0",
                            "id" : "123",
                            "method" : "getRoster",
                            "params" : [{"classUuid":tempStorage.get('schoolclassuuid'), 
                            "studentUuid":"12345AA5-F57A-40ED-886C-FC3AA2300009"}]
                           };
$http.post("/ws/TeacherService.json",credentials,{headers: {'Content-Type': 'application/json',"CSESSIONID": window.globals ? window.globals.csessionid : ''}})
       
            .success(function(data, status, header, config){

                     deferred.resolve(data.result);
               });
         
            return deferred.promise;
    };
    rosterService.tempData = function(){
        var deferred = $q.defer();
        
        var credentials={
                              "jsonrpc": "2.0",
                              "id" : "123",
                              "method" : "getStudent",
                              "params" : [{"studentUuids":["69EB81AE-05F0-4D98-9031-0F01111E440B"], 
                              "includeDemographics":true}]
                            }
$http.post("/ws/TeacherService.json",credentials,{headers: {'Content-Type': 'application/json',"CSESSIONID": window.globals ? window.globals.csessionid : ''}})
       
            .success(function(data, status, header, config){
                    
                     deferred.resolve(data.result);
               });
         
            return deferred.promise;
    };
    rosterService.getNewStudentDataService = function(){
        var deferred = $q.defer();
        var credentials={
                             "jsonrpc": "2.0",
                             "id" : "123",
                             "method" : "getSkillsSummaryReport",
                             "params" : [{"classUuid":"88881AA5-F57A-40ED-886C-FC3AA2300009", "studentUuid":"12345AA5-F57A-40ED-886C-FC3AA2300009"}]
                           };
        $http.get("./resources/views/directives/dropdown-for-roster/student.json")
            .success(function(data, status, header, config){
                    
                     deferred.resolve(data.result);
               });
         
            return deferred.promise;
    }
    
    
 rosterService.postSelectedText =function(selectedText){
        var deferred = $q.defer();
            var credentials={
                            "jsonrpc": "2.0",
                            "id" : "123",
                            "method" : "getRoster",
                            "params" : [{"classUuid":tempStorage.get('schoolclassuuid'), 
                            "studentUuid":"12345AA5-F57A-40ED-886C-FC3AA2300009"}],
                            "selectedText":JSON.stringify(selectedText) 
                           };
                deferred.resolve(true);
                                       
            return deferred.promise;
    }
    
 rosterService.getPopupDetails = function(){
     
     var deferred = $q.defer();
        var credentials={
                             "jsonrpc": "2.0",
                             "id" : "123",
                             "method" : "getDemographicsList",
                             "params" : [{}]
                           };
           
            $http.post("/ws/TeacherService.json",credentials,{headers: {'Content-Type': 'application/json',"CSESSIONID": window.globals ? window.globals.csessionid : ''}})
           //$http.get("./resources/json/adminApp/rosterPopup.json")
            .success(function(data, status, header, config){
                  
                     deferred.resolve(data.result);
               });
         
            return deferred.promise;
 
 }
    return rosterService
}


angular.module('appServices').service('studentHistoryService',studentHistoryService)
function studentHistoryService ($http,$q){
    studentHistoryService ={};
    studentHistoryService.getData = function(){
        var deferred = $q.defer();
        var credentials={
                             "jsonrpc": "2.0",
                             "id" : "123",
                             "method" : "getSkillsSummaryReport",
                             "params" : [{"classUuid":"88881AA5-F57A-40ED-886C-FC3AA2300009", "studentUuid":"12345AA5-F57A-40ED-886C-FC3AA2300009"}]
                           }; 
           $http.get("./resources/json/teacherDashboard/studentHistory.json")
            .success(function(data, status, header, config){
                     deferred.resolve(data.result);
               });
         
            return deferred.promise;
    }
    studentHistoryService.getTableData = function(){
        var deferred = $q.defer();
        var credentials={
                             "jsonrpc": "2.0",
                             "id" : "123",
                             "method" : "getSkillsSummaryReport",
                             "params" : [{"classUuid":"88881AA5-F57A-40ED-886C-FC3AA2300009", "studentUuid":"12345AA5-F57A-40ED-886C-FC3AA2300009"}]
                           };
           $http.get("./resources/json/adminApp/studentHistory.json")
            .success(function(data, status, header, config){
                     deferred.resolve(data.result);
               });
         
            return deferred.promise;
    }
    
    return studentHistoryService
}


angular.module('appServices').service('recentActivityService',recentActivityService)
function recentActivityService ($http,$q){
    recentActivityService ={};
    recentActivityService.getTableData = function(){
        var deferred = $q.defer();
        var credentials={
                             "jsonrpc": "2.0",
                             "id" : "123",
                             "method" : "getSkillsSummaryReport",
                             "params" : [{"classUuid":"88881AA5-F57A-40ED-886C-FC3AA2300009", "studentUuid":"12345AA5-F57A-40ED-886C-FC3AA2300009"}]
                           };
           
            //$http.post("/ws/ReportService.json",credentials)
           $http.get("./resources/json/adminApp/recentactivity.json")
            .success(function(data, status, header, config){
                     deferred.resolve(data.result);
               });
         
            return deferred.promise;
    }
    
    return recentActivityService
}


angular.module('appServices').service('tempStorage',tempStorage)
function tempStorage (){

 tempVariables = {};
    
var tempStorage = {};
    
    tempStorage.get = function(field){
    
    return tempVariables[field];
    }

    tempStorage.set = function(field,value){
    tempVariables[field] = value;
    return true;
    }

    return tempStorage;
}

angular.module('appServices').service('homePageService', homePageService)

function homePageService($http, $q) {
    homePageService = {};
    homePageService.getStudentDetails = function(textFor) {
        console.log(textFor);
        var deferred = $q.defer();
        var credentials = {
            "jsonrpc": "2.0",
            "id": "123",
            "method": "getSkillsSummaryReport",
            "params": [{
                "classUuid": "88881AA5-F57A-40ED-886C-FC3AA2300009",
                "studentUuid": "12345AA5-F57A-40ED-886C-FC3AA2300009"
            }]
        };

        //$http.post("/ws/ReportService.json",credentials)
        $http.get("./resources/json/adminApp/homepage-" + textFor + ".json")
            .success(function(data, status, header, config) {
                deferred.resolve(data.result);
            });

        return deferred.promise;
    };
    homePageService.getDropdowns = function() {
        var deferred = $q.defer();
        var credentials = {
            "jsonrpc": "2.0",
            "id": "123",
            "method": "getSkillsSummaryReport",
            "params": [{
                "classUuid": "88881AA5-F57A-40ED-886C-FC3AA2300009",
                "studentUuid": "12345AA5-F57A-40ED-886C-FC3AA2300009"
            }]
        };

        //$http.post("/ws/ReportService.json",credentials)
        $http.get("./resources/json/adminApp/homePageDropdown.json")

            .success(function(data, status, header, config) {
                console.log(data);
                deferred.resolve(data.result);
            });

        return deferred.promise;
    }

    return homePageService;

}
services.js
Open with
4 of 11 items
home.tpl.htmlapp.csscontroller.jsservices.jshomepage-1.jsonhomepage-2.jsonhomepage-3.jsonhomepage-4.jsonhomepage-5.jsonhomepage-6.jsonhomepage-7.jsonDisplaying services.js.
