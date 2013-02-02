angular.module( 'contact', [ 'twitter', 'prettydate' ] )

.config( [ '$routeProvider', function ( $routeProvider ) {
  $routeProvider.when( '/contact', {
    controller: 'ContactCtrl',
    templateUrl: 'contact/contact.tpl.html'
  });
}])

.controller( 'ContactCtrl', [ '$scope', 'twitterService', function ( $scope, twitterService ) {
  $scope.twitterMsg = 'Loading...';

  twitterService( 'joshdmiller' ).then( function twitterServiceSuccess( tweets ) {
    $scope.tweets = tweets;
  }, function twitterServiceFailure () {
    $scope.twitterMsg = 'Oh no! I couldn\'t fetch the tweets...';
  });
}]);
