(function () {
    'use strict';
    var controllerId = 'cohunterFailed';
    //angular.module('app').controller(controllerId, ['common', 'datacontext', cohunterFailed]);

    angular.module('app').controller(controllerId,
            ['$rootScope', '$http', 'common','config','datacontext', cohunterFailed]);
    //function cohunterFailed(common, datacontext) {
    function cohunterFailed($rootScope, $http, common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.news = {
            title: 'Marvel Plate',
            description: 'Marvel Plate 2 is now in production!'
        };
        vm.cohunterFailedCount = 0;
        vm.cohunterFaileddata = [];
        vm.title = 'Plate';
        //add later
        vm.user = "alex"
        console.log(vm.user)

        activate();

        function activate() {
            //var promises = [getOrderFormCount(), getPlateCast()];
            var promises = [getPlateData($http),getUser($http)];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated cohunterFailedData View'); });
        }

        getPlateData($http);
        function getPlateData($http) {
            $http({method: 'GET', url: '/hunter/cohunter/FailedData/'}).
          then(function(response) {
            vm.status = response.status;
            vm.cohunterFailedData = response.data;
            console.log('sucess in get cohunter FailedData ')
            console.log(vm.cohunterFailedData)
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
                vm.cohunterFailedCount = data;
                return vm.cohunterFailedCount;
            });
        }

        function getPlateCast() {
            return datacontext.getPlateCast().then(function (data) {
                vm.cohunterFaileds = data;
                return vm.orderforms;
            });
        }
        */
    }
})();
