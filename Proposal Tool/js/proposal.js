var proposalControllers = angular.module('proposalControllers', [])
                            .service('dataService', function() {
                              // private variable
                               
                                var energyBill = [];
                                energyBill.Month = [];
                                energyBill.showHide = true;
                                energyBill.showHideLineGraph = true;
                                energyBill.lineGraphShowNotice = true;
                                energyBill.address = {};
                                energyBill.zipcode = 0;
                                // Variable for building and estimating solar Production
                                energyBill.solarSystem = [];
                               
                              //  energyBill.address.zipcode = 94591;
      
                                
                                //Create a zipcode to category mapping --Begin
                                energyBill.category = [];
                                energyBill.category[94591] = 'x';
                                
                                //Create a zipcode to category mapping --End
                                
                                // Sample estimated usage per region/zipcode
                                energyBill.RegionkWh = [];                                
                                energyBill.RegionkWh[94591] = [ 100, 52, 30, 29, 46, 123, 185, 223, 137, 52,
                                                                    52, 107 ];
                                                       

                                var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
                                                'September', 'October', 'November', 'December'];
                                
                                //Make it under energyBill if required by any Controller/User to change it
                                var solarRadiationFactor = [0.586626139817629, 0.729483282674772, 0.966565349544072,             
                                                            1.142857142857140, 1.294832826747720, 1.316109422492400,
                                                            1.370820668693000, 1.264437689969600, 1.136778115501520,
                                                            0.954407294832826, 0.674772036474164, 0.556231003039513
                                                            ];
                                
                                for(var i = 0 ; i < months.length; i++)
                                {
                                    energyBill.Month[i] = {};
                                    energyBill.Month[i].dollars = 0;
                                    energyBill.Month[i].kWh = 0;       

                                }   
                                
                                energyBill.percentChange = 7.0;
								energyBill.cumulative30YearsExpenseDisplay = 1;
                                energyBill.dollar = true;
                                energyBill.convert = true;
                                //The kWhRates used to show in when drawing lineCharts
                                energyBill.kWhRates= [0.08, 0.07, 0.08, 0.08, 0.09, 0.09, 0.09, 0.1, 0.11, 0.12, 0.12, 0.12, 0.12,
                                                      0.13, 0.13, 0.13, 0.11, 0.11, 0.12, 0.19, 0.19, 0.21, 0.18, 0.20, 0.28, 0.27,
                                                      0.28, 0.30, 0.28, 0.27, 0.26, 0.28, 0.29, 0.29];

                                energyBill.numArray = [1];
                                
                                //Static definition of slabs
                                energyBill.region = [];
                                //Create an object for each Region category code : ToDo Categories are p,q,r,s,t,u,v,w,x,y and z
                                
                                energyBill.region['x'] = new Object();
                                energyBill.region['x'].slabs = {};
                                energyBill.region['x'].slabs.summer = []; //May-Oct index 4-9
                                energyBill.region['x'].slabs.winter = [];//Nov-Apr index 0-3 and 10-11
                                //Initialize slabs used for computation of kWh and dollars
                                energyBill.region['x'].slabs.summer.push({ratePerkWh:0.16352, perDay: 9.3});
                                energyBill.region['x'].slabs.summer.push({ratePerkWh:0.18673, perDay: 12.09});
                                energyBill.region['x'].slabs.summer.push({ratePerkWh:0.27504, perDay:18.6});
                                energyBill.region['x'].slabs.summer.push({ratePerkWh:0.33504, perDay:27.9});
                                energyBill.region['x'].slabs.summer.push({ratePerkWh:0.33504, perDay: 10000});
                                
                                /*
                                 * LimitkWh = 20B of excel ResElecBaseline i.e X territory 16.7 per day winter usage
                                 * Setting up Tier from Tier 0 = 16.7 (per day limits)
                                 *                      Tier 1 = 130% of base Tier 0 (21.71)
                                 *                      Tier 2 = 200% of baseline (33.2)
                                 *                      Tier 3 = 300% of baseline (50.1)
                                 *                      Tier 4 = more than 300% (whatever)
                                 */
                                
                                energyBill.region['x'].slabs.winter.push({ratePerkWh:0.16352, perDay: 16.7});
                                energyBill.region['x'].slabs.winter.push({ratePerkWh:0.18673, perDay: 21.71});
                                energyBill.region['x'].slabs.winter.push({ratePerkWh:0.27504, perDay: 33.2  });
                                energyBill.region['x'].slabs.winter.push({ratePerkWh:0.33504, perDay: 50.1 });
                                energyBill.region['x'].slabs.winter.push({ratePerkWh:0.33504, perDay: 100000 });
                                
                                //Default values of energyBill.Monthly Bill
       
                                 energyBill.convertToComma = function (yourNumber) {
                                        var components = yourNumber.toString().split(".");
                                        //Comma-fies the first part
                                        components [0] = components [0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                        //Combines the two sections
                                        return components.join(".");  

                                };
                                isSummer = function (month) {
                                        if(month > 3 && month < 10)
                                            return true;
                                        else 
                                            return false;


                                };

                                energyBill.propagateEnergyBillFromDollar = function (i) {    

                                        //Start validation
                                        var input = energyBill.Month[i].dollars;
                                        
                                        isSummer = function (month) {
                                                            if(month > 3 && month < 10)
                                                                return true;
                                                            return false;
                                            
                                            
                                                    };

                                        findkWhFromDollars = function (dollar, k) {
                                                var totalKwh = 0;
                                                var slabs = [];
                                                var zip = energyBill.zipcode ;
                                                var category = energyBill.category[zip];
                                                var numDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                                            
                                                if( isSummer(k) )
                                                    slabs = energyBill.region[category].slabs.summer;
                                                else 
                                                    slabs = energyBill.region[category].slabs.winter;
                                                
                                                for(var i = 0; i < slabs.length && (dollar > 0) ; i++) {

                                                    if(dollar  > slabs[i].ratePerkWh* numDays[k] * slabs[i].perDay){
                                                        totalKwh += slabs[i].perDay * numDays[k];
                                                        dollar -= slabs[i].ratePerkWh* numDays[k] * slabs[i].perDay;

                                                    } else {
                                                        totalKwh += dollar/slabs[i].ratePerkWh;
                                                        break;
                                                    }
                                                }
                                                return totalKwh;
                                        };
                                            energyBill.Month[i].kWh = Math.ceil(findkWhFromDollars(input, i));           
            
                            };
                                
                            energyBill.propagateEnergyBillFromkWh = function (i) {    

                                    //Start validation
                                    var input = energyBill.Month[i].kWh;
                                    var numDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                                    //Use slab logic here ToDo

                                    findDollarFromkWh = function (kWhUsed, k) {
                                            var totalDollar = 0;
                                            var zip = energyBill.zipcode ;
                                            var category = energyBill.category[zip];
                                        
                                            if( isSummer(k) )
                                                slabs = energyBill.region[category].slabs.summer;
                                            else 
                                                slabs = energyBill.region[category].slabs.winter;

                                            
                                            for(var i = 0; i < slabs.length; i++) {

                                                if(kWhUsed  > numDays[k] * slabs[i].perDay){
                                                    totalDollar += numDays[k] * slabs[i].perDay* slabs[i].ratePerkWh;
                                                    kWhUsed -= numDays[k] * slabs[i].perDay;

                                                } else {
                                                    totalDollar += kWhUsed *slabs[i].ratePerkWh;
                                                    break;
                                                }

                                            }
                                            return totalDollar;

                                    };
                                    
                                    energyBill.Month[i].dollars =  Math.ceil(findDollarFromkWh(input, i)) ;
                                

                            };
                            //Calculate total annual cost and return fills the array with monthly expenditure
                            energyBill.calculateTotalDollars = function () {
                                        var dataMonths = [];
                                        energyBill.annualCost = 0;
                                        
                                        //Use slab logic here ToDo
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
                            energyBill.noInputGiven = function () {
                                for(var i = 0; i < energyBill.Month.length; i++) {
                                    var tmp = energyBill.Month[i];
                                    if(tmp.dollars != 0)
                                        return false;
                                }
                                    return true;


                            };
                            energyBill.setDefault = function ()    
                            {
                                energyBill.Month[0].dollars = 117;  energyBill.Month[1].dollars = 103;
                                energyBill.Month[2].dollars = 90;   energyBill.Month[3].dollars = 92;
                                energyBill.Month[4].dollars = 100;  energyBill.Month[5].dollars = 132;
                                energyBill.Month[6].dollars = 158;  energyBill.Month[7].dollars = 176;
                                energyBill.Month[8].dollars = 138;  energyBill.Month[9].dollars = 102;
                                energyBill.Month[10].dollars = 100; energyBill.Month[11].dollars = 120;

                                energyBill.Month[0].kWh = 595;  energyBill.Month[1].kWh = 528;
                                energyBill.Month[2].kWh = 498;   energyBill.Month[3].kWh = 497;
                                energyBill.Month[4].kWh = 520;  energyBill.Month[5].kWh = 627;
                                energyBill.Month[6].kWh = 713;  energyBill.Month[7].kWh = 766 ;
                                energyBill.Month[8].kWh = 646;  energyBill.Month[9].kWh = 528;
                                energyBill.Month[10].kWh = 528; energyBill.Month[11].kWh = 605;

                            };
                            energyBill.anyInputMissed = function () {
                                var i = 0, num = 0;
                               for(i = 0; i < energyBill.Month.length; i++) {
                                    var tmp = energyBill.Month[i];
                                    if(tmp.dollars != 0)
                                        num++;
                                }           
                                if(num == 0)
                                    return true;//Should not come here as noInputGiven must have been used once
                                else if (num < energyBill.Month.length - 1)
                                    return true; //Atleast one input has not been given
                                else 
                                    return false; //All inputs provided
                                

                            };
                            energyBill.firstFilledMonth = function () {
                                
                                for(i = 0; i < energyBill.Month.length; i++) {
                                    var tmp = energyBill.Month[i];
                                    if(tmp.dollars != 0)
                                        return i;
                                }
                                return -1; //No such month exists
                                
                            };
                                
                            energyBill.setEstimatedValues = function () {
                                var zip = energyBill.address.zipcode;
                                zip = 94591;//hardcoded value do away with it once updated from user
                                var estimateSampleUsage = energyBill.RegionkWh[zip];
                                var sampleMonthIndex = energyBill.firstFilledMonth(); //Month Index starts with zero as Jan
                                for(i = 0; i < energyBill.Month.length; i++) {
                                    if(i == sampleMonthIndex)
                                        continue;
                                    if(energyBill.Month[i].dollars == 0 || energyBill.Month[i].kWh == 0) {
                                        energyBill.Month[i].kWh = energyBill.Month[sampleMonthIndex].kWh *
                                                                    estimateSampleUsage[i]/
                                                                    estimateSampleUsage[sampleMonthIndex] ;
                                        //Propagate the dollar for kWh estimated
                                        energyBill.propagateEnergyBillFromkWh(i);
                                    }
                                }
                                
                                
                            };
                                
                            energyBill.setEstimatedSolarProduction = function(){
                                
                                var estimates = [] ;//[356, 428, 666, 780, 906, 894, 878, 857, 736, 557, 405, 300];
                                var numDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                                var energyMultiplier;
                                 energyBill.solarEstimatedProduction = 0;
                                var type = 260;
                                var energyProduction = 0;
                                var miscCost = 0;
                                var variation = [2.77, 3.13, 3.78, 4.21,4.48, 4.61, 4.14, 4.12, 3.75, 2.94, 2.85, 2.39];
                                for(var i = 0; i < energyBill.Month.length ; i++)
                                {
                                    /* Assuming 3.79 hours of sun everyday should multiply by 3600 but values are too big ~50000 kWh
                                     *Primarily to match values
                                     * Small issue: systemSize is representing number of panels 
                                     * ToDo: panel type to be fixed when the type is clicked while creating scenario
                                     */
                                    
                                    energyMultiplier =  variation[i] * 1 * numDays[i]*solarRadiationFactor[i]/1000;
                                    for(var j = 0; j < energyBill.solarSystem.length; j++) {
                                        if(energyBill.solarSystem[j].type260 == 1)
                                            energyProduction += 260 *  energyMultiplier * energyBill.solarSystem[j].systemSize;
                                        else 
                                            energyProduction += 280 * energyMultiplier * energyBill.solarSystem[j].systemSize;
                                        
                                    
                                    }
                                    estimates.push(Math.ceil(energyProduction));
                                    energyBill.solarEstimatedProduction += energyProduction;
                                    energyProduction = 0;
                                    
                                }
                                for(var j = 0; j < energyBill.solarSystem.length; j++) {
                                    miscCost += energyBill.solarSystem[j].electricalWork + energyBill.solarSystem[j].miscWork;
                                }
                                
                                
                                energyBill.solarEstimatedProductionDisplay = energyBill.convertToComma("" +
                                                                               Math.ceil(energyBill.solarEstimatedProduction));
                                
                                energyBill.solarEstimated30YearProductionDisplay = energyBill.convertToComma("" +
                                                                                    Math.ceil( energyBill.solarEstimatedProduction*30));
                                energyBill.solarSystemOffset =  energyBill.annualCost *
                                                                energyBill.solarEstimatedProduction/energyBill.annualUsage ;
                                energyBill.solarSystemOffset +=  miscCost;
                                energyBill.solarSystemOffsetDisplay = energyBill.convertToComma("" +
                                                                                Math.ceil(energyBill.solarSystemOffset));
                                
                                energyBill.annualTrueUpDisplay = energyBill.convertToComma("" + Math.ceil(energyBill.solarSystemOffset -
                                                                                                   energyBill.annualCost ));
                                return estimates;

                            };
				energyBill.menuPageArrayeu =[{'title': 'Review Your Energy Costs',
											  'visited':false,
											  'url':'#/startProposal/id1'
										   },
										   {'title': 'Your Billing History',
											'visited':false,
											'url':'#/review/id1'
										   },
										   {'title': 'Your Current Electric Bills',
											'visited':false,
											'url':'#/multipleBillBarGraph/id1'
										   },
										   {'title': 'Electric Price History',
											'visited':false,
											'url':'#/lineGraph/id1'
										   },
										   {'title': 'Electric Price Changs',
											'visited':false,
											'url':'#/percentageChange/id1'
										   },
										   {'title': 'Your Future Electric Costs',
											'visited':false,
											'url':'#/futureElectricCost/id1'
										   }];
										   
			   energyBill.menuPageArrayup =[{'title': 'What Your Options',
											'visited':false,
											 'url':'#/yourOptions/id1'
										   },
										   {'title': 'How Solar Work',
											'visited':false,
											'url':'#/solarSystemWork/id1'
										   },
										   {'title': 'Bild Your Solar System',
											'visited':false,
											'url':'#/buildSolarSystem/id1'
										   },
										   {'title': 'Your Solar Production',
											'visited':false,
											'url':'#/estimatedSolarSystemProduction/id1'
										   },
										   {'title': 'Solar System Sumary',
											'visited':false,
											'url':'#/solarSystemSummary/id1'
										   }];
								
			  energyBill.menuPageArraypay =[{'title': 'Payments options',
											'visited':false,
											 'url':'#/paymentOptions/id1'
										   },
										   {'title': 'Explore Payments',
											'visited':false,
											'url':'#/summary/id1'
										   },
										   {'title': 'HERO Summary',
											'visited':false,
											'url':'#/heroSummary/id1'
										   },
										   {'title': 'Whats Next?',
											'visited':false,
											'url':'#/finishApplication/id1'
										   }];
                                
                                
                                
                                

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

proposalControllers.controller('startProposalController', ['$scope', 'dataService', function($scope, dataService){
	        $scope.energyBill = dataService.dataObj;
		
	
	        $scope.navMenuPageArrayEnerUses  = $scope.energyBill.menuPageArrayeu; 
            $scope.navMenuPageArrayUpgrad    = $scope.energyBill.menuPageArrayup; 
            $scope.navMenuPageArrayPayment   = $scope.energyBill.menuPageArraypay; 
	
			for(var i = 0; i < $scope.energyBill.menuPageArrayeu.length; i++)
			{
				var tmp = $scope.energyBill.menuPageArrayeu[i];
				if(tmp.url == '#/startProposal/id1')
					tmp.visited = true;
			}
	        $scope.EnergyUsesMenu = function(i){
			return	$scope.energyBill.menuPageArrayeu[i].visited == true;		
			};
	      
}]);
proposalControllers.controller('reviewController', ['$scope', 'dataService', function($scope, dataService){
            $scope.energyBill = dataService.dataObj;
            $scope.navMenuPageArrayEnerUses  = $scope.energyBill.menuPageArrayeu; 
            $scope.navMenuPageArrayUpgrad    = $scope.energyBill.menuPageArrayup; 
            $scope.navMenuPageArrayPayment   = $scope.energyBill.menuPageArraypay; 
           
}]);


proposalControllers.controller('justOneBillController',['$scope', 'dataService', function($scope, dataService){
        $scope.custom = true;
        $scope.model = { id: 0 };
        $scope.energyBill = dataService.dataObj;
	    $scope.navMenuPageArrayEnerUses  = $scope.energyBill.menuPageArrayeu; 
		$scope.navMenuPageArrayUpgrad    = $scope.energyBill.menuPageArrayup; 
		$scope.navMenuPageArrayPayment   = $scope.energyBill.menuPageArraypay;
        $scope.toggleCustom = function() {
            
            $scope.energyBill.dollar = $scope.energyBill.dollar === false ? true: false;
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
	$scope.navMenuPageArrayEnerUses  = $scope.energyBill.menuPageArrayeu; 
	$scope.navMenuPageArrayUpgrad    = $scope.energyBill.menuPageArrayup; 
	$scope.navMenuPageArrayPayment   = $scope.energyBill.menuPageArraypay;
    
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
                                

                               

                                if(!isNaN(value)) {
                                    ctrl.$setViewValue(res + ' kWh');

                                    ctrl.$render();
                                    return value;
                                } else {
                                    ctrl.$setViewValue("kWh");

                                    ctrl.$render();
                                    return 0;

                                }
                               
                        });
                  
                       ctrl.$formatters.push(function(value) {
                                return value + ' kWh';
                        });                        
                                       
                        return;
                }
            };
    });

proposalControllers.controller('heroSummaryController',['$scope','dataService', function($scope,dataService){
	    $scope.energyBill = dataService.dataObj;
		$scope.navMenuPageArrayEnerUses  = $scope.energyBill.menuPageArrayeu; 
		$scope.navMenuPageArrayUpgrad    = $scope.energyBill.menuPageArrayup; 
		$scope.navMenuPageArrayPayment   = $scope.energyBill.menuPageArraypay; 
        $scope.showHide = true;
        $scope.showHideDetail = function() {
            $scope.showHide = $scope.showHide === false ? true: false;
        };
		
}]);
proposalControllers.controller('paymentOptionsController',['$scope','dataService', function($scope,dataService){
	    $scope.energyBill = dataService.dataObj;
		$scope.navMenuPageArrayEnerUses  = $scope.energyBill.menuPageArrayeu; 
		$scope.navMenuPageArrayUpgrad    = $scope.energyBill.menuPageArrayup; 
		$scope.navMenuPageArrayPayment   = $scope.energyBill.menuPageArraypay; 
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
	$scope.navMenuPageArrayEnerUses  = $scope.energyBill.menuPageArrayeu; 
	$scope.navMenuPageArrayUpgrad    = $scope.energyBill.menuPageArrayup; 
	$scope.navMenuPageArrayPayment   = $scope.energyBill.menuPageArraypay;
    $scope.numArray = $scope.energyBill.numArray;
	$scope.mounting = function(index, type){
	  $scope.energyBill.solarSystem[index].type260 = type;
	}
    
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
            $scope.navMenuPageArrayEnerUses  = $scope.energyBill.menuPageArrayeu; 
            $scope.navMenuPageArrayUpgrad    = $scope.energyBill.menuPageArrayup; 
            $scope.navMenuPageArrayPayment   = $scope.energyBill.menuPageArraypay;
    
        
    
    
    
}]);


proposalControllers.controller('yourOptionsController', ['$scope', 'dataService', function($scope, dataService){
            $scope.energyBill = dataService.dataObj;
	        $scope.navMenuPageArrayEnerUses  = $scope.energyBill.menuPageArrayeu; 
            $scope.navMenuPageArrayUpgrad    = $scope.energyBill.menuPageArrayup; 
            $scope.navMenuPageArrayPayment   = $scope.energyBill.menuPageArraypay;
            
}]);


proposalControllers.controller('multipleBillBarGraphController',['$scope', 'dataService' , function($scope, dataService){

        $scope.energyBill = dataService.dataObj;
		$scope.navMenuPageArrayEnerUses  = $scope.energyBill.menuPageArrayeu; 
		$scope.navMenuPageArrayUpgrad    = $scope.energyBill.menuPageArrayup; 
		$scope.navMenuPageArrayPayment   = $scope.energyBill.menuPageArraypay;
        $scope.showHide = $scope.energyBill.showHide;
        $scope.dataMonths = [];
	       
    
        if($scope.energyBill.noInputGiven()) {
            $scope.energyBill.setDefault();            
        }
    
        if($scope.energyBill.anyInputMissed())
        {
            $scope.energyBill.setEstimatedValues();

        }
    
    
    $scope.ShowGraph = function() {
                 $scope.showHide = $scope.showHide === false ? true: false;
		          $scope.energyBill.showHide = false;
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
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: {
           formatter: function () {
               var index = this.axis.categories.indexOf(this.value);
               if($scope.energyBill.dollar === true) {
                   if($scope.dataMonths[index].y !== undefined)
                       return ' <a>' +  this.value + '<br>' + '$' + Math.ceil($scope.dataMonths[index].y) + '</a>';
                   else 
                       return ' <a>' +  this.value + '<br>' + '$' + Math.ceil($scope.dataMonths[index]) + '</a>';
                } 
               else {
                   if($scope.dataMonths[index].y !== undefined)
                       return ' <a>' +  this.value + '<br>'  + Math.ceil($scope.dataMonths[index].y) + ' kWh' + '</a>';
                   else 
                       return ' <a>' +  this.value + '<br>'  + Math.ceil($scope.dataMonths[index]) +  ' kWh' + '</a>';
                    
                }
               
            }
        }
    },
    
    yAxis: {    
            title: {
                
                text: ''
            },
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
                                $scope.energyBill.propagateEnergyBillFromDollar(this.x);
                                $scope.energyBill.calculateTotalDollars();
                                
                            }
                               
                            else {
                                
                                 $scope.energyBill.Month[this.x].kWh =  Math.ceil(this.y);
                                 $scope.energyBill.propagateEnergyBillFromkWh(this.x);
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
                    return this.x + '<br>' + '$'+ Highcharts.numberFormat(this.y, 2) ;
                else 
                    return this.x + '<br>' + 'kWh'+ Highcharts.numberFormat(this.y, 2) ;
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
proposalControllers.controller('oneBillBarGraphController',['$scope','dataService', function($scope,dataService){
		$scope.energyBill = dataService.dataObj;
		$scope.navMenuPageArrayEnerUses  = $scope.energyBill.menuPageArrayeu; 
		$scope.navMenuPageArrayUpgrad    = $scope.energyBill.menuPageArrayup; 
		$scope.navMenuPageArrayPayment   = $scope.energyBill.menuPageArraypay; 
	    $scope.showHide = true;
           $scope.ShowGraph = function() {
                 $scope.showHide = $scope.showHide === false ? true: false;
        };
       
	}]);

proposalControllers.controller('solarSystemWorkController',['$scope','dataService', function($scope,dataService){
		$scope.energyBill = dataService.dataObj;
		$scope.navMenuPageArrayEnerUses  = $scope.energyBill.menuPageArrayeu; 
		$scope.navMenuPageArrayUpgrad    = $scope.energyBill.menuPageArrayup; 
		$scope.navMenuPageArrayPayment   = $scope.energyBill.menuPageArraypay;	
       
	}]);
proposalControllers.controller('solarSystemSummaryController',['$scope','dataService', function($scope,dataService){
		$scope.energyBill = dataService.dataObj;
		$scope.navMenuPageArrayEnerUses  = $scope.energyBill.menuPageArrayeu; 
		$scope.navMenuPageArrayUpgrad    = $scope.energyBill.menuPageArrayup; 
		$scope.navMenuPageArrayPayment   = $scope.energyBill.menuPageArraypay;	
       
	}]);
proposalControllers.controller('summaryController',['$scope','dataService', function($scope,dataService){
		$scope.energyBill = dataService.dataObj;
		$scope.navMenuPageArrayEnerUses  = $scope.energyBill.menuPageArrayeu; 
		$scope.navMenuPageArrayUpgrad    = $scope.energyBill.menuPageArrayup; 
		$scope.navMenuPageArrayPayment   = $scope.energyBill.menuPageArraypay;	
       
	}]);
proposalControllers.controller('finishApplicationController',['$scope','dataService', function($scope,dataService){
		$scope.energyBill = dataService.dataObj;
		$scope.navMenuPageArrayEnerUses  = $scope.energyBill.menuPageArrayeu; 
		$scope.navMenuPageArrayUpgrad    = $scope.energyBill.menuPageArrayup; 
		$scope.navMenuPageArrayPayment   = $scope.energyBill.menuPageArraypay;	
       
	}]);
proposalControllers.controller('noBillBarGraphController',['$scope','dataService', function($scope,dataService){
	  $scope.energyBill = dataService.dataObj;
	  $scope.navMenuPageArrayEnerUses  = $scope.energyBill.menuPageArrayeu; 
	  $scope.navMenuPageArrayUpgrad    = $scope.energyBill.menuPageArrayup; 
	  $scope.navMenuPageArrayPayment   = $scope.energyBill.menuPageArraypay; 
	  $scope.showHide = true;
           $scope.ShowGraph = function() {
                 $scope.showHide = $scope.showHide === false ? true: false;
        };
       
	}]);
proposalControllers.controller('lineGraphController',['$scope','dataService', function($scope, dataService){	

        $scope.energyBill = dataService.dataObj; 
	    $scope.navMenuPageArrayEnerUses  = $scope.energyBill.menuPageArrayeu; 
		$scope.navMenuPageArrayUpgrad    = $scope.energyBill.menuPageArrayup; 
		$scope.navMenuPageArrayPayment   = $scope.energyBill.menuPageArraypay;	
	
		$scope.lineGraphNotice           = $scope.energyBill.lineGraphShowNotice;
        $scope.showHide                  = $scope.energyBill.showHideLineGraph;
        var rates                        = $scope.energyBill.kWhRates;	       
           $scope.ShowGraph = function() {
                 $scope.showHide = $scope.showHide === false ? true: false;
			     $scope.energyBill.showHideLineGraph = false;			   
			     $scope.lineGraphNotice = $scope.lineGraphNotice === false ? true: false;

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
                    duration: 4000
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
	$scope.navMenuPageArrayEnerUses  = $scope.energyBill.menuPageArrayeu; 
	$scope.navMenuPageArrayUpgrad    = $scope.energyBill.menuPageArrayup; 
	$scope.navMenuPageArrayPayment   = $scope.energyBill.menuPageArraypay;
   
	 $scope.energyBill.cumulative30YearsExpense = 0;
    $scope.energyBill.percentChange = parseFloat($scope.energyBill.percentChange);
    var annualExpenses = [];
    for(var i = 0; i < 30; i++) {
        
          annualExpenses[i] = $scope.energyBill.annualCost + $scope.energyBill.annualCost*$scope.energyBill.percentChange/100 + $scope.energyBill.annualCost*i;
        if((i+1)%5 == 0 || i == 0){
			   fiveYearData.push(annualExpenses[i]);
		}
         
		$scope.energyBill.cumulative30YearsExpense += annualExpenses[i];
    }
    $scope.energyBill.cumulative30YearsExpense = Math.ceil($scope.energyBill.cumulative30YearsExpense);
	        
    $scope.energyBill.cumulative30YearsExpenseDisplay =  $scope.energyBill.convertToComma($scope.energyBill.cumulative30YearsExpense);
    
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
            categories: [0, 5, 10, 15, 20, 25, 30],
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
            title: {
                text: ''
            },
            
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
	$scope.navMenuPageArrayEnerUses  = $scope.energyBill.menuPageArrayeu; 
	$scope.navMenuPageArrayUpgrad    = $scope.energyBill.menuPageArrayup; 
	$scope.navMenuPageArrayPayment   = $scope.energyBill.menuPageArraypay;
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
   
    solarEstimate = $scope.energyBill.setEstimatedSolarProduction();
    
        
    $('#lineAreaChart').highcharts({
        title: {
            /*text: 'Combination chart'*/
        },
        yAxis: {
            title: {
                text: ''
             },
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