(function () {
	'use strict';
	
	angular.module('listershealth', ['ionic','ionic.service.core', 'listershealth.controllers', 'listershealth.services', 'listershealth.filters', 'ngCordova', 'angular-cache'])
	
	.run(function($ionicPlatform) {
		$ionicPlatform.ready(function() {
			
			if (window.cordova && window.cordova.plugins.Keyboard) {
			  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			  cordova.plugins.Keyboard.disableScroll(true);
			}
			if (window.StatusBar) {
			  StatusBar.styleDefault();
			}
			
		});
	})
	
	.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, CacheFactoryProvider) {
		angular.extend(CacheFactoryProvider.defaults, { 
			'storageMode': 'localStorage',
			'capacity': 10,
			'maxAge': 10800000,
			'deleteOnExpire': 'aggressive',
			'recycleFreq': 10000
		});
		
		// Native scrolling
		if( ionic.Platform.isAndroid() ) {
			$ionicConfigProvider.scrolling.jsScrolling(false);
		}
		
		$stateProvider
	
			.state('app', {
				url: '/app',
				abstract: true,
				templateUrl: 'templates/menu.html',
				controller: 'AppCtrl'
			})
			
			.state('app.home', {
				url: "/home",
				views: {
				'menuContent': {
					templateUrl: "templates/home.html"
					}
				}
			})
	
			.state('app.about', {
				url: '/about',
				views: {
				'menuContent': {
					templateUrl: 'templates/about.html'
					}
				}
			})
			
			.state('app.blog', {
				url: '/blog',
				views: {
				'menuContent': {
					templateUrl: 'templates/blog-cards.html',
					controller: 'BlogCtrl'
					}
				}
			})
			
			.state('app.classes', {
				url: '/classes',
				views: {
				'menuContent': {
					templateUrl: 'templates/classes.html',
					controller: 'ClassCtrl'
					}
				}
			})
			
			.state('app.contact', {
				url: '/contact',
				views: {
				'menuContent': {
					templateUrl: 'templates/contact.html'
					}
				}
			})
			
			.state('app.join', {
				url: '/join',
				views: {
				'menuContent': {
					templateUrl: 'templates/join.html'
					}
				}
			})
			
			.state('app.timetable', {
				url: '/timetable',
				views: {
				'menuContent': {
					templateUrl: 'templates/timetable.html',
					controller: 'TimetableCtrl'
					}
				}
			})
			.state('app.post', {
				url: "/blog/:postId",
				views: {
				'menuContent': {
					templateUrl: "templates/post.html",
					controller: 'PostCtrl'
					}
				}
			});

	  	// if none of the above states are matched, use this as the fallback
	  	$urlRouterProvider.otherwise('/app/home');
	})
	
	.constant('$ionicLoadingConfig', {
		template: 'Loading...'
	})
	
	;
	
}());