(function () {
	'use strict';
	
	angular.module('listershealth.services', [])
	
	.factory('DataLoader', function( $http ) {
	
		return {
			get: function(url) {
				return $http.get( url );
			},
			post: function(url) {
				return $http.post( url );
			}
		};
	
	})
	.factory('$localstorage', ['$window', function($window) {
		return {
			set: function(key, value) {
				$window.localStorage[key] = value;
			},
			get: function(key, defaultValue) {
				return $window.localStorage[key] || defaultValue;
			},
			setObject: function(key, value) {
				$window.localStorage[key] = JSON.stringify(value);
			},
			getObject: function(key) {
				return JSON.parse($window.localStorage[key] || '{}');
			}
		};
	}]);
	
	
}());