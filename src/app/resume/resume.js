angular.module( 'resume', [] )

.config( [ '$routeProvider', function ( $routeProvider ) {
  $routeProvider.when( '/resume', {
    controller: 'ResumeCtrl',
    templateUrl: 'resume/resume.tpl.html'
  });
}])

.controller( 'ResumeCtrl', [ '$scope', function ( $scope ) {
}]);
