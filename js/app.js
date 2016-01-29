(function () {
	'use strict';
	
	angular.module('listershealth', ['ionic', 'listershealth.controllers'])
	
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
	
	.config(function($stateProvider, $urlRouterProvider) {
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
					templateUrl: 'templates/blog.html'
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
			
			.state('app.timetable', {
				url: '/timetable',
				views: {
				'menuContent': {
					templateUrl: 'templates/timetable.html'
					}
				}
			});

	  // if none of the above states are matched, use this as the fallback
	  $urlRouterProvider.otherwise('/app/home');
	});
	
}());