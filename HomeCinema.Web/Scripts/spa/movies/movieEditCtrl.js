(function (app) {
    'use strict';

    app.controller('movieEditCtrl', movieEditCtrl);

    movieEditCtrl.$inject = ['$scope', '$location', '$routeParams', 'apiService', 'notificationService', 'fileUploadService'];

    function movieEditCtrl($scope, $location, $routeParams, apiService, notificationService, fileUploadService) {
        $scope.pageClass = 'page-movies';
        $scope.movie = {};
        $scope.genres = [];
        $scope.loadingMovie = true;
        $scope.isReadOnly = false;
        $scope.UpdateMovie = UpdateMovie;
        $scope.prepareFiles = prepareFiles;
        $scope.openDatePicker = openDatePicker;

        $scope.tempActor =
        {
            FirstName: '',
            LastName: '',
        };

        $scope.addActor = function () {
            

            var cloneOfA = JSON.parse(JSON.stringify($scope.tempActor));

            if (!duplicate(cloneOfA)) {
                if ((validName(cloneOfA.FirstName)) && (validName(cloneOfA.LastName))) {
                    $scope.movie.Starring.push(cloneOfA);
                    $scope.tempActor.FirstName = "";
                    $scope.tempActor.LastName = "";
                }
                else if ((validName(cloneOfA.FirstName)) && !(validName(cloneOfA.LastName))) {
                    $scope.movie.Starring.push(cloneOfA);
                    $scope.tempActor.FirstName = "";
                }
            }

            wipeInput();
        }

        function duplicate(actor) {
            for (var i = 0; i < $scope.movie.Starring.length; i++)
            {
                var starringFirstName = $scope.movie.Starring[i].FirstName;
                var starringLastName = $scope.movie.Starring[i].LastName;

                if ((actor.FirstName == starringFirstName) && (actor.LastName == starringLastName)) {
                    return true;
                }
                else false;
            }
            
        }

        function wipeInput() {
            document.getElementById("FirstNameText").value = "";
            document.getElementById("LastNameText").value = "";
            document.getElementById("FirstNameText").focus();
        }

        function validName(name) {
            name = name.replace(/^\s+/, "").replace(/\s+$/, "").replace(/\s+/, " ");
            if (name == "") {
                return false;
            }

            else return true;

        }

        $scope.removeActor = function (index) {
            $scope.movie.Starring.splice(index, 1);
        }

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        $scope.datepicker = {};

        var movieImage = null;

        function loadMovie() {

            $scope.loadingMovie = true;

            apiService.get('/api/movies/details/' + $routeParams.id, null,
            movieLoadCompleted,
            movieLoadFailed);
        }

        function movieLoadCompleted(result) {
            $scope.movie = result.data;
            $scope.loadingMovie = false;

            loadGenres();
        }

        function movieLoadFailed(response) {
            notificationService.displayError(response.data);
        }

        function genresLoadCompleted(response) {
            $scope.genres = response.data;
        }

        function genresLoadFailed(response) {
            notificationService.displayError(response.data);
        }

        function loadGenres() {
            apiService.get('/api/genres/', null,
            genresLoadCompleted,
            genresLoadFailed);
        }

        function UpdateMovie() {
            if (movieImage) {
                fileUploadService.uploadImage(movieImage, $scope.movie.ID, UpdateMovieModel);
            }
            else
                UpdateMovieModel();
        }

        function UpdateMovieModel() {
            apiService.post('/api/movies/update', $scope.movie,
            updateMovieSucceded,
            updateMovieFailed);
        }

        function prepareFiles($files) {
            movieImage = $files;
        }

        function updateMovieSucceded(response) {
            console.log(response);
            notificationService.displaySuccess($scope.movie.Title + ' has been updated');
            $scope.movie = response.data;
            movieImage = null;
            redirectToMovie();
        }

        //function addMovieSucceded(response) {
        //    notificationService.displaySuccess($scope.movie.Title + ' has been submitted to Home Cinema');
        //    $scope.movie = response.data;

        //    if (movieImage) {
        //        fileUploadService.uploadImage(movieImage, $scope.movie.ID, redirectToEdit);
        //    }
        //    else
        //        redirectToEdit();
        //}

        function redirectToMovie() {
            $location.url('movies/' + $scope.movie.ID);
        }

        function updateMovieFailed(response) {
            notificationService.displayError(response);
        }

        function openDatePicker($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.datepicker.opened = true;
        };

        loadMovie();
    }

})(angular.module('homeCinema'));