(function () {
    'use strict';

    var controllerId = 'shell';
    angular.module('app').controller(controllerId,
        ['$rootScope', '$http', 'common', 'config', shell]);

    function shell($rootScope, $http, common, config) {
        var vm = this;
        var logSuccess = common.logger.getLogFn(controllerId, 'success');
        //console.log('sucess in shell runing')
        //console.log(controllerId)
        var events = config.events;
        vm.title = 'load shell';
        vm.busyMessage = 'Please wait ...';
        vm.isBusy = true;
        vm.spinnerOptions = {
            radius: 40,
            lines: 7,
            length: 0,
            width: 30,
            speed: 1.7,
            corners: 1.0,
            trail: 100,
            color: '#F58A00'
        };

        activate();


        function activate() {
            //why it can show in the html, it is defined in the common
            logSuccess('Grunt and Gulp with Angular loaded!', null, true);
            console.log('sucess in shell runing')
            common.activateController([], controllerId);
        }
        getUser($http);
        function getUser($http) {
            $http({method: 'GET', url: '/design/user/'}).
          then(function(response) {
            vm.status = response.status;
            vm.data = response.data;
            console.log('sucess in get User')
            console.log(vm.data)
          }, function(response) {
            vm.data = response.data || 'Request failed';
            vm.status = response.status;
        });
        }

        function toggleSpinner(on) { vm.isBusy = on; }

        $rootScope.$on('$routeChangeStart',
            function (event, next, current) { toggleSpinner(true); }
        );

        $rootScope.$on(events.controllerActivateSuccess,
            function (data) { toggleSpinner(false); }
        );

        $rootScope.$on(events.spinnerToggle,
            function (data) { toggleSpinner(data.show); }
        );
    }
})();
