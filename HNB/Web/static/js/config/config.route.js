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
                    title: 'plate',
                    settings: {
                        nav: 1,
                        //content: '<i class="fa fa-dashboard"></i> 我的猎头工作台'
                    }
                }
            }, {
                url: '/dancing/subset/',
                config: {
                    title: 'subset',
                    templateUrl: '/static/js/app/Dancing/subset.html',
                    settings: {
                        nav: 2,
                    }
                }
            }, {
                url: '/dancing/group/',
                config: {
                    title: 'group',
                    templateUrl: '/static/js/app/Dacing/group.html',
                    settings: {
                        nav: 3,
                    }
                }
            }, {
                url: '/dancing/orbit/',
                config: {
                    title: 'orbit',
                    templateUrl: '/static/js/app/Dancing/orbit.html',
                    settings: {
                        nav: 4,
                    }
                }
            }, {
                url: '/dancing/relation/',
                config: {
                    title: 'relation',
                    templateUrl: '/static/js/app/Dancing/relation.html',
                    settings: {
                        nav: 5,
                    }
                }
            }, {
                url: '/dancing/matrix/',
                config: {
                    title: 'matrix',
                    templateUrl: '/static/js/app/dancing/matrix.html',
                    settings: {
                        nav: 6,
                    }
                }
            }, {
                url: '/dancing/solve/',
                config: {
                    title: 'solve',
                    templateUrl: '/static/js/app/dancing/solve.html',
                    settings: {
                        nav: 7,
                    }
                }
            }, {
                url: '/dancing/recovery/',
                config: {
                    title: 'recovery',
                    templateUrl: '/static/js/app/dancing/recovery.html',
                    settings: {
                        nav: 8,
                    }
                }
            }, 



        ];
    }
})();
