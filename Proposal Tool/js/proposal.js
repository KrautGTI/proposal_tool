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
                                
                                //Static definition of slabs
                                energyBill.slabs = [];
                                
                                energyBill.slabs.push({limitDollar:50*0.225, limitkWh:50, ratePerkWh:0.225});
                                energyBill.slabs.push({limitDollar:80*0.325, limitkWh:130, ratePerkWh:0.325});//50+80
                                energyBill.slabs.push({limitDollar:100*0.425, limitkWh:230, ratePerkWh:0.425});//50+80+100
                                energyBill.slabs.push({limitDollar:1000000, limitkWh:100000000, rate:0.525});//50+80+100                                                       
                                //Default values of energyBill.Monthly Bill
       
                                 energyBill.convertToComma = function (yourNumber) {
                                        var components = yourNumber.toString().split(".");
                                        //Comma-fies the first part
                                        components [0] = components [0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                        //Combines the two sections
                                        return components.join(".");  

                                };
                                energyBill.propagateEnergyBillFromDollar = function (i) {    

                                        //Start validation
                                        var input = energyBill.Month[i].dollars;


                                        findkWhFromDollars = function (dollar) {
                                                var totalKwh = 0;
                                                for(var i = 0; i < energyBill.slabs.length && (dollar > 0) ; i++) {

                                                    if(dollar  > energyBill.slabs[i].limitDollar){
                                                        totalKwh += energyBill.slabs[i].limitkWh;
                                                        dollar -= energyBill.slabs[i].limitDollar;

                                                    } else {
                                                        totalKwh += dollar/energyBill.slabs[i].ratePerkWh;
                                                        break;

                                                    }

                                                }
                                                return totalKwh;

                                        };
                                        energyBill.Month[i].kWh = Math.ceil(findkWhFromDollars(input));           
            
                            };
                            energyBill.propagateEnergyBillFromkWh = function (i) {    

                                    //Start validation
                                    var input = $scope.energyBill.Month[i].kWh;




                                    findkWhFromkWh = function (kWhUsed) {
                                            var totalDollar = 0;
                                            for(var i = 0; i < $scope.energyBill.slabs.length; i++) {

                                                if(kWhUsed  > energyBill.slabs[i].limitDollar){
                                                    totalDollar += energyBill.slabs[i].limitDollar;
                                                    kWhUsed -= energyBill.slabs[i].limitDollar;

                                                } else {
                                                    totalDollar += kWhUsed * $scope.energyBill.slabs[i].ratePerkWh;
                                                    break;
                                                }

                                            }
                                            return totalDollar;

                                    };

                                    energyBill.Month[i].dollars =  Math.ceil(findkWhFromkWh(input)) ;

                            };
                            //Calculate total annual cost and return fills the array with monthly expenditure
                            energyBill.calculateTotalDollars = function () {
                                        var dataMonths = [];
                                        energyBill.annualCost = 0;
                                        for(var i = 0; i< energyBill.Month.length; i++) {
                                            var tmp = energyBill.Month[i];

                                            var num = tmp.dollars;
                                            dataMonths.push(num);
                                            energyBill.annualCost += num;
                                        }
                                        energyBill.annualCostDisplay = energyBill.convertToComma("" + energyBill.annualCost);

                                        return dataMonths;

                                };
                            //Calculate total annual Usage and return fills the array with monthly data Usage
                            energyBill.calculateTotalkWh = function () {
                                        var dataMonths = [];
                                        energyBill.annualUsage = 0;
                                        for(var i = 0; i< energyBill.Month.length; i++) {
                                            var tmp = energyBill.Month[i];

                                            var num = tmp.kWh;


                                            dataMonths.push(num);
                                            energyBill.annualUsage += num;
                                        }   
                                    energyBill.annualUsageDisplay =  energyBill.convertToComma("" + 
                                                                                            energyBill.annualUsage);

                                    return dataMonths;

                            };  

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
        $scope.energyBill = dataService.dataObj;
        $scope.toggleCustom = function() {
            alert("toggled");
            $scope.custom = $scope.custom === false ? true: false;
        };
		
		
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

        $scope.toggleCustom = function() {
      
            $scope.energyBill.dollar = $scope.energyBill.dollar === false ? true: false;
            $scope.energyBill.annualUsage = Math.ceil($scope.energyBill.annualUsage);
        };
		
	}]).directive('currencyInput', function (){
                return {
                    restrict: 'A',
                    require: 'ngModel', 
                    link: function(scope, element, attrs, ctrl) {
     
                        
                         ctrl.$parsers.push(function(inputValue) {
                            var inputVal = element.val();

                            //clearing left side zeros
                            while (inputVal.charAt(0) == '0') {
                                inputVal = inputVal.substr(1);
                            }
                            var res;
                            var value;
                            
                            res = inputVal.replace(/[^0-9]/g, '');
                            value = parseInt(res);
                
                            if(!isNaN(value)) {
                                ctrl.$setViewValue('$'+res);

                                ctrl.$render();
                                return value;
                            } else {
                                ctrl.$setViewValue("$");

                                ctrl.$render();
                                return 0;

                            }
           

                        });
                        
                        ctrl.$formatters.push(function(value) {
                                return "$" + value;
                        });   
                        
                                                      
                        return;

                    }
                };
    }).directive('kwhInput', function() {
                return {
                    restrict: 'A',
                    require: 'ngModel', 
                    link: function(scope, element, attrs, ctrl) {
     
                         ctrl.$parsers.push(function(inputValue) {
                                var inputVal = element.val();

                                //clearing left side zeros
                                while (inputVal.charAt(0) == '0') {
                                    inputVal = inputVal.substr(1);
                                }
                                var res;
                                var value;

                                res = inputVal.replace(/[^0-9]/g, '');
                                value = parseInt(res);
                                res =   res + ' kWh';

                                ctrl.$setViewValue(res);

                                ctrl.$render();
                                return value;
                        });
                  
                       ctrl.$formatters.push(function(value) {
                                return value + ' kWh';
                        });                        
                                       
                    
                        return;
                }
            };
    });

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

        $scope.energyBill = dataService.dataObj;
        $scope.showHide = true;
        $scope.dataMonths = [];
	       
    
           // barChart.series[0].remove();
    
        noInputGiven = function () {
              for(var i = 0; i < $scope.energyBill.Month.length; i++) {
                  var tmp = $scope.energyBill.Month[i];
                  if(tmp.dollars != 0)
                      return false;
              }
            return true;
            
            
        };
   
 
 
        if(noInputGiven()) {
            
            $scope.energyBill.Month[0].dollars = 117;  $scope.energyBill.Month[1].dollars = 103;
            $scope.energyBill.Month[2].dollars = 90;   $scope.energyBill.Month[3].dollars = 92;
            $scope.energyBill.Month[4].dollars = 100;  $scope.energyBill.Month[5].dollars = 132;
            $scope.energyBill.Month[6].dollars = 158;  $scope.energyBill.Month[7].dollars = 176;
            $scope.energyBill.Month[8].dollars = 138;  $scope.energyBill.Month[9].dollars = 102;
            $scope.energyBill.Month[10].dollars = 100; $scope.energyBill.Month[11].dollars = 120;
			
            $scope.energyBill.Month[0].kWh = 117;  $scope.energyBill.Month[1].kWh = 103;
            $scope.energyBill.Month[2].kWh = 90;   $scope.energyBill.Month[3].kWh = 92;
            $scope.energyBill.Month[4].kWh = 100;  $scope.energyBill.Month[5].kWh = 132;
            $scope.energyBill.Month[6].kWh = 158;  $scope.energyBill.Month[7].kWh = 176 ;
            $scope.energyBill.Month[8].kWh = 138;  $scope.energyBill.Month[9].kWh = 102;
            $scope.energyBill.Month[10].kWh = 100; $scope.energyBill.Month[11].kWh = 120;
            
            
        }
 
    $scope.ShowGraph = function() {
                 $scope.showHide = $scope.showHide === false ? true: false;
        };

    $scope.energyBill.calculateTotalDollars();   
    $scope.energyBill.calculateTotalkWh();
  
    $scope.toggleCustomBar = function() {			
            var barChart = $('#bars').highcharts();   
  
            
            $scope.energyBill.dollar = $scope.energyBill.dollar === true ? false: true;
        
            if($scope.energyBill.dollar === true) {

                        var dataMonths = $scope.energyBill.calculateTotalDollars();   
                        barChart.series[0].setData(dataMonths);    

                } else {
                        var dataMonths = $scope.energyBill.calculateTotalkWh();
                        barChart.series[0].setData(dataMonths);
                }
    }
             
    //The first time controller is invoked        
    if($scope.energyBill.dollar === true) { 
        $scope.dataMonths  = $scope.energyBill.calculateTotalDollars();   
    } else {
        $scope.dataMonths  = $scope.energyBill.calculateTotalkWh();
    }
        
    
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
                                 
                                $scope.energyBill.Month[this.x].dollars =  Math.ceil(this.y);
                                $scope.energyBill.calculateTotalDollars();
                            }
                               
                            else {
                                
                                 $scope.energyBill.Month[this.x].kWh =  Math.ceil(this.y);
                                 $scope.energyBill.calculateTotalkWh();
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
	        
    $scope.energyBill.cumulative25YearsExpenseDisplay =  $scope.energyBill.convertToComma($scope.energyBill.cumulative25YearsExpense);
    
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
    $scope.dataMonths = [];
    var dollars = [];
                               
    //Populate the kWh if not fetched check from a global toggle
                                                        
    for (var i = 0; i < months.length; i++ ) {
                    var tmp = $scope.energyBill.Month[i];

                    var num = tmp.kWh  ;
                    $scope.dataMonths.push(num);        
    }
   
    solarEstimate = [356, 428, 666, 780, 906, 894, 878, 857, 736, 557, 405, 300];
    
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
            data: $scope.dataMonths
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