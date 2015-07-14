var propTool = angular.module('propTool', ['ngRoute']);
propTool.controller("proposalTool" , ['$scope', function($scope){
	$scope.address1 = "115 Cordova St";
	$scope.address2 = "Vallejo, 94591";
}]);

propTool.config(['$routeProvider',
				 function($routeProvider){
					$routeProvider.
					when('/', {
					templateUrl: 'proposalFirstPage.html',							
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
					templateUrl: 'multipleBills.html'
				    }).
					when('/justOneBill/id1', {
					templateUrl: 'justOneBill.html'
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
					templateUrl: 'buildSolarSystem.html'
				    }).
					 when('/estimatedSolarSystemProduction/id1', {
					templateUrl: 'estimatedSolarSystemProduction.html'
				    }).
					 when('/solarSystemSummary/id1', {
					templateUrl: 'solarSystemSummary.html'
				    }).	
					 when('/paymentOptions/id1', {
					templateUrl: 'paymentOptions.html'
				    }).
					 when('/summary/id1', {
					templateUrl: 'summary.html'
				    }).	
					 when('/heroSummary/id1', {
					templateUrl: 'heroSummary.html'
				    }).
					 when('/finishApplication/id1', {
					templateUrl: 'finishApplication.html'
				    });				 
				 }]);	
				
				












