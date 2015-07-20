var propTool = angular.module('propTool', ['ngRoute']);
propTool.controller("proposalTool" , ['$scope', function($scope){
	$scope.address1 = "115 Cordova St";
	$scope.address2 = "Vallejo, 94591";
	$scope.showElec = false;
	$scope.toggleElect= function()
	{
		if($scope.showElec)
			$scope.showElec = false;
		else
			$scope.showElec = false;
		alert("justOneBill");
	}
	$scope.toggle = function() {
       alert("hello");
    };
}]);
propTool.controller('justOneBillController',['$scope', function($scope){
        $scope.custom = true;
        $scope.toggleCustom = function() {
            $scope.custom = $scope.custom === false ? true: false;
        };
	    $scope.onDollarChange = function () {	    	
			
			$scope.valueKwh = $scope.dollar* 10;	
	    	
		}
	    $scope.onKwhChange = function () { 		
	    	
			$scope.dollar = $scope.valueKwh/10;
	    	
		}
		
		
	}]);

propTool.controller('multipleBillController',['$scope', function($scope){
        $scope.custom = true;
        $scope.toggleCustom = function() {
            $scope.custom = $scope.custom === false ? true: false;
        };
		
	}]);
propTool.controller('heroSummaryController',['$scope', function($scope){
        $scope.showHide = true;
        $scope.showHideDetail = function() {
            $scope.showHide = $scope.showHide === false ? true: false;
        };
		
	}]);
propTool.controller('paymentOptionsController',['$scope', function($scope){
        $scope.firstCol = true;
        $scope.secondCol = true;
        $scope.thirdCol = true;
	
        $scope.showHideFirstColumn = function() {
            $scope.firstCol = $scope.firstCol === false ? true: false;           
        };
	$scope.showHideSecondColumn = function() {            
            $scope.secondCol = $scope.secondCol === false ? true: false;           
        };
	$scope.showHideThirdColumn = function() {            
            $scope.thirdCol = $scope.thirdCol === false ? true: false;
        };
		
	}]);
propTool.controller('buildSolarSystemController',['$scope', function($scope){
       
	}]);

propTool.config(['$routeProvider',
				 function($routeProvider){
					$routeProvider.
					when('/', {
					templateUrl: 'proposalFirstPage.html',	
					controller:'proposalTool'	
				    }).
					 when('/proposalSecondPage/id1', {
					templateUrl: 'proposalSecondPage.html',
					controller:'proposalTool'	
				    }).
					when('/startProposal/id1', {
					templateUrl: 'startProposal.html'
				    }).
					 when('/review/id1', {
					templateUrl: 'review.html'
				    }).
					when('/multipleBills/id1', {
					templateUrl: 'multipleBills.html',
					controller:'multipleBillController'	
				    }).
					when('/justOneBill/id1', {
					templateUrl: 'justOneBill.html',
					controller:'justOneBillController'	
				    }).					
					when('/multipleBillBarGraph/id1', {
					templateUrl: 'multipleBillBarGraph.html'
				    }).
					when('/oneBillBarGraph/id1', {
					templateUrl: 'oneBillBarGraph.html'
				    }).
					when('/noBillBarGraph/id1', {
					templateUrl: 'noBillBarGraph.html'
				    }).
					 when('/annualElectricBill/id1', {
					templateUrl: 'annualElectricBill.html'
				    }).
					when('/lineGraph/id1', {
					templateUrl: 'lineGraph.html'
				    }).
					 when('/percentageChange/id1', {
					templateUrl: 'percentageChange.html'						
				    }).	
					 when('/futureElectricCost/id1', {
					templateUrl: 'futureElectricCost.html'
				    }).
					 when('/yourOptions/id1', {
					templateUrl: 'yourOptions.html'
				    }).	
					 when('/solarSystemWork/id1', {
					templateUrl: 'solarSystemWork.html'
				    }).
					 when('/buildSolarSystem/id1', {
					templateUrl: 'buildSolarSystem.html',
					controller:	'buildSolarSystemController'
				    }).
					 when('/estimatedSolarSystemProduction/id1', {
					templateUrl: 'estimatedSolarSystemProduction.html'
				    }).
					 when('/solarSystemSummary/id1', {
					templateUrl: 'solarSystemSummary.html'
				    }).	
					 when('/paymentOptions/id1', {
					templateUrl: 'paymentOptions.html',
					controller:'paymentOptionsController'	
				    }).
					 when('/summary/id1', {
					templateUrl: 'summary.html'
				    }).	
					 when('/heroSummary/id1', {
					templateUrl: 'heroSummary.html',
					controller:'heroSummaryController'	
				    }).
					 when('/finishApplication/id1', {
					templateUrl: 'finishApplication.html'
				    });				 
				 }]);	
				
				












