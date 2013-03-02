angular.module( 'projects', [
  'projects.currentprojects'
] )

.config( [ '$routeProvider', function ( $routeProvider ) {
  $routeProvider.when( '/projects', {
    controller: 'ProjectsCtrl',
    templateUrl: 'projects/projects.tpl.html'
  });
}])

.controller( 'ProjectsCtrl', [ '$scope', function ( $scope ) {
}]);
