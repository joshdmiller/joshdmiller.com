angular.module( 'jdmApp', [
  'home',
  'resume',
  'projects',
  'contact',
  'placeholders',
  'app-templates',      // The HTML templates from src/app, thrown into $templateCache during build.
  'component-templates' // The HTML templates from src/components, thrown into $templateCache during build.
])

.config([ '$routeProvider', function ( $routeProvider ) {
  $routeProvider.otherwise({ redirectTo: '/home' });
}])

.controller ( 'AppCtrl', [ function ( $scope ) {
  // We'll need something eventually...
}])

.controller( 'HeaderCtrl', [ '$scope', '$location', function ( $scope, $location ) {
  $scope.isAt = function ( path ) {
    if ( $location.path() === path ) {
      return true;
    } else {
      return false;
    }
  };
}]);

