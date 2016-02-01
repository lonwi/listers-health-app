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
	
	});
}());