(function () {
    'use strict';
    var controllerId = 'createteam';
    var myApp =angular.module('app');
    myApp.controller(controllerId,
            ['common', 'datacontext', createteam]);

    function createteam(common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.createteam = [];
        vm.maa = [];
        vm.title = 'CreateTeam';

        activate();

        function activate() {
            //var promises = [getCreateTeamsCast(), getMAA()];
            var promises = [getCreateTeamCast()];
            common.activateController(promises, controllerId)
                .then(function () {
                    log('Activated CreateTeam View');
                });
        }

/*
        function getMAA() {
            return datacontext.getMAA().then(function (data) {
//                vm.maa = data.data[0].data.results;
                vm.maa = data;
                return vm.maa;
            });
        }
*/

        function getCreateTeamCast() {
            return datacontext.getCreateTeamCast().then(function (data) {
                vm.createteam = data;
                return vm.createteam;
            });
        }
    }


    myApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
    }]);

    myApp.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
    }]);

    myApp.controller('myCtrl', ['$scope', 'fileUpload', function($scope, fileUpload){
    
    $scope.uploadFile = function(){
        var file = $scope.myFile;
        console.log('file is ' );
        console.dir(file);
        var uploadUrl = "./fileUpload/";
        fileUpload.uploadFileToUrl(file, uploadUrl);
    };
    }]);

})();
