(function () {
    'use strict';
    var controllerId = 'jobsea';
    angular.module('app').controller(controllerId,
            ['$rootScope', '$http', 'common','config','datacontext', jobsea]);

    function jobsea($rootScope, $http, common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.jobsea = [];
        vm.maa = [];
        vm.title = 'JobSea';

        activate();

        function activate() {
            //var promises = [getJobSeaCast(), getMAA()];
            //var promises = [getJobSeaCast()];
            var promises = [getJobData($http)];
            common.activateController(promises, controllerId)
                .then(function () {
                    log('Activated jobsea View');
                });
        }

        function getJobSeaCast() {
            return datacontext.getJobSeaCast().then(function (data) {
                vm.jobsea = data;
                return vm.jobsea;
            });
        }


        getJobData($http);
        function getJobData($http) {
            $http({method: 'GET', url: '/hunter/jobdata/'}).
          then(function(response) {
            vm.status = response.status;
            vm.jobsea = response.data;
            console.log('sucess in get jobdata ')
            console.log(vm.jobsea)
          }, function(response) {
            vm.data = response.data || 'Request failed';
            vm.status = response.status;
        });
        }

    }
})();
