describe( 'googlePlusService', function () {
  var $scope;

  beforeEach( module( 'googleplus.service' ) );

  beforeEach( inject( function ( $rootScope, _googlePlusService_, $httpBackend ) {
    $scope = $rootScope;
    googlePlusService = _googlePlusService_;

    $httpBackend.expect( 'JSONP', '' ).respond( function () {
      var data = [ {}, {}, {}, {}, {} ];

      return [ 200, data, {} ];
    });
  }));

  it( 'should return five tweets', function () {
    var promise = googlePlusService( 'joshdmiller' );

    runs(function() {
      promise.then( function ( tweets ) {
        expect( tweets.length ).toBe( 5 );
      });
    });
  });
});

