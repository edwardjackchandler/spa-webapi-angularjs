(function (app) {
    'use strict';

    app.controller('movieAddCtrl', movieAddCtrl);

    movieAddCtrl.$inject = ['$scope', '$location', '$routeParams', 'apiService', 'notificationService', 'fileUploadService'];

    function movieAddCtrl($scope, $location, $routeParams, apiService, notificationService, fileUploadService) {

        $scope.pageClass = 'page-movies';
        $scope.movie = { GenreId: 1, Rating: 1, NumberOfStocks: 1, Starring: [] };

        $scope.genres = [];
        $scope.isReadOnly = false;
        $scope.AddMovie = AddMovie;
        $scope.prepareFiles = prepareFiles;
        $scope.openDatePicker = openDatePicker;
        //$scope.originalChangeNumberOfStocks = originalChangeNumberOfStocks;
        //$scope.upNumberOfStocks = upChangeNumberOfStocks;
        //$scope.downNumberOfStocks = downChangeNumberOfStocks;
        $scope.changeNumberOfStocksUp = changeNumberOfStocksUp;
        $scope.changeNumberOfStocksDown = changeNumberOfStocksDown;


        $scope.tempActor =
        {
            FirstName: '',
            LastName: '',
        };

        $scope.addActor = function () {
            var cloneOfA = JSON.parse(JSON.stringify($scope.tempActor));
            if ((validName(cloneOfA.FirstName) && !(validName(cloneOfA.LastName))) || (validName(cloneOfA.FirstName)) && (validName(cloneOfA.LastName))) {
                $scope.movie.Starring.push(cloneOfA);
            }

            wipeInput();
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

        function loadGenres() {
            apiService.get('/api/genres/', null,
            genresLoadCompleted,
            genresLoadFailed);
        }

        function genresLoadCompleted(response) {
            $scope.genres = response.data;
        }

        function genresLoadFailed(response) {
            notificationService.displayError(response.data);
        }

        function AddMovie() {
            AddMovieModel();
        }

        function AddMovieModel() {
            apiService.post('/api/movies/add', $scope.movie,
            addMovieSucceded,
            addMovieFailed);
        }

        function prepareFiles($files) {
            movieImage = $files;
        }

        function addMovieSucceded(response) {
            notificationService.displaySuccess($scope.movie.Title + ' has been submitted to Home Cinema');
            $scope.movie = response.data;

            if (movieImage) {
                fileUploadService.uploadImage(movieImage, $scope.movie.ID, redirectToEdit);
            }
            else
                redirectToEdit();
        }

        function addMovieFailed(response) {
            console.log(response);
            notificationService.displayError(response.statusText);
        }

        function openDatePicker($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.datepicker.opened = true;
        };

        function redirectToEdit() {
            $location.url('movies/edit/' + $scope.movie.ID);
        }

        //function changeNumberOfStocks(btn, newValue, oldValue) {
        //    if (btn.attr('data-dir') == 'up') {
        //        return newVal = parseInt(oldValue) + 1;
        //    } else {
        //        if (oldValue > 1) {
        //            return newVal = parseInt(oldValue) - 1;
        //        } else {
        //            return newVal = 1;
        //        }
        //    }
            
        //}

        //function upNumberOfStocks($vent) {
        //    var btn = $('#btnPlusStocks'),
        //    oldValue = $('#inputStocks').val().trim(),

        //    newVal = 0;
        //    newVal = changeNumberOfStocks(btn, newVal, oldValue);
        //    $('#inputStocks').val(newVal);
        //    $scope.movie.NumberOfStocks = newVal;
        //    console.log($scope.movie);
        //}

        //function downNumberOfStocks($vent) {
        //    var btn = $('#btnMinusStocks'),
        //    oldValue = $('#inputStocks').val().trim(),

        //    newVal = 0;
        //    newVal = changeNumberOfStocks(btn, newVal, oldValue);

        //    $('#inputStocks').val(newVal);
        //    $scope.movie.NumberOfStocks = newVal;
        //    console.log($scope.movie);
        //}

        //function upNumberOfStocksTry ($vent) {
        //    var btn = $('#btnPlusStocks'),
        //    oldValue = $('#inputStocks').val().trim(),
        //    newVal = 0;
        //    //var dataDir = btn.getAttribute("data-dir");

        //    if (btn.attr('data-dir') == 'up') {
        //        newVal = parseInt(oldValue) + 1;
        //    } else {
        //        if (oldValue > 1) {
        //            newVal = parseInt(oldValue) - 1;
        //        } else {
        //            newVal = 1;
        //        }
        //    }
        //    $('#inputStocks').val(newVal);
        //    $scope.movie.NumberOfStocks = newVal;
        //    console.log($scope.movie);
        //}

        //function downNumberOfStocksTry($vent) {
        //    var btn = $('#btnMinusStocks'),
        //    oldValue = $('#inputStocks').val().trim(),
        //    newVal = 0;
        //    //var dataDir = btn.getAttribute("data-dir");

        //    if (btn.attr('data-dir') == 'dwn') {
        //        newVal = parseInt(oldValue) + 1;
        //    } else {
        //        if (oldValue > 1) {
        //            newVal = parseInt(oldValue) - 1;
        //        } else {
        //            newVal = 1;
        //        }
        //    }
        //    $('#inputStocks').val(newVal);
        //    $scope.movie.NumberOfStocks = newVal;
        //    console.log($scope.movie);
        //}

        //function downNumberOfStocksTry($vent) {
        //    var btn = $('#btnMinusStocks'),
        //    oldValue = $('#inputStocks').val().trim(),
        //    newVal = 0;
        //    //var dataDir = btn.getAttribute("data-dir");

        //    if (btn.attr('data-dir') == 'dwn') {
        //        newVal = parseInt(oldValue) + 1;
        //    } else {
        //        if (oldValue > 1) {
        //            newVal = parseInt(oldValue) - 1;
        //        } else {
        //            newVal = 1;
        //        }
        //    }
        //    $('#inputStocks').val(newVal);
        //    $scope.movie.NumberOfStocks = newVal;
        //    console.log($scope.movie);
        //}

        function changeNumberOfStocksUp($vent) {
            var btn = $('#btnSetStocksUp'),
            oldValue = $('#inputStocks').val().trim(),
            newVal = 0;

            if (btn.attr('data-dir') == 'up') {
                newVal = parseInt(oldValue) + 1;
            }

            $('#inputStocks').val(newVal);
            $scope.movie.NumberOfStocks = newVal;
            console.log($scope.movie);
        }

        function changeNumberOfStocksDown($vent) {
            var btn = $('#btnSetStocksDown'),
            oldValue = $('#inputStocks').val().trim(),
            newVal = 0;

            if (btn.attr('data-dir') == 'dwn') {
                if (oldValue > 1) {
                    newVal = parseInt(oldValue) - 1;
                } else {
                    newVal = 1;
                }                
            }
            $('#inputStocks').val(newVal);
            $scope.movie.NumberOfStocks = newVal;
            console.log($scope.movie);
        }


        loadGenres();
    }

})(angular.module('homeCinema'));