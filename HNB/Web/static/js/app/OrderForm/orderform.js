(function () {
    'use strict';
    var controllerId = 'orderform';
    angular.module('app').controller(controllerId, ['common', 'datacontext', orderform]);

    function orderform(common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.news = {
            title: 'Marvel OrderForms',
            description: 'Marvel OrderForms 2 is now in production!'
        };
        vm.orderformCount = 0;
        vm.orderforms = [];
        vm.title = 'OrderForm';

        activate();

        function activate() {
            var promises = [getOrderFormCount(), getOrderFormsCast()];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated OrderForm View'); });
        }

        function getOrderFormCount() {
            return datacontext.getOrderFormCount().then(function (data) {
                vm.orderformCount = data;
                return vm.orderformCount;
            });
        }

        function getOrderFormsCast() {
            return datacontext.getOrderFormsCast().then(function (data) {
                vm.orderforms = data;
                return vm.orderforms;
            });
        }
    }
})();
