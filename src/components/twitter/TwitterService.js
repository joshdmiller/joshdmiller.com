angular.module( 'twitter.service', [] )

.factory( 'twitterService', [ '$http', function ( $http ) {
  return function twitterService ( username ) {
    var url = 'http://api.twitter.com/1/statuses/user_timeline.json';
    
    return $http({
      method: 'JSONP',
      url: url + '?callback=JSON_CALLBACK',
      params: {
        screen_name: username,
        count: 5,
        trim_user: true
      }
    }).then( function twitterServiceSuccess ( response ) {
      return response.data;
    });
  };
}]);

