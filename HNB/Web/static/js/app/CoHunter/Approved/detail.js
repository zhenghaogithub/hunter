(function () {
    'use strict';
    var controllerId = 'cohunterApprovedDetail';
    //angular.module('app').controller(controllerId, ['common', 'datacontext', cohunterApprovedDetail]);

    angular.module('app').controller(controllerId,
            ['$rootScope', '$http', '$location', 'common','config','datacontext', cohunterApprovedDetail]);
    //function cohunterApprovedDetail(common, datacontext) {
    function cohunterApprovedDetail($rootScope, $http, $location, common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        //var urlID = $location.url(); 
        var url = $location.absUrl();  
        var urlID = $location.search().id
        // http://qiaole.sinaapp.com?#name=cccccc  
        //$location.host();  
        // qiaole.sinaapp.com  
  
        //$location.port();  
        // 80  
  
        //$location.protocol();  
        // http  
  

        var vm = this;
        vm.news = {
            title: 'Marvel Plate',
            description: 'Marvel Plate 2 is now in production!'
        };
        vm.cohunterApprovedDetailCount = 0;
        vm.cohunterApprovedDetailData = [];
        vm.title = 'Plate';
        //add later
        vm.user = "alex"
        console.log(vm.user)
        console.log(url)
        console.log(urlID)

        activate();

        function activate() {
            //var promises = [getOrderFormCount(), getPlateCast()];
            var promises = [getPlateData($http),getUser($http)];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated cohunterApprovedDetailData View'); });
        }

        getPlateData($http);
        function getPlateData($http) {
            $http({method: 'GET', url: '/hunter/cohunter/ApprovedDetailData/?id=' + urlID}).
          then(function(response) {
            vm.status = response.status;
            vm.cohunterApprovedDetailData = response.data;
            console.log('sucess in get cohunter ApprovedDetailData ')
            console.log(vm.cohunterApprovedDetailData)
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
                vm.cohunterApprovedDetailCount = data;
                return vm.cohunterApprovedDetailCount;
            });
        }

        function getPlateCast() {
            return datacontext.getPlateCast().then(function (data) {
                vm.cohunterApprovedDetails = data;
                return vm.orderforms;
            });
        }
        */
    }
})();
