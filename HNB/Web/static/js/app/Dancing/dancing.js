(function () {
    var MyApp = angular.module('app');
    var controllerId = "Dancing";
    MyApp.controller(controllerId,['$rootScope', '$http', '$scope', 'common','config', Dancing])
    function Dancing($rootScope, $http, $scope, common, config)
    {
         $scope.dance ={}
         $scope.dance.subset ={}

         $scope.dance.subset.v;
         $scope.dance.subset.t;
         $scope.dance.subset.blocks;
         var getLogFn = common.logger.getLogFn;
         var log = getLogFn(controllerId);


         activate();

         function activate() {
            //var promises = [getOrderFormCount(), getPlateCast()];
            //var promises = [getPlateData($http),getUser($http)];
            var promises = [];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated Dancing View'); });
         }

         $scope.subset = function(){
             $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
             // send subset data
             $http({
                     method: 'POST',
                     url: '/design/dancing/subset/',
                     data: $.param({
                               k: $scope.dance.subset.k,
                               v: $scope.dance.subset.v,
                           }),
                     headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                   }).success(function (data, status, headers, config) {
                       console.log(data);
                       var dataSet = data.blocks;
/*
                       var list =  [];
                       list.push("title":"elem");
                       list.push("title":"elem");
*/
                           
                       $('#dataTables').DataTable({
                          "destroy": true,//如果需要重新加载的时候请加上这个
                          "data": dataSet,
                          //"columns":list
                          "columns": [
                             { "title": "elem" },
                             { "title": "elem" },
                           ]


                          /*
                          "columns": [
                             { "title": "elem" },
                             { "title": "elem" },
                             { "title": "Platform" },
                             { "title": "Version", "class": "center" },
                             { "title": "Grade", "class": "center" }
                           ]
                          */
                       });

                      // handle success things
                   }).error(function (data, status, headers, config) {
                       // handle error things
                   });
         }
    }
})();
