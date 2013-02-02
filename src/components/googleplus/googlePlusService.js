angular.module( 'googleplus.service', [] )

.factory( 'googlePlusService', [ '$http', function ( $http ) {
  var url = 'https://www.googleapis.com/plus/v1';

  return function googlePlusService ( id ) {
    return $http({
      method: 'JSONP',
      url: url + '/people/' + id + '/activities/public',
      params: {
        maxResults: 3,
        key: 'AIzaSyCm3f3Xz-28rBm6bXCTTTNDKV-FWdrpFMY',
        callback: 'JSON_CALLBACK'
      }
    }).then( function googlePlusServiceJsonp ( response ) {
      return response.data;
    });
  };
}]);

