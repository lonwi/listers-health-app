(function () {
	'use strict';
	
	angular.module('listershealth', ['ionic','ionic.service.core', 'listershealth.controllers', 'listershealth.services', 'listershealth.filters', 'ngCordova', 'angular-cache'])
	
	.run(function($ionicPlatform, $ionicPopup) {
		
		$ionicPlatform.ready(function() {
			if(typeof window.analytics !== 'undefined'){
				window.analytics.startTrackerWithId('UA-74053231-1');
			}
			
		});
		
		$ionicPlatform.ready(function() {
			
			var notificationOpenedCallback = function(jsonData) {
				console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
			};
			if(window.plugins && window.plugins.OneSignal){ 
				window.plugins.OneSignal.init("9c71e330-258f-4690-ac1d-919de04ed955",
								 {googleProjectNumber: "861243136791"},
								 notificationOpenedCallback);
				window.plugins.OneSignal.enableInAppAlertNotification(true);
			}
			//var Pushbots = PushbotsPlugin.initialize("56bddd07177959be178b4567", {"android":{"sender_id":"861243136791"}});
		});
		
		$ionicPlatform.ready(function() {
			var admobid = { // for Android
				banner: 'ca-app-pub-3328576052277688/9004819852',
				//interstitial: 'ca-app-pub-6869992474017983/1657046752'
			};
			/*
			if (typeof AdMob !== 'undefined') {
				AdMob.createBanner({
					adId : admobid.banner,
					position : AdMob.AD_POSITION.BOTTOM_CENTER,
					autoShow : true
				});
			}
			*/
		});
		
		$ionicPlatform.ready(function() {
			
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}
			if (window.StatusBar) {
				StatusBar.styleDefault();
			}
			
			if(navigator.connection) {
                if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                        title: "No Internet Connection",
                        content: "The internet is disconnected on your device."
                    })
                    .then(function(result) {
                        if(!result) {
                            ionic.Platform.exitApp();
                        }
                    });
                }
            }
			
			if(window.cordova && window.cordova.plugins.BarTinter) {
				BarTinter.statusColor("#000000");
				BarTinter.navigationColor("#000000");  
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
			})
			.state('app.notifications', {
				url: "/notifications",
				views: {
				'menuContent': {
					templateUrl: "templates/notifications.html",
					controller: 'NotificationController'
					}
				}
			})
			
			;
	  	$urlRouterProvider.otherwise('/app/home');
	})
	
	.run(function($ionicPlatform, $ionicPopup, $ionicHistory, $state, $rootScope) {
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
			var current_page =  $state.href(toState.name, toParams, {absolute: false});
			if(typeof window.analytics !== 'undefined'){
				window.analytics.trackView(current_page);
			}
			console.log('Current State: '+current_page);
		});

		$ionicPlatform.registerBackButtonAction(function (e) {
			if ($state.current.name === "app.home") {
				var confirmPopup = $ionicPopup.confirm({
					title: 'Confirm Exit',
					template: "Are you sure you want to exit?"
				});
				confirmPopup.then(function (close) {
					if (close) {
						ionic.Platform.exitApp();
					}
					console.log("User canceled exit.");
				});
			} else {
				if ($ionicHistory.backView()) {
					$ionicHistory.goBack();
				}else{
					$state.go('app.home');
				}
			}
		e.preventDefault();
		return false;
		}, 101);
	})
	
	.constant('$ionicLoadingConfig', {
		template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
		noBackdrop: true,
	})
	
	;
	
}());