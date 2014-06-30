'use strict';

/* jasmine specs for services go here */

describe('service', function() {
  beforeEach(module('cardsApp.services'));

  describe('Cards', function() {
    it('check the existence of cards factory', inject(function(Cards) {
      expect(Cards).toBeDefined();
      // var cards = Cards.query();
      // expect(cards.length).toBeGreaterThan(5);
    }));
  });
});
