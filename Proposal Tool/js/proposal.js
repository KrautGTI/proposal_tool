var proposalControllers = angular.module('proposalControllers', [])
                            .service('dataService', function() {
                              // private variable

                                var energyBill = [];
                                energyBill.lastIteration = false;
                                energyBill.lastIteration2 = false;
                                energyBill.Month = [];
                                energyBill.showHide = true;
                                energyBill.showHideLineGraph = true;
                                energyBill.lineGraphShowNotice = true;
                                energyBill.address = {};
                               // energyBill.zipcode = 94591;
                                energyBill.solarCost = 0;
                                // Variable for building and estimating solar Production
                                energyBill.solarSystem = [];

                              //  energyBill.address.zipcode = 94591;


                                //Create a zipcode to category mapping --Begin
                                energyBill.category = [];
                            //    energyBill.category[94591] = 'x';
                                assignCategoryX = function (element, index, array) {
                                        energyBill.category[element] = 'x';
                                };


                                var xArray =

                                [93101, 93105, 93110, 93111, 93117, 93420 ,93422, 93423, 93426, 93427, 93432, 93436, 93437, 93438, 93440,
                                 93441, 93446, 93450, 93451, 93453, 93454, 93455, 93456, 93460, 93461, 93463, 93464, 93465, 93466, 93901,
                                 93908, 93921, 93923, 93924, 93925, 93926, 93927, 93928, 93930, 93932, 93954, 93960, 94002, 94003, 94010,
                                 94020, 94022, 94024, 94025, 94026, 94027, 94028, 94030, 94034, 94040, 94041, 94043, 94061, 94062, 94063,
                                 94065, 94066, 94070, 94085, 94086, 94087, 94088, 94089, 94303, 94305, 94306, 94401, 94402, 94403, 94404,
                                 94503, 94504, 94506, 94507, 94508, 94510, 94515, 94516, 94517, 94518, 94519, 94520, 94521, 94522, 94523,
                                 94525, 94526, 94528, 94536, 94538, 94539, 94541, 94542, 94544, 94545, 94546, 94547, 94549, 94550, 94551,
                                 94552, 94553, 94555, 94556, 94558, 94559, 94560, 94562, 94563, 94566, 94567, 94568, 94569, 94572, 94573,
                                 94574, 94576, 94577, 94578, 94579, 94580, 94582, 94583, 94585, 94586, 94587, 94588, 94589, 94590, 94591,
                                 94595, 94596, 94597, 94598, 94599, 94901, 94903, 94904, 94909, 94913, 94914, 94922, 94923, 94925, 94928,
                                 94930, 94931, 94933, 94938, 94939, 94945, 94946, 94947, 94949, 94951, 94952, 94954, 94957, 94960, 94963,
                                 94964, 94971, 94972, 94973, 95002, 95008, 95013, 95014, 95020, 95023, 95030, 95031, 95032, 95033, 95035,
                                 95037, 95038, 95043, 95044, 95045, 95046, 95050, 95051, 95054, 95070, 95075, 95076, 95101, 95103, 95110,
                                 95111, 95112, 95113, 95116, 95117, 95118, 95119, 95120, 95121, 95122, 95123, 95124, 95125, 95126, 95127,
                                 95128, 95129, 95130, 95131, 95132, 95133, 95134, 95135, 95136, 95138, 95139, 95140, 95141, 95148, 95150,
                                 95158, 95241, 95401, 95402, 95403, 95404, 95405, 95407, 95409, 95412, 95414, 95415, 95416, 95417, 95418,
                                 95419, 95421, 95424, 95425, 95427, 95428, 95429, 95430, 95433, 95436, 95439, 95441, 95442, 95444, 95446,
                                 95448, 95449, 95452, 95454, 95462, 95463, 95465, 95466, 95469, 95470, 95471, 95472, 95474, 95476, 95481,
                                 95482, 95486, 95488, 95490, 95492, 95494, 95550, 95585, 95587, 95606, 95903];

                                xArray.forEach(assignCategoryX);

                                assignCategoryP = function (element, index, array) {
                                        energyBill.category[element] = 'p';
                                };


                                var pArray =

                                [94248, 94301, 94533, 94585, 94942, 95221, 95222, 95224, 95229, 95232, 95245, 95246, 95247, 95248, 95249,                                  95250, 95251, 95255, 95257, 95305, 95309, 95310, 95321, 95327, 95347, 95370, 95372, 95379, 95416, 95422,
                                 95423, 95424, 95426, 95435, 95443, 95451, 95453, 95457, 95458, 95461, 95464, 95467, 95485, 95493, 95602,
                                 95603, 95613, 95614, 95619, 95623, 95629, 95631, 95633, 95634, 95635, 95639, 95642, 95643, 95651, 95656,
                                 95664, 95665, 95666, 95667, 95669, 95672, 95675, 95682, 95684, 95685, 95689, 95703, 95709, 95712, 95713,
                                 95717, 95722, 95726, 95736, 95762];

                                pArray.forEach(assignCategoryP);

                                assignCategoryQ = function (element, index, array) {
                                        energyBill.category[element] = 'q';
                                };

                                var qArray = [94020, 94062, 95030, 95033, 95060, 95076];
                                qArray.forEach(assignCategoryQ);

                                assignCategoryQ = function (element, index, array) {
                                        energyBill.category[element] = 'r';
                                };

                                var rArray =



                                [92304, 92365, 93062, 93210, 93224, 93234, 93242, 93243, 93245, 93251, 93252, 93254, 93265, 93286, 93287,
                                 93291, 93292, 93453, 93516, 93523, 93526, 93527, 93555, 93558, 93561, 93562, 93601, 93602, 93603, 93604,
                                 93606, 93607, 93608, 93609, 93610, 93611, 93612, 93614, 93616, 93618, 93619, 93620, 93621, 93622, 93624,
                                 93625, 93626, 93627, 93630, 93631, 93635, 93636, 93637, 93638, 93639, 93640, 93641, 93643, 93644, 93645,
                                 93646, 93647, 93648, 93650, 93651, 93652, 93653, 93654, 93656, 93657, 93660, 93662, 93664, 93665, 93667,
                                 93668, 93669, 93670, 93675, 93701, 93702, 93703, 93704, 93705, 93706, 93710, 93711, 93720, 93721, 93722,
                                 93723, 93725, 93726, 93727, 93728, 93730, 93737, 93741, 95301, 95303, 95305, 95306, 95311, 95312, 95315,
                                 95317, 95318, 95322, 95324, 95325, 95329, 95333, 95334, 95338, 95339, 95340, 95341, 95344, 95345, 95347,
                                 95348, 95353, 95360, 95365, 95369, 95374, 95388, 95527, 95563, 95963, 96001, 96002, 96003, 96007, 96008,
                                 96011, 96019, 96021, 96022, 96029, 96033, 96035, 96047, 96051, 96055, 96059, 96062, 96069, 96073, 96074,
                                 96075, 96078, 96080, 96084, 96087, 96088, 96089, 96090, 96092, 96095, 96096 ];

                                assignCategoryR = function (element, index, array) {
                                        energyBill.category[element] = 'r';
                                };


                                 rArray.forEach(assignCategoryR);

                                assignCategoryS = function (element, index, array) {
                                        energyBill.category[element] = 's';
                                };
                                var sArray =

                                [94203, 94211, 94503, 94505, 94509, 94511, 94512, 94513, 94514, 94527, 94531, 94533, 94534, 94535,
                                 94543, 94548, 94558, 94561, 94565, 94571, 94585, 94662, 95201, 95202, 95203, 95204, 95205, 95206,
                                 95207, 95209, 95210, 95212, 95215, 95219, 95220, 95222, 95225, 95226, 95227, 95228, 95230, 95231,
                                 95234, 95236, 95237, 95240, 95242, 95245, 95249, 95252, 95253, 95254, 95258, 95304, 95307, 95309,
                                 95313, 95315, 95316, 95319, 95320, 95323, 95326, 95327, 95328, 95329, 95330, 95336, 95337, 95347,
                                 95350, 95351, 95352, 95354, 95355, 95356, 95357, 95358, 95360, 95361, 95363, 95366, 95367, 95368,
                                 95376, 95377, 95378, 95380, 95381, 95382, 95385, 95386, 95387, 95391, 95434, 95601, 95602, 95603,
                                 95604, 95605, 95606, 95607, 95608, 95610, 95612, 95613, 95614, 95615, 95616, 95617, 95618, 95620,
                                 95621, 95623, 95624, 95625, 95626, 95627, 95628, 95629, 95630, 95632, 95637, 95640, 95641, 95642,
                                 95645, 95648, 95650, 95651, 95652, 95653, 95654, 95658, 95659, 95660, 95661, 95662, 95663, 95664,
                                 95667, 95668, 95669, 95670, 95672, 95673, 95674, 95676, 95677, 95678, 95679, 95680, 95681, 95682,
                                 95685, 95686, 95687, 95688, 95690, 95691, 95692, 95694, 95695, 95697, 95698, 95699, 95742, 95746,
                                 95747, 95757, 95758, 95762, 95765 ,95776, 95811, 95812, 95814, 95816, 95817, 95818, 95819, 95820,
                                 95821, 95822, 95823, 95824, 95825, 95826, 95827, 95828, 95829, 95830, 95831, 95832, 95833, 95834,
                                 95835, 95837, 95838, 95841, 95842, 95843, 95864, 95901, 95903, 95912, 95913, 95914, 95915, 95916,
                                 95917, 95918, 95920, 95926, 95927, 95928, 95932, 95937, 95938, 95939, 95943, 95946, 95948, 95949,
                                 95950, 95951, 95953, 95955, 95957, 95958, 95961, 95962, 95963, 95965, 95966, 95968, 95969, 95970,
                                 95972, 95973, 95974, 95975, 95977, 95979, 95982, 95987, 95988, 95991, 95993];

                                sArray.forEach(assignCategoryS);

                                var tArray =
[93401,93402,93405,93406,93420,93421,93424,93427,93428,93429,93430,93433,93434,93435,93436,93440,93442,93443,93444,93445,93449,93452,93454,93455,93456,93458,93901,93905,93906,93907,93908,93915,93920,93921,93922,93923,93924,93933,93940,93943,93950,93953,93955,93962,94005,94014,94015,94018,94019,94020,94021,94037,94038,94044,94060,94066,94074,94080,94101,94102,94103,94104,94105,94107,94108,94109,94110,94111,94112,94113,94114,94115,94116,94117,94118,94121,94122,94123,94124,94127,94129,94130,94131,94132,94133,94134,94141,94143,94158,94159,94501,94502,94530,94547,94564,94601,94602,94603,94604,94605,94606,94607,94608,94609,94610,94611,94612,94613,94618,94619,94621,94701,94702,94703,94704,94705,94706,94707,94708,94709,94710,94720,94801,94803,94804,94805,94806,94920,94922,94923,94924,94929,94937,94938,94940,94941,94950,94956,94965,94966,94970,94971,94972,95001,95003,95004,95005,95006,95007,95010,95012,95017,95018,95019,95021,95033,95039,95041,95045,95060,95062,95063,95064,95065,95066,95067,95073,95076,95078,95101,95410,95412,95420,95421,95430,95432,95437,95445,95450,95456,95459,95460,95465,95468,95480,95488,95497];
                                assignCategoryT = function (element, index, array) {
                                        energyBill.category[element] = 't';
                                };
                                tArray.forEach(assignCategoryT);

                                var vArray =
                                [95501,95502,95503,95514,95518,95519,95521,95524,95525,95526,95528,95536,95537,95540,95542,95546,95547,95549,95550,95551,95555,95558,95561,95562,95564,95565,95569,95570,95589];

                                assignCategoryV = function (element, index, array) {
                                        energyBill.category[element] = 'v';
                                };
                                vArray.forEach(assignCategoryV);

                                var wArray =
                                [92304,93201,93203,93204,93206,93212,93214,93219,93224,93230,93232,93239,93240,93241,93242,93243,93245,93249,93250,93251,93252,93256,93263,93266,93268,93274,93276,93277,93280,93282,93286,93291,93292,93301,93302,93303,93304,93305,93306,93307,93308,93309,93311,93312,93313,93314,93330,93615,93618,93631,93646,93647,93654,93656,93666,93670,93673];

                                assignCategoryW = function (element, index, array) {
                                        energyBill.category[element] = 'w';
                                };
                                wArray.forEach(assignCategoryW);

                                var yArray =
                                    [92704,93602,93603,93621,93623,93628,93633,93634,93641,93643,93644,93664,93667,95223,95224,95233,95247,95318,95321,95335,95338,95346,95364,95370,95375,95379,95383,95389,95511,95514,95525,95526,95527,95528,95542,95545,95546,95550,95552,95553,95554,95556,95558,95559,95560,95563,95565,95568,95569,95571,95573,95587,95595,95631,95634,95636,95666,95667,95684,95689,95701,95709,95714,95715,95717,95720,95724,95726,95735,95910,95915,95916,95923,95930,95934,95936,95939,95940,95941,95942,95944,95945,95947,95956,95959,95960,95966,95971,95978,95980,95983,95984,96009,96010,96011,96013,96016,96020,96028,96040,96041,96051,96056,96059,96061,96065,96068,96069,96071,96075,96076,96084,96088,96096,96125,96137];


                              assignCategoryY = function (element, index, array) {
                                        energyBill.category[element] = 'y';
                                };
                                yArray.forEach(assignCategoryY);

                                var zArray =
                                [93633,93664,95221,95223,95375,95389,95721,95724,95728,95735,95942,95971,95981,96061,96063,96071,96125,96137];

                              assignCategoryZ = function (element, index, array) {
                                        energyBill.category[element] = 'z';
                                };
                                zArray.forEach(assignCategoryZ);




                                //Create a zipcode to category mapping --End

                                // Sample estimated usage per region/zipcode
                                energyBill.RegionkWh = [];
                 //               energyBill.RegionkWh[94591] = [ 100, 52, 30, 29, 46, 123, 185, 223, 137, 52, 52, 107 ];
                                energyBill.RegionkWh = [ 100, 52, 30, 29, 46, 123, 185, 223, 137, 52, 52, 107 ];


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
                                energyBill.yearChange = 30;
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


                                /*
                                 * LimitkWh = 20B of excel ResElecBaseline i.e X territory 16.7 per day winter usage
                                 * Setting up Tier from Tier 0 = 16.7 (per day limits)
                                 *                      Tier 1 = 130% of base Tier 0 (21.71)
                                 *                      Tier 2 = 200% of baseline (33.2)
                                 *                      Tier 3 = 300% of baseline (50.1)
                                 *                      Tier 4 = more than 300% (whatever)
                                 */

                                var categories = [];
                                categories.push({region:'p', perSummerDayLimit: 16.4, perWinterDay: 29.6});
                                categories.push({region:'q', perSummerDayLimit: 29.6, perWinterDay: 8.3});
                                categories.push({region:'r', perSummerDayLimit: 29.8, perWinterDay: 18.8});
                                categories.push({region:'s', perSummerDayLimit: 27.1, perWinterDay: 16.4});
                                categories.push({region:'t', perSummerDayLimit: 14.9, perWinterDay: 8.3});
                                categories.push({region:'v', perSummerDayLimit: 26.6, perWinterDay: 13.6});
                                categories.push({region:'w', perSummerDayLimit: 20.6, perWinterDay: 20.8});
                                categories.push({region:'x', perSummerDayLimit: 9.3, perWinterDay: 16.7});
                                categories.push({region:'y', perSummerDayLimit: 13.0, perWinterDay: 27.1});                                                               categories.push({region:'z', perSummerDayLimit: 7.7, perWinterDay: 18.7});



                                for(var i = 0; i < categories.length; i++)
                                {
                                    var tmp = categories[i];
                                    var cat = tmp.region;
                                    var tiers = [0.16352, 0.18673, 0.27504, 0.33504, 0.33504 ];
                                    var multipliers = [1, 1.3, 2 , 3, 100];

                                    energyBill.region[cat] = new Object();
                                    energyBill.region[cat].slabs = {};
                                    energyBill.region[cat].slabs.summer = []; //May-Oct index 4-9
                                    energyBill.region[cat].slabs.winter = [];
                                    for(var j = 0; j < tiers.length; j++) {
                                        energyBill.region[cat].slabs.summer.push({ratePerkWh:tiers[j],
                                                                                  perDay: tmp.perSummerDayLimit * multipliers[j]});
                                        energyBill.region[cat].slabs.winter.push({ratePerkWh:tiers[j],
                                                                                  perDay: tmp.perWinterDay* multipliers[j]});


                                    }

                                }




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
                                                var zip = parseInt(energyBill.zipcode );
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
                                            var zip = parseInt(energyBill.zipcode) ;
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
                                        energyBill.annualCostDisplay = energyBill.convertToComma("" + Math.ceil(energyBill.annualCost));

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
                                                                                            Math.ceil(energyBill.annualUsage));

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
                             //   zip = 94591;//hardcoded value do away with it once updated from user
                            //    var estimateSampleUsage = energyBill.RegionkWh[zip];
                                    var estimateSampleUsage = energyBill.RegionkWh;
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
                                    miscCost += parseInt(energyBill.solarSystem[j].electricalWork) +
                                                    parseInt(energyBill.solarSystem[j].miscWork);
                                    if(energyBill.solarSystem[j].type260 == 1)
                                        energyBill.solarCost += 1000 * parseInt(energyBill.solarSystem[j].systemSize);
                                    else
                                       energyBill.solarCost += 1200 * parseInt(energyBill.solarSystem[j].systemSize);
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
}]).directive('zipValidator', function(dataService) {
                    return {
                      require: 'ngModel',

                      link: function(scope, element, attrs, ctrl) {

                            ctrl.$parsers.unshift(function(value) {
                                // test and set the validity after update.
                                var energyBill = dataService.dataObj;
                                var valid = $.isNumeric(value);
                                valid = energyBill.category[parseInt(value)] == undefined ? false : true;
                                ctrl.$setValidity('regexValidate', valid);

                                // if it's valid, return the value to the model,
                                // otherwise return undefined.
                                return valid ? value : undefined;
                            });

                            // add a formatter that will process each time the value
                            // is updated on the DOM element.
                            ctrl.$formatters.unshift(function(value) {
                                // validate.
                                ctrl.$setValidity('regexValidate', $.isNumeric(value));

                                // return the value or nothing will be written to the DOM.
                                return value;
                            });

                      }
                    };
            });

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
                            while (inputVal.charAt(1) == '0') {
                                inputVal = inputVal.substr(2);
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

                                ctrl.$setViewValue("$" + 0);

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
    }).directive('kwhInput', [ '$parse', function($parse) {
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
                                   // ctrl.$setViewValue(res + ' kWh');

                                    ctrl.$render();
                                    return value;
                                } else {
                                  //  ctrl.$setViewValue("kWh");

                                    ctrl.$render();
                                    return 0;

                                }

                        });

                       ctrl.$formatters.push(function(value) {
                                return value+ ' kWh';
                        });
                        element.bind('blur', function() {
                            if(!ctrl.$valid) {
                                return;
                            }
                            var viewValue = ctrl.$modelValue;
                            var formatters = ctrl.$formatters;
                            for (var i = formatters.length - 1; i >= 0; --i) {
                                viewValue = formatters[i](viewValue);
                            }
                            viewValue = viewValue.replace(/[^0-9]/g, '');
                            ctrl.$viewValue = viewValue + " kWh" ;
                            ctrl.$render();
                        });

                        return;
                }
            };
    }]);

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





}]).directive('percModelFormatter', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, controller) {
     controller.$formatters.push(function(value) {
        return value + " %";
      });
    }
  }
}).directive('yrsModelFormatter', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, controller) {
     controller.$formatters.push(function(value) {
        return value + " yrs";
      });
    }
  }
});;


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
                       return ' <a> <strong>' +  this.value + ' </strong><br>' + '$' + Math.ceil($scope.dataMonths[index].y) + '</a>';
                   else
                       return ' <a><strong>' +  this.value + '</strong><br>' + '$' + Math.ceil($scope.dataMonths[index]) + '</a>';
                }
               else {
                   if($scope.dataMonths[index].y !== undefined)
                       return ' <a><strong>' +  this.value + '</strong><br>'  + Math.ceil($scope.dataMonths[index].y) + ' kWh' + '</a>';
                   else
                       return ' <a><strong>' +  this.value + '</strong><br>'  + Math.ceil($scope.dataMonths[index]) +  ' kWh' + '</a>';

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
                                $scope.$apply();

                            }

                            else {

                                 $scope.energyBill.Month[this.x].kWh =  Math.ceil(this.y);
                                 $scope.energyBill.propagateEnergyBillFromkWh(this.x);
                                 $scope.energyBill.calculateTotalkWh();
                                 $scope.$apply();
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
                    return '$'+ Highcharts.numberFormat(this.y, 2) ;
                else
                    return   Highcharts.numberFormat(this.y, 2) + ' kWh';
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



    $('#columnChart').highcharts({
        chart: {
            type: 'column'

        },

        xAxis: {
            type: 'datetime',
            labels : {
                rotation: -45,


            },
            dateTimeLabelFormats: {
            day: '%y'
            }
        },
        yAxis: {
            title: '' ,
            labels : {
                formatter: function () {
                            if(this.value > 0)
                                return "$" + $scope.energyBill.convertToComma(this.value);
                            else if(this.value == 0)
                                return "$0";
                            else
                                return "-" + "$" + $scope.energyBill.convertToComma(-this.value);

                }
            }
        },
        legend : {
            enabled: false
        },
        series: [ {

            data: [2000, -2500, -3456, 2456, 1145, 5432 , 6432, 5234, -4234, 6423, 5423, 4243 , -4423, 5243, 6423, 1243,-1044, 1323, 1323, 1323, 1423, 1523, 1654, 1064, 8423, 1923],
            pointStart: Date.UTC(2016, 0, 1),
            color: '#717171',
            pointInterval: 365 * 24 * 3600 * 1000 // one year
        }]
    });

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
        if($scope.energyBill.dollar === true) {

                 $scope.energyBill.calculateTotalDollars();


        } else {
                $scope.energyBill.calculateTotalkWh();

        }


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


    var workData = [];
    var years = [];
    var totalYearData = [];
    $scope.energyBill = dataService.dataObj;
    $scope.navMenuPageArrayEnerUses  = $scope.energyBill.menuPageArrayeu;
    $scope.navMenuPageArrayUpgrad    = $scope.energyBill.menuPageArrayup;
    $scope.navMenuPageArrayPayment   = $scope.energyBill.menuPageArraypay;

    $scope.energyBill.cumulative30YearsExpense = 0;

    $scope.clickButton = function () {
            var i = workData.length;
            var areaChart = $('#areaChart').highcharts();
            var series = areaChart.series[0];
            var x = 20;
            // Add it


                if(i < totalYearData.length)
                {
                    //workData[i] = fiveYearData[i];
                    series.addPoint(totalYearData[i]);
                    //Label Approach
                    $scope.label.destroy();
                    if(i < totalYearData.length - 1) {
                        var point = series.points[i];
                        if(areaChart.plotSizeX - point.plotX > 100){
                            $scope.label = areaChart.renderer.label(
                                                        '<div class="btn-proposal row" display: block;>\
                                                            <div class="btn-text col-sm-6"> Next 5 Years</div> \
                                                            <div class="btn-graphic col-sm-6">\
                                                                <div style="margin-top: 12px; width:40px; font-size:25px" \
                                                                    class="glyphicon glyphicon-chevron-right"> \
                                                                </div>\
                                                            </div>\
                                                        </div>', point.plotX , 200,
                                                        'square', point.plotX , point.plotY, true)
                                                    .css({

                                    //                    color: '#FFFFFF',
                                    //                    className: "glyphicon glyphicon-chevron-right"

                                                        })
                                                    .attr({
                                     //                   fill: 'rgba(255, 0, 0, 0.55)',
                                     //                   padding: 8,
                                     //                   r: 5,
                                     //                  cursor:'pointer',
                                                        zIndex: 6,


                                                    }).add();
                        }

                        else {
                            $scope.label = areaChart.renderer.label(
                                                    '<div class="btn-proposal" display: block;><div class="btn-text"> \
                                                            Next 5 Years</div></div>', point.plotX - 50 , 200,
                                                    'square', point.plotX , point.plotY, true)
                                                .css({

                                //                    color: '#FFFFFF',
                                //                    className: "glyphicon glyphicon-chevron-right"

                                                    })
                                                .attr({
                                 //                   fill: 'rgba(255, 0, 0, 0.55)',
                                 //                   padding: 8,
                                 //                   r: 5,
                                 //                  cursor:'pointer',
                                                    zIndex: 6,


                                                }).add();

                        }

                        $( ".btn-proposal" ).click($scope.clickButton);
                    } else {
                        //The last time the box no longer needed

                        $scope.energyBill.lastIteration = true;
                        $scope.energyBill.lastIteration2 = false;
                        $scope.$apply() ;

                    }
                }
    } ;

    $scope.ShowBluImage = function() {
            $scope.energyBill.lastIteration = false;
            /*$scope.energyBill.lastIteration == true;*/
            $scope.energyBill.lastIteration2 = $scope.energyBill.lastIteration2 === false ? true: false;


        };

    $scope.energyBill.percentChange = parseFloat($scope.energyBill.percentChange);
    var annualExpenses = [];
    annualExpenses[0] = $scope.energyBill.annualCost;
    totalYearData.push($scope.energyBill.annualCost);
    years.push(0);
    for(var i = 1; i < $scope.energyBill.yearChange; i++) {

          annualExpenses[i] = annualExpenses[i-1] + annualExpenses[i-1]*$scope.energyBill.percentChange/100 ;

        if((i+1)%5 == 0 ) {
               totalYearData.push(annualExpenses[i]);
                years.push(i+1);
        }

        $scope.energyBill.cumulative30YearsExpense += annualExpenses[i];
    }
    $scope.energyBill.cumulative30YearsExpense = Math.ceil($scope.energyBill.cumulative30YearsExpense);

    $scope.energyBill.cumulative30YearsExpenseDisplay =  $scope.energyBill.convertToComma($scope.energyBill.cumulative30YearsExpense);

    for(var i = 0; i < totalYearData.length; i++) {
        if(i < 2)
            workData[i] = totalYearData[i];

    }
    $scope.loop = 0;
    $scope.energyBill.lastIteration = false;
    $scope.energyBill.lastIteration2 = false;
    $('#areaChart').highcharts({
        chart: {
            type: 'area',
            animation: true,
            events: {
                load: function () {
                    //Label Approach
                        var point = this.series[0].points[1];
                                $scope.label = this.renderer.label('<div class="btn-proposal" display: block;>\
                                                                    <div class="btn-text">Next 5 Years</div></div>',
                                                                   point.plotX , 200,
                                                                   'square', point.plotX , point.plotY
                                                                   + this.plotTop,
                                                                   true)
                                                        .add();
                                $( ".btn-proposal" ).click($scope.clickButton);

                }

            }
        },
        title: {
          //  text: 'Your Future Electric Costs'
        },
         legend: {enabled:false},
        xAxis: {
            allowDecimals: false,
            categories: years,
            labels: {
                formatter: function () {
                    var index = this.axis.categories.indexOf(this.value);
                    if(this.value == 0)
                        return '<strong> Today'+ '</strong><br> $' + $scope.energyBill.convertToComma(Math.ceil(workData[index]))
                            + '/yr';
                    else
                        return '<strong>' + this.value + ' years' + '<strong> <br> $' +
                            $scope.energyBill.convertToComma(Math.ceil(workData[index])) + '/yr';
                    // clean, unformatted number for year
                }
            }
        },
        yAxis: {
            title: {
                text: ''
            },


            labels: {
                formatter: function () {
                    return "$" + $scope.energyBill.convertToComma(this.value) ;
                }
            },
            tickAmount: 7,
            tickInterval: 500
        },
        tooltip: {
            pointFormat: '{point.y}',
            formatter: function () {


                return ' $' + $scope.energyBill.convertToComma(Math.ceil(this.y)) + '/yr';

            }
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
            },
        cursor: 'ns-resize'
        },
        series: [{

            data: workData,
            animation: false

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
