var propTool = angular.module('propTool', ['ngRoute', 'proposalControllers']);

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
					templateUrl: 'multipleBillBarGraph.html',
					controller:'multipleBillBarGraphController'
				    }).
					when('/oneBillBarGraph/id1', {
					templateUrl: 'oneBillBarGraph.html',
					controller:'multipleBillBarGraphController'	
				    }).
					when('/noBillBarGraph/id1', {
					templateUrl: 'noBillBarGraph.html',
					controller:'multipleBillBarGraphController'	
				    }).
					 when('/annualElectricBill/id1', {
					templateUrl: 'annualElectricBill.html'
				    }).
					when('/lineGraph/id1', {
					templateUrl: 'lineGraph.html',
					controller:'lineGraphController'	
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
				
				












