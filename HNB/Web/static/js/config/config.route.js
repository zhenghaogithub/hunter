(function () {
    'use strict';

    var app = angular.module('app');

    // Collect the routes
    app.constant('routes', getRoutes());

    // Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes', routeConfigurator]);
    function routeConfigurator($routeProvider, routes) {

        routes.forEach(function (r) {
            $routeProvider.when(r.url, r.config);
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }

    // Define the routes
    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    //templateUrl: '/static/html/cohunter/app/Plate/plate_copy.html',
                    templateUrl: '/static/js/app/Plate/plate.html',
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa"></i> 我的猎头工作台'
                        //content: '<i class="fa fa-dashboard"></i> 我的猎头工作台'
                    }
                }
            }, {
                url: '/cohunter/approved/',
                config: {
                    title: 'approved',
                    templateUrl: '/static/js/app/CoHunter/Approved/approved.html',
                    settings: {
                        nav: 2,
                        content: '<i class="fa "></i> 职位公海'
                    }
                }
            }, {
                url: '/cohunter/candidate/',
                config: {
                    title: 'candidate',
                    templateUrl: '/static/js/app/CoHunter/Candidate/candidate.html',
                    settings: {
                        nav: 3,
			content: '<i class="fa"></i> 所有职位'
                    }
                }
            }, {
                url: '/cohunter/failed/',
                config: {
                    title: 'failed',
                    templateUrl: '/static/js/app/CoHunter/Failed/failed.html',
                    settings: {
                        nav: 4,
                        content: '<i class="fa"></i> 接单待推荐'
                    }
                }
            }, {
                url: '/plate/detail',
                config: {
                    title: 'Detail',
                    templateUrl: '/static/js/app/Plate/detail.html',
                    settings: {
                        nav: 5,
                        content: '<i class="fa"></i> 已推荐职位'
                    }
                }
            }, {
                url: '/cohunter/approved/detail/\?',
                config: {
                    title: 'approved',
                    templateUrl: '/static/js/app/CoHunter/Approved/detail.html',
                    settings: {
                        nav: 6,
                        ID: 6,
                        content: '<i class="fa "></i> 职位公海'
                    }
                }
            }, {
                url: '/cohunter/failed/detail/\?',
                config: {
                    title: 'approved',
                    templateUrl: '/static/js/app/CoHunter/Failed/detail.html',
                    settings: {
                        nav: 7,
                        ID: 7,
                        content: '<i class="fa "></i> 职位公海'
                    }
                }
            }, {
                url: '/cohunter/candidate/detail/\?',
                config: {
                    title: 'approved',
                    templateUrl: '/static/js/app/CoHunter/Candidate/detail.html',
                    settings: {
                        nav: 8,
                        ID: 8,
                        content: '<i class="fa "></i> 职位公海'
                    }
                }
            }, 



        ];
    }
})();
