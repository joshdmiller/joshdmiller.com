angular.module( 'home', [] )

.config( [ '$routeProvider', function ( $routeProvider ) {
  $routeProvider.when( '/home', {
    controller: 'HomeCtrl',
    templateUrl: 'home/home.tpl.html'
  });
}])

.controller( 'HomeCtrl', [ '$scope', function ( $scope ) {
}]);
