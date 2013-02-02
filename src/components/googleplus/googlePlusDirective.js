angular.module( 'googleplus.directives', [ 'ngSanitize' ] )

.directive( 'gplusPost', [ function () {
  return {
    restrict: 'A',
    scope: true,
    //templateUrl: 'googleplus/TweetDirective.tpl.html',
    template: '<span>'+
        '<span class="post" ng-bind-html="body"></span> | '+
        '<span class="date">{{date | prettyDate}}</span> | '+
        '<a class="link-to-post" target="_blank" ng-href="{{url}}">Visit</a>'+
      '</span>',
    link: function( scope, element, attrs ) {

      attrs.$observe( 'gplusPost', function ( val ) {
        scope.body = val;
      });

      attrs.$observe( 'gplusUrl', function ( url ) {
        scope.url = url;
      });

      attrs.$observe( 'gplusDate', function ( date ) {
        scope.date = date;
      });
    }
  };
}]);
