'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('cardsApp.controllers'));
  beforeEach(module('cardsApp.services'));
  
  describe('CardsSearchCtrl', function() {
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('http://api.mtgdb.info/search?limit=100&q=name+m+drain')
        .respond([{id: 1, name: "Drain Life", cardSetName: "Test 1", cardSetId: 1}, {id: 2, name: "Drain Life", cardSetName: "Test 2", cardSetId: 2}, {id: 3, name: "Testing", cardSetName: "Test 1", cardSetId: 1}, {id: 4, name: "Drain Life", cardSetName: "Test 3", cardSetId: 3}]);

      $routeParams.query = 'drain';
      scope = $rootScope.$new();
      ctrl = $controller('CardsSearchCtrl', { $scope: scope });
    }));

    // search
    it('should search some cards and properly group them by sets', function() {
      expect(scope.cards.length).toEqual(0);
      $httpBackend.flush();

      // should group by sets (for filtering)
      expect(scope.cards[0].cardSets).toEqual({1: 'Test 1', 2: 'Test 2', 3: 'Test 3'});
    });
  });

  describe('CardsDetailCtrl', function() {
    var scope, ctrl, $httpBackend;

    it('should show card details', inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('http://api.mtgdb.info/cards/1?limit=100')
        .respond({id: 1, name: "Drain Life"});

      $routeParams.card = 1;
      scope = $rootScope.$new();
      ctrl = $controller('CardsDetailCtrl', { $scope: scope });

      $httpBackend.flush();
      expect(scope.card.id).toEqual(1);
    }));
  });
});
