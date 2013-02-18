angular.module( 'resume', [
  'resume.skillschart',
  'resume.timeline',
  'resume.skills',
  'resume.verticals'
])

.config( [ '$routeProvider', function ( $routeProvider ) {
  $routeProvider.when( '/resume', {
    controller: 'ResumeCtrl',
    templateUrl: 'resume/resume.tpl.html'
  });
}])

.controller( 'ResumeCtrl', [ '$scope', function ( $scope ) {
  $scope.skills = [
    {
      label: 'Skill One',
      amt: 90,
      keywords: [ 'keyword 1', 'second kw', 'another', 'a fourth' ]
    },
    {
      label: 'Skill Two',
      amt: 75,
      keywords: [ 'keyword 1', 'second kw', 'another', 'a fourth' ]
    },
    {
      label: 'Skill Three',
      amt: 60,
      keywords: [ 'keyword 1', 'second kw', 'another', 'a fourth' ]
    },
    {
      label: 'Skill Four',
      amt: 50,
      keywords: [ 'keyword 1', 'second kw', 'another', 'a fourth' ]
    }
  ];
}]);
