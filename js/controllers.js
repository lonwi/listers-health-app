(function () {
	'use strict';
	
	angular.module('listershealth.controllers', [])
	
	.controller('AppCtrl', function($scope, $rootScope, DataLoader) {
		$rootScope.url = 'http://www.listershealth.co.uk/_app_connector.php';
		$rootScope.lhk = 's5cnJ3KK1gLfBtzwzsRbRMiIVDbzXOMM3f2Io5NSWKpXySu0S9LnZzWSSUOvWjm';
		
		$rootScope.localClasses = [
		
			{title: 'Abs Blast', subtitle: 'Sample Subtitle - Get FIT', content: 'The Abs Blast workout will tone your front, lower back and sides giving you a complete abdominal workout and help you feel muscles you haven’t felt before. This workout tones the tummy muscles and increase overall core strength. It is a short, but very effective class.', img: 'abs-blast.png', id: '170'},
			
			{title: 'Aerobics', subtitle: 'Sample Subtitle - Get FIT', content: 'During aerobic activity, you repeatedly move large muscles in your arms, legs and hips. You\'ll notice your body\'s responses quickly. You\'ll breathe faster and more deeply. This maximizes the amount of oxygen in your blood. Your heart will beat faster, which increases blood flow to your muscles and back to your lungs. Your small blood vessels (capillaries) will widen to deliver more oxygen to your muscles and carry away waste products, such as carbon monoxide and lactic acid. Your body will even release endorphin\'s, natural painkillers that promote an increased sense of well-being.', img: 'aerobics.png', id: '168'},
			
			{title: 'Bollywood', subtitle: 'Sample Subtitle - Get FIT', content: 'Bollywood is a great way to get in shape, learn some dance moves and have fun at the same time! The Bollywood film inspired music and dancing has a unique and energetic style. Get your own Bollywood body!', img: 'bollywood.png', id: ''},
			
			{title: 'Boxercise', subtitle: 'Sample Subtitle - Get FIT', content: 'Boxercise is a circuit class including boxing style stations and techniques. It helps you to get fit and enhance muscle definition, but you won\'t gain bulk. Learn different punches and movement using focus pads. The workout uses the whole body and the time flys as you work on body movement, agility and momentum. It\'s also great for relieving stress!', img: 'boxercise.png', id: '166'},
			
			{title: 'Cardio', subtitle: 'Sample Subtitle - Get FIT', content: 'Cardio training will help you tone and shape your body. All you need is to get your heartbeat on the right track. You will feel satisfied after this workout!', img: 'cardio.png', id: '251'},
			
			{title: 'Circuit', subtitle: 'Sample Subtitle - Get FIT', content: 'Circuit is a body conditioning or resistance training in which you do one exercise for a short period of time and then move on to another exercise. The class increases your strength and burns lots of calories. You will work on each section of the body individually by different activities.', img: 'circuit.png', id: '265'},
			
			{title: 'Combat Aerobics', subtitle: 'Sample Subtitle - Get FIT', content: 'A non combat, martial arts based fitness class with moves drawn from Karate, tae kwan do, Kung fu, kickboxing, Muay Thai and Tai Chi.', img: 'combat-aerobics.png', id: '172'},
			
			{title: 'Fit Ball', subtitle: 'Sample Subtitle - Get FIT', content: 'Fit Ball is also known as stability ball. The class challenges balance and core stability levels, what helps you strengthen the whole body. By using the ball you improve muscle tone and flexibility, build core strength and balance, and it helps you improve posture and body alignment.', img: 'fit-ball.png', id: '263'},
			
			{title: 'HIIT', subtitle: 'Sample Subtitle - Get HIIT', content: 'Missing Content.', img: 'default.png',  id: 1667},
			
			{title: 'Insanity', subtitle: 'Sample Subtitle - Get FIT', content: 'Max interval training has you work as hard as you can for 3-minute intervals, with 30-second periods of rest in between. According to the Insanity web site, exercising at this extreme intensity level will help you burn up to 1,000 calories an hour.', img: 'insanity.png', id: '171'},
			
			{title: 'LBT', subtitle: 'Sample Subtitle - Get FIT', content: 'This class targets those stubborn areas that normal exercise does not get to: Legs, Bums &amp; Tums! LBT helps you tone and shape your body while burning calories. If you want great looking legs, a firmer bum and a tighter tum, join our class!', img: 'lbt.png', id: '163'},
			
			{title: 'Spin', subtitle: 'Sample Subtitle - Get FIT', content: 'The spinning class is a powerful workout that burns calories and keeps your muscles in shape. The instructor guides you through workout phases as warm-up, uptempo, sprints, climbs etc. You will control the resistance on your bike, which makes it is a great and effective workout for all ability levels!', img: 'spin.png', id: '145'},
			
			{title: 'Tone And Tighten', subtitle: 'Sample Subtitle - Get FIT', content: 'These moves will help you not only lose fat but also get a sleeker body and boost calorie burn all day long—thanks to extra muscle. Each one calls on multiple muscles so “your body burns more calories than if it were doing a single-focus exercise like biceps curls.', img: 'tone-and-tighten.png', id: '167'},
			
			{title: 'Zumba', subtitle: 'Sample Subtitle - Get FIT', content: 'We take the "work" out of workout, by mixing low-intensity and high-intensity moves for an interval-style, calorie-burning dance fitness party. Once the Latin and World rhythms take over, you\'ll see why Zumba<sup>®</sup> Fitness classes are often called exercise in disguise.<br>Super effective? Check. Super fun? Check and check.', img: 'zumba.png', id: '164'},
			
			{title: 'Zumba Step', subtitle: 'Sample Subtitle - Get FIT', content: 'For those who are looking to feel the burn, Looking to strengthen and tone your legs and glutes? Step right up It combine the awesome toning and strengthening power of Step aerobics, with the fun fitness-party that only Zumba brings to the dance-floor.<br>Zumba Step increase cardio and calorie burning, while adding moves that define and sculpt your core and legs.', img: 'zumba-step.png', id: '169'},

		];

	})
	
	.controller('PostCtrl', function($scope, $rootScope, $stateParams, DataLoader, $http, $ionicLoading, $timeout, CacheFactory ) {
		if ( ! CacheFactory.get('postCache') ) {
			CacheFactory.createCache('postCache');
		}
		var postCache = CacheFactory.get( 'postCache' );
		$scope.itemID = $stateParams.postId;
		
		var singlePostApi = $rootScope.url+'?lhk='+$rootScope.lhk+'&type=post&post_id=' + $scope.itemID;
		
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
	
	.controller('BlogCtrl', function($scope, $rootScope, DataLoader, $http, $ionicLoading, $timeout) {
		
		var postsApi = $rootScope.url+'?lhk='+$rootScope.lhk+'&type=posts';
		$scope.moreItems = false;
		
		$scope.loadPosts = function() {
			
			$ionicLoading.show();

			DataLoader.get( postsApi ).then(function(response) {
				
				$scope.posts = response.data.data;
				$scope.moreItems = true;
				$ionicLoading.hide();
				//console.log(response.data.data);
			
			}, function(response) {
				//console.log('Something went wrong');
				//console.log(postsApi, response);
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
	
	.controller('TimetableCtrl', function($scope, $rootScope, DataLoader, $http, $ionicLoading, $timeout) {

		$scope.loadTimetable = function($daycode) {

			var timetableApi = $rootScope.url+'?lhk='+$rootScope.lhk+'&type=timetable&daycode='+$daycode+'';
			$ionicLoading.show();
			DataLoader.get( timetableApi ).then(function(response) {
				$scope.classes = response.data.data;
				$ionicLoading.hide();
			}, function(response) {
				$ionicLoading.hide();
			});
			
		};
	
	})
	
	.controller('ClassCtrl', function($scope, $rootScope) {
		$scope.classes = $rootScope.localClasses;
	})
	
	.controller('NextClassCtrl', function($scope, $rootScope, DataLoader, $http, $timeout, $ionicModal, $filter, $interval ) {
		
		var nextClassApi = $rootScope.url+'?lhk='+$rootScope.lhk+'&type=nextclass';
		
		$scope.loadNextClass = function() {
			
			DataLoader.get( nextClassApi ).then(function(response) {
				var content = "",
					image = "",
					localClass = $filter('filter')($rootScope.localClasses, {id: response.data.data.id})[0];
				
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
    
	});
	
	
	
}());