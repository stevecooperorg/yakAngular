var yakApp = angular.module('yakApp', ['ngRoute', 'ui.bootstrap']);


yakApp.config(function($routeProvider) {
	$routeProvider
	.when('/', { controller: 'YakListController', templateUrl: 'Partials/YakList.html' })
	.when('/yak/:yakName', { controller: 'YakDetailController', templateUrl: 'Partials/YakDetail.html' })
	.otherwise({redirectTo: '/'});
});

yakApp.factory({
	yakService: function() {

		var protoYak = { name:"(unnamed)", isAngry:false, shaved:0 },
		    yaks;

	    var yakService = {
	    	getYaks: function() {
	    		return yaks;
	    	},
	    	getYakByName: function(name) {
	    		return _.find(yaks, function(y) { return y.name === name; });
	    	},
	    	createYak: function(name) {
	    		var yak = Object.create(protoYak, {
				   name: { value:name },
				   isAngry: { value:(Math.random() < 0.5) },
				   shaved: { value:(Math.random() * 100 ) },
				});
				return yak;
	    	}
	    };

	    yaks = _.map(["Fluffy", "Chilly", "Billy", "Bert", "Willy"], yakService.createYak);

	    return yakService;
	}
})

yakApp.controller({
	'YakListController': function($scope, yakService) {
	    $scope.yaks = yakService.getYaks();
        $scope.canAddNewYak = false;

	    $scope.addYak = function() {
	    	$scope.yaks.push({ name: $scope.newYak.name });
	    	$scope.newYak.name = "";
	    };

	    $scope.removeYak = function(yak) {
	    	var index = $scope.yaks.indexOf(yak);
	    	$scope.yaks.splice(index, 1);
	    };

	    $scope.$watch('newYak.name', function(newValue) {
            $scope.canAddNewYak = newValue !== void 0 && (newValue.length !== 0);
	    });
	},
	'YakDetailController': function($scope, yakService, $routeParams) {
		$scope.yak = yakService.getYakByName($routeParams.yakName );
	}
});
