angular.module( 'twitter.directives', [] )

.directive( 'tweet', [ function () {
  return {
    restrict: 'A',
    scope: true,
    //templateUrl: 'twitter/TweetDirective.tpl.html',
    template: '<span>'+
        '<span class="tweet" ng-bind="body"></span> | '+
        '<span class="date">{{date | prettyDate}}</span> | '+
        '<a class="link-to-post" target="_blank" ng-href="https://twitter.com/joshdmiller/status/{{id}}">Visit</a>'+
      '</span>',
    link: function( scope, element, attrs ) {
      attrs.$observe( 'tweetBody', function ( val ) {
        scope.body = val;
        console.log("body changed to", val);
      });

      attrs.$observe( 'tweet', function ( id ) {
        scope.id = id;
        console.log("id changed to", id);
      });

      attrs.$observe( 'tweetDate', function ( date ) {
        scope.date = date;
        console.log("date changed to", date);
      });
    }
  };
}]);
