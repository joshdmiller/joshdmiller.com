angular.module( 'contact', [] )

.config( [ '$routeProvider', function ( $routeProvider ) {
  $routeProvider.when( '/contact', {
    controller: 'ContactCtrl',
    templateUrl: 'contact/contact.tpl.html'
  });
}])

.controller( 'ContactCtrl', [ '$scope', function ( $scope ) {
}]);
