(function () {
    'use strict';
    var controllerId = 'cohunterCandidateDetail';
    //angular.module('app').controller(controllerId, ['common', 'datacontext', cohunterCandidateDetail]);

    angular.module('app').controller(controllerId,
            ['$rootScope', '$http', '$location', 'common','config','datacontext', cohunterCandidateDetail]);
    //function cohunterCandidateDetail(common, datacontext) {
    function cohunterCandidateDetail($rootScope, $http, $location, common, datacontext) {
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
        vm.cohunterCandidateDetailCount = 0;
        vm.cohunterCandidateDetailData = [];
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
                .then(function () { log('Activated cohunterCandidateDetailData View'); });
        }

        getPlateData($http);
        function getPlateData($http) {
            $http({method: 'GET', url: '/hunter/cohunter/CandidateDetailData/?id=' + urlID}).
          then(function(response) {
            vm.status = response.status;
            vm.cohunterCandidateDetailData = response.data;
            console.log('sucess in get cohunter CandidateDetailData ')
            console.log(vm.cohunterCandidateDetailData)
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
                vm.cohunterCandidateDetailCount = data;
                return vm.cohunterCandidateDetailCount;
            });
        }

        function getPlateCast() {
            return datacontext.getPlateCast().then(function (data) {
                vm.cohunterCandidateDetails = data;
                return vm.orderforms;
            });
        }
        */
    }
})();
