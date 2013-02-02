angular.module( 'contact', [ 'twitter', 'googleplus', 'prettydate' ] )

.config( [ '$routeProvider', function ( $routeProvider ) {
  $routeProvider.when( '/contact', {
    controller: 'ContactCtrl',
    templateUrl: 'contact/contact.tpl.html'
  });
}])

.controller( 'ContactCtrl', [ '$scope', 'twitterService', 'googlePlusService', function ( $scope, twitterService, googlePlusService ) {
  twitterService( 'joshdmiller' ).then( function twitterServiceSuccess( tweets ) {
    $scope.tweets = tweets;
  }, function twitterServiceFailure () {
    $scope.twitterError = true;
  });

  googlePlusService( '107119852442751861456' ).then( function gplusServiceSuccess( data ) {
    $scope.posts = data.items;
  }, function gplusServiceFailure () {
    $scope.gplusError = true;
  });
}]);

