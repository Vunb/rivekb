/**
 * Created by Vunb on 5.31.2015.
 */
angular.module('rivekb')
  .factory('apply', ['$timeout', function ($timeout) {
    return function (callback) {
      if ( typeof callback === 'function') {
        $timeout(callback);
      }
    }
  }])
;
