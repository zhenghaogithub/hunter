(function () {
    'use strict';
    var controllerId = 'cohunterApproved';
    //angular.module('app').controller(controllerId, ['common', 'datacontext', cohunterApproved]);

    angular.module('app').controller(controllerId,
            ['$rootScope', '$http', 'common','config','datacontext', cohunterApproved]);
    //function cohunterApproved(common, datacontext) {
    function cohunterApproved($rootScope, $http, common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.news = {
            title: 'Marvel Plate',
            description: 'Marvel Plate 2 is now in production!'
        };
        vm.cohunterApprovedCount = 0;
        vm.cohunterApproveddata = [];
        vm.title = 'Plate';
        //add later
        vm.user = "alex"
        console.log(vm.user)

        activate();

        function activate() {
            //var promises = [getOrderFormCount(), getPlateCast()];
            var promises = [getPlateData($http),getUser($http)];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated cohunterApprovedData View'); });
        }

        getPlateData($http);
        function getPlateData($http) {
            $http({method: 'GET', url: '/hunter/cohunter/ApprovedData/'}).
          then(function(response) {
            vm.status = response.status;
            vm.cohunterApprovedData = response.data;
            console.log('sucess in get cohunter ApprovedData ')
            console.log(vm.cohunterApprovedData)
          }, function(response) {
            vm.data = response.data || 'Request failed';
            vm.status = response.status;
        });
        }

        getUser($http);
        function getUser($http) {
            $http({method: 'GET', url: '/hunter/user/'}).
          then(function(response) {
            vm.status = response.status;
            vm.user = response.data[0].name;
            console.log('sucess in get User')
            console.log(vm.data)
          }, function(response) {
            vm.data = response.data || 'Request failed';
            vm.status = response.status;
        });
        }




        /*
        function getOrderFormCount() {
            return datacontext.getOrderFormCount().then(function (data)            {
                vm.cohunterApprovedCount = data;
                return vm.cohunterApprovedCount;
            });
        }

        function getPlateCast() {
            return datacontext.getPlateCast().then(function (data) {
                vm.cohunterApproveds = data;
                return vm.orderforms;
            });
        }
        */
    }
})();
