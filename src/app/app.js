angular.module( 'jdmApp', [
  'home',
  'resume',
  'projects',
  'contact',
  'placeholders',
  'templates' // The HTML templates, thrown into $templateCache during build.
])

.config([ '$routeProvider', function ( $routeProvider ) {
  $routeProvider.otherwise({ redirectTo: '/home' });
}])

.controller ( 'AppCtrl', [ function ( $scope ) {
  // We'll need something eventually...
}])

.controller( 'HeaderCtrl', [ '$scope', '$location', function ( $scope, $location ) {
  $scope.isAt = function ( path ) {
    if ( $location.path() == path ) {
      return true;
    } else {
      return false;
    }
  };
}]);

