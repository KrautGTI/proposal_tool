var proposalControllers = angular.module('proposalControllers', []);

proposalControllers.controller("proposalTool" , ['$scope', function($scope){
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
proposalControllers.controller('justOneBillController',['$scope', function($scope){
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

proposalControllers.controller('multipleBillController',['$scope', function($scope){
        $scope.custom = true;
        $scope.toggleCustom = function() {
            $scope.custom = $scope.custom === false ? true: false;
        };
		
	}]);
proposalControllers.controller('heroSummaryController',['$scope', function($scope){
        $scope.showHide = true;
        $scope.showHideDetail = function() {
            $scope.showHide = $scope.showHide === false ? true: false;
        };
		
	}]);
proposalControllers.controller('paymentOptionsController',['$scope', function($scope){
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
proposalControllers.controller('buildSolarSystemController',['$scope', function($scope){
       
	}]);
proposalControllers.controller('multipleBillBarGraphController',['$scope', function($scope){
	    $scope.showHide = true;
           $scope.ShowGraph = function() {
                 $scope.showHide = $scope.showHide === false ? true: false;
        };
       
	}]);
proposalControllers.controller('oneBillBarGraphController',['$scope', function($scope){
	    $scope.showHide = true;
           $scope.ShowGraph = function() {
                 $scope.showHide = $scope.showHide === false ? true: false;
        };
       
	}]);
proposalControllers.controller('noBillBarGraphController',['$scope', function($scope){	
	  $scope.showHide = true;
           $scope.ShowGraph = function() {
                 $scope.showHide = $scope.showHide === false ? true: false;
        };
       
	}]);
proposalControllers.controller('lineGraphController',['$scope', function($scope){	
	  $scope.showHide = true;
           $scope.ShowGraph = function() {
                 $scope.showHide = $scope.showHide === false ? true: false;
        };
       
	}]);
