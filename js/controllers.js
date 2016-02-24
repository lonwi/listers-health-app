(function () {
	'use strict';
	
	angular.module('listershealth.controllers', [])
	
	.controller('AppCtrl', function($scope, $rootScope, DataLoader) {

	})
	
	.controller('PostCtrl', function($scope, $rootScope, $stateParams, DataLoader, $http, $ionicLoading, $timeout, CacheFactory, appConnector) {
		if ( ! CacheFactory.get('postCache') ) {
			CacheFactory.createCache('postCache');
		}
		var postCache = CacheFactory.get( 'postCache' );
		$scope.itemID = $stateParams.postId;
		
		var singlePostApi = appConnector.url()+'?lhk='+appConnector.key()+'&type=post&post_id=' + $scope.itemID;
		
		$scope.loadPost = function() {

			// Fetch remote post
			$ionicLoading.show();
			
			DataLoader.get( singlePostApi ).then(function(response) {
			
				$scope.post = response.data.data;
			
				postCache.put( response.data.data.id, response.data.data );
			
				$ionicLoading.hide();
			}, function(response) {
				$ionicLoading.hide();
			});
		
		};
		
		if( !postCache.get( $scope.itemID ) ) {
			// Item is not in cache, go get it
			$scope.loadPost();
		} else {
			// Item exists, use cached item
			$scope.post = postCache.get( $scope.itemID );
		}
		
		// Pull to refresh
		$scope.doRefresh = function() {
			$timeout( function() {
			$scope.loadPost();
			//Stop the ion-refresher from spinning
			$scope.$broadcast('scroll.refreshComplete');
			}, 1000);
		
		};
		
	})
	
	.controller('BlogCtrl', function($scope, $rootScope, DataLoader, $http, $ionicLoading, $timeout, appConnector) {
		
		var postsApi = appConnector.url()+'?lhk='+appConnector.key()+'&type=posts';
		$scope.moreItems = false;
		
		$scope.loadPosts = function() {
			
			$ionicLoading.show();

			DataLoader.get( postsApi ).then(function(response) {
				
				$scope.posts = response.data.data;
				$scope.moreItems = true;
				$ionicLoading.hide();
			
			}, function(response) {

				$ionicLoading.hide();
			});
		};
		
		$scope.loadPosts();
		
		var paged = 2;
  
  		$scope.loadMore = function() {
			if( !$scope.moreItems ) {
			  return;
			}
			var pg = paged++;
			$timeout(function() {
				
				DataLoader.get( postsApi + '&page=' + pg ).then(function(response) {
					angular.forEach( response.data.data, function( value, key ) {
				  		$scope.posts.push(value);
					});

        			if( response.data.data.length <= 0 ) {
          				$scope.moreItems = false;
       				}
      			}, function(response) {
        			$scope.moreItems = false;
					console.log('Something went wrong');
					console.log(response);
      			});
				$scope.$broadcast('scroll.infiniteScrollComplete');
      			$scope.$broadcast('scroll.resize');
				
			}, 1000);
    	};
		$scope.moreDataExists = function() {
			return $scope.moreItems;
		};
		
		// Pull to refresh
		$scope.doRefresh = function() {
			$timeout( function() {
				$scope.loadPosts();
				$scope.$broadcast('scroll.refreshComplete');
			}, 1000);
		};
	})
	
	.controller('TimetableCtrl', function($scope, $rootScope, $ionicPlatform, DataLoader, $http, $ionicLoading, $timeout, CacheFactory, $cordovaLocalNotification, appConnector) {
		
		if ( ! CacheFactory.get('timetableCache') ) {
			CacheFactory.createCache('timetableCache');
		}
		var timetableCache = CacheFactory.get( 'timetableCache' );

		$scope.loadTimetable = function($daycode) {
			var timetableApi = appConnector.url()+'?lhk='+appConnector.key()+'&type=timetable&daycode='+$daycode+'';
			$ionicLoading.show();
			if( !timetableCache.get( $daycode ) ) {
				DataLoader.get( timetableApi ).then(function(response) {
					$scope.classes = response.data.data;
					
					timetableCache.put( $daycode, response.data.data );
					
					$ionicLoading.hide();
				}, function(response) {
					$ionicLoading.hide();
				});
			} else {
				$scope.classes = timetableCache.get( $daycode );
				$ionicLoading.hide();
			}
		};
		
		$scope.scheduleClassNotification = function ($id, $name, $day, $time) {
			if($cordovaLocalNotification.notification.local.isPresent($id)){
				console.log('present');
			}else{
				console.log('not present');
			}
			console.log('ID: '+$id);
			console.log('Name: '+$name);
			console.log('Day: '+$day);
			console.log('Time: '+$time);
		};
	})
	
	.controller('ClassCtrl', function($scope, $rootScope, localClasses) {
		$scope.classes = localClasses.all();
	})
	
	.controller('NextClassCtrl', function($scope, $rootScope, DataLoader, $http, $timeout, $ionicModal, $filter, $interval, localClasses, appConnector ) {
		
		var nextClassApi = appConnector.url()+'?lhk='+appConnector.key()+'&type=nextclass';
		
		$scope.loadNextClass = function() {
			
			DataLoader.get( nextClassApi ).then(function(response) {
				var content = "",
					image = "",
					localClass = localClasses.get(response.data.data.id);
				
				if(localClass){
					content = localClass.content;
					image = localClass.img;
				}else{
					content = response.data.data.content;
				}
				
				$scope.classes = [
					{
						id: response.data.data.id,
						title: response.data.data.title,
						date: response.data.data.date,
						day: response.data.data.day,
						content: content,
						img: image,
					}
				];
			
			}, function(response) {
				console.log('Something went wrong', nextClassApi, response);
			});
			
		};
		
		$scope.loadNextClass();
		$interval(function(){
			$scope.loadNextClass();
		},1000 * 60 * 10);
	})
	
	.controller('ClassModalCtrl', function($scope, $ionicModal) {

		$ionicModal.fromTemplateUrl('templates/modal-class.html', {
			scope: $scope,
			animation: 'slide-in-up',
		}).then(function(modal) {
			$scope.modal = modal;
		});
		
		$scope.openModal = function() {
			$scope.modal.show();
		};
		
		$scope.closeModal = function() {
			$scope.modal.hide();
		};
		
		//Cleanup the modal when we're done with it!
		$scope.$on('$destroy', function() {
			$scope.modal.remove();
		});
		
		// Execute action on hide modal
		$scope.$on('modal.hidden', function() {
			// Execute action
		});
		
		// Execute action on remove modal
		$scope.$on('modal.removed', function() {
			// Execute action
		});
    
	})
	
	.controller('SettingsCtrl', function($scope, $rootScope) {

	})
	
	.controller('NotificationController', function($scope, $cordovaLocalNotification, $ionicPlatform) {
     
		$ionicPlatform.ready(function () {
			 
			$scope.scheduleSingleNotification = function () {
			  $cordovaLocalNotification.schedule({
				id: 1,
				title: 'Warning',
				text: 'Youre so sexy!',
				data: {
				  customProperty: 'custom value'
				}
			  }).then(function (result) {
				console.log('Notification 1 triggered');
			  });
			};
			 
			$scope.scheduleDelayedNotification = function () {
			  var now = new Date().getTime();
			  var _10SecondsFromNow = new Date(now + 10 * 1000);
	 
			  $cordovaLocalNotification.schedule({
				id: 2,
				title: 'Warning',
				text: 'Im so late',
				at: _10SecondsFromNow
			  }).then(function (result) {
				console.log('Notification 2 triggered');
			  });
			};
	 
			$scope.scheduleEveryMinuteNotification = function () {
			  $cordovaLocalNotification.schedule({
				id: 3,
				title: 'Warning',
				text: 'Dont fall asleep',
				every: 'minute'
			  }).then(function (result) {
				console.log('Notification 3 triggered');
			  });
			};      
			 
			$scope.updateSingleNotification = function () {
			  $cordovaLocalNotification.update({
				id: 2,
				title: 'Warning Update',
				text: 'This is updated text!'
			  }).then(function (result) {
				console.log('Notification 1 Updated');
			  });
			};  
	 
			$scope.cancelSingleNotification = function () {
			  $cordovaLocalNotification.cancel(3).then(function (result) {
				console.log('Notification 3 Canceled');
			  });
			};      
			 
		});
	});
	
	
}());