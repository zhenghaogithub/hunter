(function () {
    'use strict';
    var controllerId = 'plate';
    //angular.module('app').controller(controllerId, ['common', 'datacontext', plate]);

    angular.module('app').controller(controllerId,
            ['$rootScope', '$http', 'common','config','datacontext', plate]);
    //function plate(common, datacontext) {
    function plate($rootScope, $http, common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.news = {
            title: 'Marvel Plate',
            description: 'Marvel Plate 2 is now in production!'
        };
        vm.plateCount = 0;
        vm.platedata = [];
        vm.title = 'Plate';
        //add later
        vm.user = "alex"
        console.log(vm.user)

        activate();

        function activate() {
            //var promises = [getOrderFormCount(), getPlateCast()];
            var promises = [getPlateData($http),getUser($http)];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated platedata View'); });
        }

        getPlateData($http);
        function getPlateData($http) {
            $http({method: 'GET', url: '/hunter/platedata/'}).
          then(function(response) {
            vm.status = response.status;
            vm.platedata = response.data;
            console.log('sucess in get platedata ')
            console.log(vm.platedata)
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
                vm.plateCount = data;
                return vm.plateCount;
            });
        }

        function getPlateCast() {
            return datacontext.getPlateCast().then(function (data) {
                vm.plates = data;
                return vm.orderforms;
            });
        }
        */
    }
})();
