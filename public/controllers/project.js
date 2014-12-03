// public/controllers/project.js

/**
 * Expose project controllers and routes
 */
(function() {
    angular.module('project', [])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/addproject', {
                templateUrl: '/views/addproject.html',
                controller: 'AddProjectController'
            })
            .when('/projects', {
                templateUrl: '/views/projects.html',
                controller: 'ViewProjectsController'
            })
            .when('/editproject', {
                templateUrl: '/views/editproject.html',
                controller: 'EditProjectController'
            });

        $locationProvider.html5Mode(true);
    }])
    .controller('AddProjectController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
        $scope.addProject = function () {
            $http.post('/api/projects', $scope.formData)
             .success (function (data) {
                console.log(data); 
             })
             .error (function (data) {
                console.log("error: " + data);
             });
        };

    }])
    .controller('ViewProjectsController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
        $http.get('/api/projects')
        .success (function (data) {
            $scope.projects=data;
        })
        .error (function (data){
            console.log("error: " + data);
        });
    }])
    .controller('EditProjectController', ['$http', '$scope', '$routeParams', '$location', function($http, $scope, $routeParams, $location) {
        var id = $routeParams._id;
        
        $http.get('/api/projects/' + id) 
            .success (function (data) {
                $scope.project=data;
            })
            .error (function (data){
                console.log("error: " + data);
            });

        $scope.deleteProject = function () {
            $http.delete('/api/projects/' + id)
                .success (function (data) {
                    $location.path('/projects');
                })
                .error (function (data){
                    console.log("error: " + data);
                });
        };

        $scope.updateProject = function () {
            $http.put('/api/projects/' + id, $scope.project)
                .success (function (data) {
                    $location.path('/projects');
                })
                .error (function (data){
                    console.log("error: " + data);
                });
        };
    }]);
})();
