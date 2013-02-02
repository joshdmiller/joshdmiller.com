angular.module( 'twitter.directives', [ 'ngSanitize' ] )

.directive( 'tweet', [ function () {
  return {
    restrict: 'A',
    scope: true,
    //templateUrl: 'twitter/TweetDirective.tpl.html',
    template: '<span>'+
        '<span class="tweet" ng-bind-html="body"></span> | '+
        '<span class="date">{{date | prettyDate}}</span> | '+
        '<a class="link-to-post" target="_blank" ng-href="https://twitter.com/joshdmiller/status/{{id}}">Visit</a>'+
      '</span>',
    link: function( scope, element, attrs ) {

      function handlesToLinks( text ) {
        return text.replace( 
          /(@)([A-Za-z0-9_\-]+)/g, 
          '<a target="_blank" href="http://twitter.com/$2">$&</a>'
        );
      }

      function linksToAnchors( text ) {
        return text.replace(
          /(\b(https?|ftp):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|])/ig,
          '<a target="_blank" href="$1">$1</a>'
        );
      }

      attrs.$observe( 'tweetBody', function ( val ) {
        val = linksToAnchors( val );
        val = handlesToLinks( val );
        scope.body = val;
      });

      attrs.$observe( 'tweet', function ( id ) {
        scope.id = id;
      });

      attrs.$observe( 'tweetDate', function ( date ) {
        scope.date = date;
      });
    }
  };
}]);
