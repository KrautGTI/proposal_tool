var proposalControllers = angular.module('proposalControllers', [])
                            .service('dataService', function() {
                              // private variable
                               
                                var energyBill = [];
                                energyBill.Month = [];
                                

                                var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
                                                'September', 'October', 'November', 'December'];
                                for(var i = 0 ; i < months.length; i++)
                                {
                                    energyBill.Month[i] = {};
                                    energyBill.Month[i].dollars = 0;
                                    energyBill.Month[i].kWh = 0;       

                                }   
                                energyBill.percentChange = 7.0;
								energyBill.cumulative25YearsExpense = 1;
                                energyBill.dollar = true;
                                energyBill.convert = true;
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
		
	}
	$scope.toggle = function() {
      
    };
    
    
    $scope.submitCall = function(){
       
    }
}]);
proposalControllers.controller('justOneBillController',['$scope', 'dataService', function($scope, dataService){
        $scope.custom = true;
        $scope.model = { id: 0 };
        $scope.toggleCustom = function() {
            alert("toggled");
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
    
        /*
         * Create watch on the values work on conversions in realtime
         * when this is done responsibility of toggle would just be to show the value/alter mode
         * Ideally these must be exported via service calls. 
         */
        
        $scope.propagateEnergyBillFromDollar = function (i) {    
            
                    //Start validation
                    var input = $scope.energyBill.Month[i].dollars;
                    var num = input.replace(/[^0-9]/g, '');
                    $scope.energyBill.Month[i].dollars = "$" + num;
            
            /*
                    findkWhFromDollars = function (dollar) {
                            var totalKwh = 0;
                            for(var i = 0; i < $scope.energyBill.baseDollars.length; i++) {
                                
                                if(dollar  > $scope.energyBill.baseDollars[i].limitDollar){
                                    totalKwH += $scope.energyBill.baseDollars[i].limitkWh;
                                    dollar -= $scope.energyBill.baseDollars[i].limitDollar;
                                    
                                } else {
                                    totalKwH += dollar/$scope.energyBill.baseDollars[i].ratePerkWh;
                                    
                                }
  
                            }
                                             
                    };
            
                
                    $scope.energyBill.Month[i].kWh = findkWhFromDollars(num);
            */
            
        };
    
    
    
        $scope.toggleCustom = function() {
      
            $scope.energyBill.dollar = $scope.energyBill.dollar === false ? true: false;
            $scope.energyBill.annualUsage = Math.ceil($scope.energyBill.annualUsage);
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
            
    
        
    
    
    
	}]);
proposalControllers.controller('yourOptionsController', ['$scope', 'dataService', function($scope, dataService){
            $scope.energyBill = dataService.dataObj;
            
            console.log($scope.energyBill);
    
        
    
    
    
	}]);


proposalControllers.controller('multipleBillBarGraphController',['$scope', 'dataService' , function($scope, dataService){

        $scope.energyBill= dataService.dataObj;
	       
        $scope.toggleCustomBar = function() {			
            var barChart = $('#bars').highcharts();   
            
            $scope.energyBill.dollar = $scope.energyBill.dollar === true ? false: true;
           // barChart.series[0].remove();
            if($scope.energyBill.dollar === true) {
                     $scope.calculateTotalDollars();
                    
                    barChart.series[0].setData($scope.dataMonths);    
                
            } else {
                    $scope.calculateTotalkWh();
                    barChart.series[0].setData($scope.dataMonths);
            }
            
        };

   
        $scope.energyBill = dataService.dataObj;
        $scope.showHide = true;
        $scope.dataMonths = [];
 
        
       $scope.ShowGraph = function() {
                 $scope.showHide = $scope.showHide === false ? true: false;
        };
	    $scope.calculateTotalDollars = function () {
                $scope.dataMonths = [];
                $scope.energyBill.annualCost = 0;
                for(var i = 0; i< $scope.energyBill.Month.length; i++) {
                    var tmp = $scope.energyBill.Month[i];
                    var num = parseInt(tmp.dollars.replace(/[^0-9]/g, ''));
                    
                    $scope.dataMonths.push(num);
                    $scope.energyBill.annualCost += num;
                }
        };
    
    $scope.calculateTotalkWh = function () {
                $scope.dataMonths = [];
                $scope.energyBill.annualUsage = 0;
                for(var i = 0; i< $scope.energyBill.Month.length; i++) {
                    var tmp = $scope.energyBill.Month[i];

                    var num = parseInt(tmp.kWh.replace(/[^0-9]/g, ''));
                    

                    $scope.dataMonths.push(num);
                    $scope.energyBill.annualUsage += num;
                }      
        
    };
    if($scope.energyBill.dollar === true)
        $scope.calculateTotalDollars();
    else 
        $scope.calculateTotalkWh();
    
    $('#bars').highcharts({
        chart: {
            animation: false
        },

      title: {
        /*text: 'Draggable Charts'*/
    },

    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {    

      labels: {
            formatter: function () {
                if($scope.energyBill.dollar === true)
                    return '$' + this.value;
                else 
                    return this.value + ' kWh';
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
                            if($scope.energyBill.dollar === true){
                                 $scope.calculateTotalDollars();
                                $scope.energyBill.Month[this.x].dollars = this.y;
                            }
                               
                            else {
                                $scope.calculateTotalkWh();
                                 $scope.energyBill.Month[this.x].kWh = this.y;
                            }
                                

                            this.update();
                           
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
                if($scope.energyBill.dollar === true)
                    return this.x + '\n' + '$'+ Highcharts.numberFormat(this.y, 2) ;
                else 
                    return this.x + '\n' + 'kWh'+ Highcharts.numberFormat(this.y, 2) ;
        }
    },

    series: [{
        data: $scope.dataMonths,
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
         //   valueSuffix: 
             formatter: function() {
                return '$'+ Highcharts.numberFormat(this.y, 2) ;
            }
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
	 
	   $scope.showImage = true;             
       $scope.ShowBluImage = function() {
                 $scope.showImage = $scope.showImage === false ? true: false;
        };
	
    var fiveYearData = [];
    $scope.energyBill = dataService.dataObj;
   
	 $scope.energyBill.cumulative25YearsExpense = 0;
    $scope.energyBill.percentChange = parseFloat($scope.energyBill.percentChange);
    var annualExpenses = [];
    for(var i = 0; i < 25; i++) {
        
          annualExpenses[i] = $scope.energyBill.annualCost + $scope.energyBill.annualCost*$scope.energyBill.percentChange/100 + $scope.energyBill.annualCost*i;
        if((i+1)%5 == 0 || i == 0){
			   fiveYearData.push(annualExpenses[i]);
		}
         
		$scope.energyBill.cumulative25YearsExpense += annualExpenses[i];
    }
    $scope.energyBill.cumulative25YearsExpense = Math.ceil($scope.energyBill.cumulative25YearsExpense);
    
    
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
    var dataMonths = [];
    var dollars = [];
                               
    //Populate the kWh if not fetched check from a global toggle
                                                        
    for (var i = 0; i < months.length; i++ ) {
                    var tmp = $scope.energyBill.Month[i];

                    var num = parseInt(tmp.kWh.replace(/[^0-9]/g, ''));
                    $scope.dataMonths.push(num);        
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
            data: dataMonths
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