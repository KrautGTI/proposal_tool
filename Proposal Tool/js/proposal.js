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
	    mydata = [10, 5, 3, 2, 7, 2, 8,14, 12, 22, 11, 3];
    $('#bars').highcharts({

      title: {
        /*text: 'Highcharts draggable points demo'*/
    },

    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },

    plotOptions: {
        series: {
            point: {
                events: {

                    drag: function (e) {
                        // Returning false stops the drag and drops. Example:
                        /*
                        if (e.newY > 300) {
                            this.y = 300;
                            return false;
                        }
                        */
                        
                        $('#drag').html();
                            //'</b> to <b>' + numberFormat(e.y, 2) + '</b>');
                    },
                    drop: function () {
                            
                        
                        $('#drop').html();
                            //'</b> was set to <b>' + numberFormat(this.y, 2) + '</b>');
                    }
                }
            },
            stickyTracking: false
        },
        column: {
            stacking: 'normal'
        },
        line: {
            cursor: 'ns-resize'
        }
    },
        legend: {enabled:false},
        
    tooltip: {
        yDecimals: 2
    },

    series: [{
        data: mydata,
        //draggableX: true,
        draggableY: true,
        dragMinY: 0,
        type: 'column',
        minPointLength: 2
    }]

});

       
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
   $('#lineGraph').highcharts({
        title: {
            /*text: 'Electric Price History',*/
            x: -20 //center
        },
        
       
        xAxis: {
                categories: ['1980', '1981', '1982', '1983', '1984', '1985', '1986','1987','1988','1989','1990', '1991','1992','1993','1994','1995','1996', '1997','1998','1999','2000','2001','2002', '2003','2004','2005', '2006','2007','2008','2009','2010','2011','2012','2013','2014','2015'],
            minTickInterval:5  
        },
        yAxis: {
            title: {
                text: 'Electricity Rate ($/kWh)'
            },
            
         
            plotLines: [{
                value: 0,
               
                color: '#606060'
            }],
         tickAmount: 7   
        },
        tooltip: {
            valueSuffix: '$'
        },
        legend: {enabled:false},
        series: [{
            color:'#817f7f',
       
            data: [0.08, 0.07, 0.08, 0.08, 0.09, 0.09, 0.09, 0.1, 0.11, 0.12, 0.12, 0.12, 0.12, 0.13, 0.13, 0.13, 0.11, 0.11, 0.12, 0.19, 0.19, 0.21, 0.18, 0.20, 0.28, 0.27, 0.28, 0.30, 0.28, 0.27, 0.26, 0.28, 0.29, 0.29]
        }],
	   plotOptions: {
            series: {
                animation: {
                    duration: 2000
                }
            }
        },
        pointInterval:0.05
    });	
	
	
       
	}]);
