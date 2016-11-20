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

             //window.location.reload(); 
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
                       var title = data.title;
                       var dataNew = {"destroy":true,"data":dataSet, "columns":title}
                       if ($('#dataTables').hasClass('dataTable')) {
　　                      dttable = $('#dataTables').dataTable();
　　                      dttable.fnClearTable(); //清空一下table
　　                      //dttable.fnAddData(title); //清空一下table
                          dttable.fnDestroy(); //destroy datatables
                          $('#dataTables').empty();
                          $('#dataTables').DataTable({
                          "destroy": true,
                          "data": dataSet,
                          "columns":title,
                          });

                          //$('#accountsDefaultList').dataTable().fnAddData(data);
                          //$('#accountsDefaultList').dataTable().fnDraw();
　　                      //dttable.fnDraw(); //清空一下table
                       }
                       else
                       {
                          //var lists =  [{"title":"elem"}, {"title":"elem"}];
                          $('#dataTables').DataTable({
                          "destroy": true,
                          "data": dataSet,
                          "columns":title,
                          });
                       }
                      // handle success things
                   }).error(function (data, status, headers, config) {
                       // handle error things
                   });
         }
    }
})();
