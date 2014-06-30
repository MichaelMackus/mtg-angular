'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('cardsApp.controllers'));
  beforeEach(module('cardsApp.services'));
  
  describe('CardsSearchCtrl', function() {
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('http://api.mtgdb.info/search?limit=100&q=name+m+drain')
        .respond([{id: 1, name: "Drain Life"}]);

      scope = $rootScope.$new();
      ctrl = $controller('CardsSearchCtrl', { $scope: scope });
    }));

    // search
    it('should search some cards', function() {
      scope.q = 'drain';
      scope.search();

      expect(scope.cards.length).toEqual(0);
      $httpBackend.flush();

      expect(scope.cards.length).toBeGreaterThan(0);
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
