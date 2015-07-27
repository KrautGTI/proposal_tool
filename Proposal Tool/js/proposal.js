var proposalControllers = angular.module('proposalControllers', [])
                            .service('dataService', function() {
                              // private variable
                               
                                var energyBill = [];

                                var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
                                                'September', 'October', 'November', 'December'];
                                for(var i = 0 ; i < months.length; i++)
                                {
                                    energyBill[i] = {};
                                    energyBill[i].dollars = 0;
                                    energyBill[i].kWh = 0;       

                                }   
                                energyBill.percentChange = 5.0;
                                energyBill.dollar = true;
                                energyBill.kWhRates= [0.08, 0.07, 0.08, 0.08, 0.09, 0.09, 0.09, 0.1, 0.11, 0.12, 0.12, 0.12, 0.12, 0.13, 0.13, 0.13, 0.11, 0.11, 0.12, 0.19, 0.19, 0.21, 0.18, 0.20, 0.28, 0.27, 0.28, 0.30, 0.28, 0.27, 0.26, 0.28, 0.29, 0.29];

                                energyBill.numArray = [1];
                                
                                
                                
                                this.dataObj = energyBill;
            });


proposalControllers.controller("proposalTool" , ['$scope','dataService', function($scope,dataService){
    $scope.energyBill = dataService.dataObj;
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
    
    
    $scope.submitCall = function(){
       
    }
}]);
proposalControllers.controller('justOneBillController',['$scope', function($scope){
        $scope.custom = true;
        $scope.model = { id: 0 };
        $scope.toggleCustom = function() {
            $scope.custom = $scope.custom === false ? true: false;
        };
	    $scope.onDollarChange = function () {	    	
			
			$scope.valueKwh = $scope.dollar* 10;	
	    	
		}
	    $scope.onKwhChange = function () { 		
	    	
			$scope.dollar = $scope.valueKwh/10;
	    	
		}
		
		
	}]).directive('convertToNumber', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        ngModel.$parsers.push(function(val) {
          return parseInt(val, 10);
        });
        ngModel.$formatters.push(function(val) {
          return '' + val;
        });
      }
    };
  });

proposalControllers.controller('multipleBillController',['$scope','dataService', function($scope, dataService){
        $scope.energyBill = dataService.dataObj;
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
proposalControllers.controller('buildSolarSystemController',['$scope', 'dataService', function($scope, dataService){
    $scope.energyBill = dataService.dataObj;
    $scope.numArray = $scope.energyBill.numArray;
    
    $scope.anotherArray = function () {
        var i = $scope.numArray.length;
        i++;
        $scope.numArray.push(i);
    };
	
	 $scope.removeArray = function(obj){
		
		 var index = obj.$parent.item;
         var i = $scope.numArray.indexOf(index);
         if(i > -1) {
             $scope.numArray.splice(i, 1);
         }
         console.log($scope.numArray);
	}     
    
    
	}]);
proposalControllers.controller('percentageChangeController', ['$scope', 'dataService', function($scope, dataService){
            $scope.energyBill = dataService.dataObj;
            
            console.log($scope.energyBill);
    
        
    
    
    
	}]);
proposalControllers.controller('yourOptionsController', ['$scope', 'dataService', function($scope, dataService){
            $scope.energyBill = dataService.dataObj;
            
            console.log($scope.energyBill);
    
        
    
    
    
	}]);


proposalControllers.controller('multipleBillBarGraphController',['$scope', 'dataService' , function($scope, dataService){

        $scope.energyBill= dataService.dataObj;
	       
        $scope.toggleCustomBar = function() {			
                
            $scope.energyBill.dollar = $scope.energyBill.dollar === true ? false: true;
        
        };
    
        $scope.energyBill = dataService.dataObj;
        $scope.showHide = true;
        var dataMonths = [];
        $scope.energyBill.annualCost = 0;
        console.log($scope.energyBill);
       $scope.ShowGraph = function() {
                 $scope.showHide = $scope.showHide === false ? true: false;
        };
	    $scope.calculateTotal = function () {
                $scope.energyBill.annualCost = 0;
                for(var i = 0; i< $scope.energyBill.length; i++) {
                    var tmp = $scope.energyBill[i];
                    $scope.energyBill[i].dollars = parseInt(tmp.dollars);
                    dataMonths.push( parseInt(tmp.dollars));
                    $scope.energyBill.annualCost += parseInt(tmp.dollars);
                }
        };
       
    $scope.calculateTotal();
    $('#bars').highcharts({

      title: {
        /*text: 'Draggable Charts'*/
    },

    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {    

      labels: {
            formatter: function () {
                return '$' + this.value;
            }
        },
  
     tickAmount: 7   
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
                            
                       
                        $scope.calculateTotal();
                        this.update();
                        $scope.energyBill[this.x].dollars = this.y;
                    //    $('#drop').html(
                    //        '</b> was set to <b>' + numberFormat(this.y, 2) + '</b>');
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
        yDecimals: 2,
        formatter: function() {
                return ''+ Highcharts.numberFormat(this.y, 2) ;
        }
    },

    series: [{
        data: dataMonths,
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
proposalControllers.controller('lineGraphController',['$scope','dataService', function($scope, dataService){	

        $scope.energyBill = dataService.dataObj;                                              
        $scope.showHide = true;
        var rates  = $scope.energyBill.kWhRates;
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
        plotOptions: {
            series: {
                marker: {
                    fillColor: '#FFFFFF',
                    lineWidth: 2,
                    lineColor: null // inherit from series
                }
            },
            line:{
                animation:true
            }
        },
        tooltip: {
            valueSuffix: '$'
        },
        legend: {enabled:false},
        series: [{
            color:'#817f7f',
       
            data: rates
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


proposalControllers.controller('areaChartController',['$scope', 'dataService', function($scope, dataService){
    var fiveYearData = [];
    $scope.energyBill = dataService.dataObj;
   
    $scope.energyBill.percentChange = parseInt($scope.energyBill.percentChange);
    var annualExpenses = [];
    for(var i = 0; i < 25; i++) {
        
          annualExpenses[i] = $scope.energyBill.annualCost + $scope.energyBill.annualCost*$scope.energyBill.percentChange/100 +                   $scope.energyBill.annualCost*i;
        if((i+1)%5 == 0)
            fiveYearData.push(annualExpenses[i]);
    }
    
    
    
    $('#areaChart').highcharts({
        chart: {
            type: 'area'
        },
        title: {
          //  text: 'Your Future Electric Costs'
        },
         legend: {enabled:false},
        xAxis: {
            allowDecimals: false,
            categories: [0, 5, 10, 15, 20, 25],
            labels: {
                formatter: function () {
                    if(this.value == 0)
                        return 'Today';
                    else 
                        return this.value + ' years'; // clean, unformatted number for year
                }
            }
        },
        yAxis: {
            
            labels: {
                formatter: function () {
                    return '$' + this.value ;
                }
            },
            tickAmount: 7,
            tickInterval: 500
        },
        
   
        
        tooltip: {
            pointFormat: '{point.y}'
        },
        plotOptions: {
            area: {
                
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [{
            
            data: fiveYearData
        }]
    });

    
    
}]);
proposalControllers.controller('estimatedSolarSystemController',['$scope', 'dataService', function($scope, dataService){
       
    $scope.energyBill = dataService.dataObj;
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
                        'September', 'October', 'November', 'December'];
    var kWhUsed = [];
    var dollars = [];
                               
    //Populate the kWh if not fetched check from a global toggle
    if($scope.energyBill[0].kWh == 0) {                                                         
        for (var i = 0; i < months.length; i++ ) {
                kWhUsed[i] = parseInt($scope.energyBill[i] .dollars)/$scope.energyBill.kWhRates[$scope.energyBill.kWhRates.length - 1];
                dollars[i] = parseInt($scope.energyBill[i] .dollars);
            
        }
    }
    solarEstimate = [356, 428, 666, 780, 906, 894, 878, 857, 736, 557, 405, 300];
    console.log(kWhUsed);
    $('#lineAreaChart').highcharts({
        title: {
            /*text: 'Combination chart'*/
        },
        yAxis: {
                 labels: {
                formatter: function () {
                        return this.value + ' kWh';
                    }  
                 }
        },
        xAxis: {
            categories:  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
             series: [{
            name: 'Your Electricity Usage',
            type: 'column',
            color:'#0000FF',
            data: kWhUsed
        }, {
            type: 'area',
            name: 'Estimated Solar Production',
            color:'#eefc6a',
            data: solarEstimate,
            lineColor:'black',
            marker: {
                lineWidth: 1,
                lineColor: 'black',
                fillColor: '#FFFFFF'
            }
        } 
        ]
    });   
    
    
    
    
}]);