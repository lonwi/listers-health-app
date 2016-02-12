(function () {
	'use strict';
	
	angular.module('listershealth', ['ionic','ionic.service.core', 'listershealth.controllers', 'listershealth.services', 'listershealth.filters', 'ngCordova', 'angular-cache'])
	
	.run(function($ionicPlatform, $ionicPopup) {
		$ionicPlatform.ready(function() {
			
			if (window.cordova && window.cordova.plugins.Keyboard) {
			  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			  cordova.plugins.Keyboard.disableScroll(true);
			}
			if (window.StatusBar) {
			  StatusBar.styleDefault();
			}
			
		});
		
		$ionicPlatform.registerBackButtonAction(function(event) {
			if (true) { // your check here
				$ionicPopup.confirm({
					title: 'System Warning',
					template: 'Are you sure you want to exit?'
				}).then(function(res) {
					if (res) {
					  ionic.Platform.exitApp();
					}
				});
			}
		  }, 100);
		  
		var notificationOpenedCallback = function(jsonData) {
			console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
		};

		window.plugins.OneSignal.init("9c71e330-258f-4690-ac1d-919de04ed955",
						 {googleProjectNumber: "861243136791"},
						 notificationOpenedCallback);
		// Show an alert box if a notification comes in when the user is in your app.
		window.plugins.OneSignal.enableInAppAlertNotification(true);
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
				url: '/home/about',
				views: {
				'menuContent': {
					templateUrl: 'templates/about.html'
					}
				}
			})
			
			.state('app.blog', {
				url: '/home/blog',
				views: {
				'menuContent': {
					templateUrl: 'templates/blog-cards.html',
					controller: 'BlogCtrl'
					}
				}
			})
			
			.state('app.classes', {
				url: '/home/classes',
				views: {
				'menuContent': {
					templateUrl: 'templates/classes.html',
					controller: 'ClassCtrl'
					}
				}
			})
			
			.state('app.contact', {
				url: '/home/contact',
				views: {
				'menuContent': {
					templateUrl: 'templates/contact.html'
					}
				}
			})
			
			.state('app.join', {
				url: '/home/join',
				views: {
				'menuContent': {
					templateUrl: 'templates/join.html'
					}
				}
			})
			
			.state('app.timetable', {
				url: '/home/timetable',
				views: {
				'menuContent': {
					templateUrl: 'templates/timetable.html',
					controller: 'TimetableCtrl'
					}
				}
			})
			.state('app.post', {
				url: "/home/blog/:postId",
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