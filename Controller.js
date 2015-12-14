angular.module('appControllers').controller('appController', appController)

function appController($scope, $rootScope) {

    $scope.documentClicked = function (event) {
        $rootScope.navigationalMenuIsClicked = false;

        if (angular.element(event.target.parentElement.parentElement)[0].className == 'nav-menu') {
            $rootScope.navigationalMenuIsClicked = true;

        }

        return true;
    }

}

angular.module('appControllers').controller('classController', classController)

function classController($scope, classService, $location, $filter, tempStorage) {
    vm = this;
    var schoolClassNameArray = [];
    classService.getData().then(function (data) {
        vm.classdetails = data.schoolclasses;

    })
    vm.showthisdropdown = function (which, index) {
        vm.studentInfoDropdown = [];
        if (which == "studentInfo")
            vm.studentInfoDropdown[index] = true;
    }
    vm.linktorosterspage = function (url, schoolclassuuid) {
        tempStorage.set('schoolclassuuid', schoolclassuuid);
        param = $filter('beautifyUrl')(url)
        $location.path('rosters/' + param);

    }
    vm.passToTempStorage = function (passthisSchoolName, passthisSchoolUuid) {
        schoolClassNameArray.push({
            name: passthisSchoolName,
            uuid: passthisSchoolUuid
        });
        tempStorage.set('schoolClassNameArray', schoolClassNameArray);
        return true;
    }
    
    

}


angular.module('appControllers').controller('rosterController', rosterController)

function rosterController($scope, $http, rosterService, $filter, $routeParams, $filter, $location, tempStorage, classService, $interval) {
    vm = this;

    vm.schoolClassNameArray = tempStorage.get('schoolClassNameArray');
    vm.schoolClassName = $filter('capitalize')($filter('uglifyUrl')($routeParams.schoolName));
    if (!vm.schoolClassNameArray) {
        var schoolClassNameArray = [];
        classService.getData().then(function (data) {
            angular.forEach(data.schoolclasses, function (item) {
                var temp = $filter('capitalize')($filter('uglifyUrl')(item.schoolclassName));
                if (temp == vm.schoolClassName) {

                    tempStorage.set('schoolclassuuid', item.schoolclassUuid);
                }
                schoolClassNameArray.push({
                    name: item.schoolclassName,
                    uuid: item.schoolclassUuid
                });
            })
            tempStorage.set('schoolClassNameArray', schoolClassNameArray);
            vm.schoolClassNameArray = schoolClassNameArray;

        });
    }
    
    vm.student ={"ethinicityOption":"","gender":"",frl:"",ell:"",dyslexic:""}
    rosterService.getPopupDetails().then(function(data){
    
        vm.demographicsOptions = data.demographics;
        console.log(vm.demographicsOptions);
        vm.ethinicityOptions = vm.demographicsOptions[0].demographicOptions;
        vm.genderOptions = vm.demographicsOptions[1].demographicOptions;
        vm.ellOptions = vm.demographicsOptions[2].demographicOptions;
        vm.frlOptions = vm.demographicsOptions[3].demographicOptions;
        vm.spedOptions = vm.demographicsOptions[4].demographicOptions;
        vm.dyslexicOptions = vm.demographicsOptions[12].demographicOptions;
        
    
    });

    var tempIntervalforgettingSchoolClassUUID = $interval(function () {

        if (tempStorage.get('schoolclassuuid')) {
            rosterService.getData().then(function (data) {

                vm.students = data.students;
            })
            $interval.cancel(tempIntervalforgettingSchoolClassUUID);
        } else {
            console.log("waiting  for school uuid number for roster controller");
        }
    }, 1000)




    $scope.selectedText = {
        ela: false,
        firstName: "",
        grade: "",
        lastname: "",
        math: false,
        password: "",
        studentId: "",
        username: ""
    };
    rosterService.getNewStudentDataService().then(function (data) {
        vm.items = data;
    })

    vm.grades = [{
        "name": "Select"
    }, {
        "name": "1st"
    }, {
        "name": "2nd"
    }, {
        "name": "3rd"
    }, {
        "name": "4th"
    }, {
        "name": "5th"
    }, {
        "name": "6th"
    }];

    vm.showthisdropdown = function (which, index) {


        vm.studentInfoDropdown = [];

        vm.iconBased = false;
        vm.showAddNew = false;
        if (which == "studentInfo")
            vm.studentInfoDropdown[index] = true;
        if (which == "iconBased")
            vm.iconBased = true;
        if (which == "addNew")
            vm.showAddNew = true;
    }

    vm.changeSchoolClassName = function (url, schoolclassuuid) {
        tempStorage.set('schoolclassuuid', schoolclassuuid);
        param = $filter('beautifyUrl')(url)
        $location.path('rosters/' + param);

    }
    vm.sendDataToServer = function () {
        rosterService.postSelectedText($scope.selectedText).then(function (data) {
            if (data) {

                alert("successfully inserted");
                vm.students.push($scope.selectedText);
                $scope.selectedText = {
                    ela: false,
                    firstName: "",
                    grade: "",
                    lastName: "",
                    math: false,
                    password: "",
                    studentId: "",
                    username: ""
                };
            } else {
                alert("unsuccessful");
            }
        });

    }

     vm.PopThisStudentDetail = function (firstname, lastname) {
        vm.studentFullName = firstname + " " + lastname;
    }

}



angular.module('appControllers').controller('skillsReportController', skillsReportController)

function skillsReportController($scope, skillsReportService) {
    vm = this;
    skillsReportService.getData().then(function (data) {
        vm.skillsDetails = data.skillReportRows;
    })


}
