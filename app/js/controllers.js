'use strict';

/* Controllers */

angular.module('cardsApp.controllers', ['ngRoute'])
  .controller('CardsSearchCtrl', ['$scope', '$routeParams', '$location', 'Cards', function($scope, $routeParams, $location, Cards) {
    $scope.search = function() {
      if ($scope.q) {
        var query = "name m "+$scope.q;
        $scope.cards = Cards.query({ method: 'search', q: query });
      }
    };
  }])
  .controller('CardsDetailCtrl', ['$scope', '$routeParams', 'Cards', function($scope, $routeParams, Cards) {
    $scope.card = Cards.get({ query: $routeParams.card });
  }]);
