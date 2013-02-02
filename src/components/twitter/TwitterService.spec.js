describe( 'twitterService', function () {
  var $scope;

  beforeEach( module( 'twitter.service' ) );

  beforeEach( inject( function ( $rootScope, _twitterService_, $httpBackend ) {
    $scope = $rootScope;
    twitterService = _twitterService_;

    $httpBackend.expect( 'JSONP', '' ).respond( function () {
      var data = [ {}, {}, {}, {}, {} ];

      return [ 200, data, {} ];
    });
  }));

  it( 'should return five tweets', function () {
    var promise = twitterService( 'joshdmiller' );

    runs(function() {
      promise.then( function ( tweets ) {
        expect( tweets.length ).toBe( 5 );
      });
    });
  });
});
