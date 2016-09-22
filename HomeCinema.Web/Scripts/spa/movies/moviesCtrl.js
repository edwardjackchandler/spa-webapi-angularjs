(function (app) {
    'use strict';

    app.controller('moviesCtrl', moviesCtrl);

    moviesCtrl.$inject = ['$scope', 'apiService','notificationService', ];

    function moviesCtrl($scope, apiService, notificationService) {
        $scope.pageClass = 'page-movies';
        $scope.loadingMovies = true;
        $scope.page = 0;
        $scope.pagesCount = 0;
        
        $scope.Movies = [];
        
        var timeoutId = 0;

        $scope.search = search;
        $scope.clearSearch = clearSearch;

        function search(page) {
            page = page || 0;

            $scope.loadingMovies = true;

            var config = {
                params: {
                    page: page,
                    pageSize: 6,
                    filter: $scope.filterMovies
                }
            };

            apiService.get('/api/movies/', config,
            moviesLoadCompleted,
            moviesLoadFailed);
        }

        $scope.searchDelay = function () {
            clearTimeout(timeoutId);
            timeoutId = setTimeout($scope.search, 500);
        }

        function moviesLoadCompleted(result) {
            $scope.Movies = result.data.Items;
            $scope.page = result.data.Page;
            $scope.pagesCount = result.data.TotalPages;
            $scope.totalCount = result.data.TotalCount;
            $scope.loadingMovies = false;

            if ($scope.filterMovies && $scope.filterMovies.length)
            {
                notificationService.displayInfo(result.data.Items.length + ' movies found');
            }
            
        }

        function moviesLoadFailed(response) {
            notificationService.displayError(response.data);
        }

        function clearSearch() {
            $scope.filterMovies = '';
            search();
        }

        $('[data-toggle="tooltip"]').tooltip();

        $scope.search();
    }

})(angular.module('homeCinema'));