var proposalControllers = angular.module('proposalControllers', [])
    .service('dataService', function () {
        // private variable

        var energyBill = [];
        energyBill.lastIteration = false;
        energyBill.lastIteration2 = false;
        energyBill.Month = [];
        var months = ['January', 'February', 'March', 'April', 'May',
                                              'June', 'July', 'August', 'September', 'October',
                                              'November', 'December'];

        energyBill.showHide = true;
        energyBill.showHideLineGraph = true;
        energyBill.lineGraphShowNotice = true;


        energyBill.zipcodes = [];
        var today = new Date();
        var dd = today.getDate();
        var mmmm = months[today.getMonth()]; //January is 0!
        var yyyy = today.getFullYear();



        today = dd + ' ' + mmmm + ', ' + yyyy;
        energyBill.date = today;

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
            energyBill.zipcodes.push(element);
        };


        var xArray =

                                [93101, 93105, 93110, 93111, 93117, 93420, 93422, 93423, 93426, 93427, 93432, 93436, 93437, 93438, 93440,
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
            energyBill.zipcodes.push(element);
        };


        var pArray =

                                [94248, 94301, 94533, 94585, 94942, 95221, 95222, 95224, 95229, 95232, 95245, 95246, 95247, 95248, 95249, 95250, 95251, 95255, 95257, 95305, 95309, 95310, 95321, 95327, 95347, 95370, 95372, 95379, 95416, 95422,
                                 95423, 95424, 95426, 95435, 95443, 95451, 95453, 95457, 95458, 95461, 95464, 95467, 95485, 95493, 95602,
                                 95603, 95613, 95614, 95619, 95623, 95629, 95631, 95633, 95634, 95635, 95639, 95642, 95643, 95651, 95656,
                                 95664, 95665, 95666, 95667, 95669, 95672, 95675, 95682, 95684, 95685, 95689, 95703, 95709, 95712, 95713,
                                 95717, 95722, 95726, 95736, 95762];

        pArray.forEach(assignCategoryP);

        assignCategoryQ = function (element, index, array) {
            energyBill.category[element] = 'q';
            energyBill.zipcodes.push(element);
        };

        var qArray = [94020, 94062, 95030, 95033, 95060, 95076];
        qArray.forEach(assignCategoryQ);

        assignCategoryQ = function (element, index, array) {
            energyBill.category[element] = 'r';
            energyBill.zipcodes.push(element);
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
                                 96075, 96078, 96080, 96084, 96087, 96088, 96089, 96090, 96092, 96095, 96096];

        assignCategoryR = function (element, index, array) {
            energyBill.category[element] = 'r';
            energyBill.zipcodes.push(element);
        };


        rArray.forEach(assignCategoryR);

        assignCategoryS = function (element, index, array) {
            energyBill.category[element] = 's';
            energyBill.zipcodes.push(element);
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
                                 95747, 95757, 95758, 95762, 95765, 95776, 95811, 95812, 95814, 95816, 95817, 95818, 95819, 95820,
                                 95821, 95822, 95823, 95824, 95825, 95826, 95827, 95828, 95829, 95830, 95831, 95832, 95833, 95834,
                                 95835, 95837, 95838, 95841, 95842, 95843, 95864, 95901, 95903, 95912, 95913, 95914, 95915, 95916,
                                 95917, 95918, 95920, 95926, 95927, 95928, 95932, 95937, 95938, 95939, 95943, 95946, 95948, 95949,
                                 95950, 95951, 95953, 95955, 95957, 95958, 95961, 95962, 95963, 95965, 95966, 95968, 95969, 95970,
                                 95972, 95973, 95974, 95975, 95977, 95979, 95982, 95987, 95988, 95991, 95993];

        sArray.forEach(assignCategoryS);

        var tArray = [93401, 93402, 93405, 93406, 93420, 93421, 93424, 93427, 93428, 93429, 93430, 93433, 93434, 93435, 93436, 93440, 93442, 93443, 93444, 93445, 93449, 93452, 93454, 93455, 93456, 93458, 93901, 93905, 93906, 93907, 93908, 93915, 93920, 93921, 93922, 93923, 93924, 93933, 93940, 93943, 93950, 93953, 93955, 93962, 94005, 94014, 94015, 94018, 94019, 94020, 94021, 94037, 94038, 94044, 94060, 94066, 94074, 94080, 94101, 94102, 94103, 94104, 94105, 94107, 94108, 94109, 94110, 94111, 94112, 94113, 94114, 94115, 94116, 94117, 94118, 94121, 94122, 94123, 94124, 94127, 94129, 94130, 94131, 94132, 94133, 94134, 94141, 94143, 94158, 94159, 94501, 94502, 94530, 94547, 94564, 94601, 94602, 94603, 94604, 94605, 94606, 94607, 94608, 94609, 94610, 94611, 94612, 94613, 94618, 94619, 94621, 94701, 94702, 94703, 94704, 94705, 94706, 94707, 94708, 94709, 94710, 94720, 94801, 94803, 94804, 94805, 94806, 94920, 94922, 94923, 94924, 94929, 94937, 94938, 94940, 94941, 94950, 94956, 94965, 94966, 94970, 94971, 94972, 95001, 95003, 95004, 95005, 95006, 95007, 95010, 95012, 95017, 95018, 95019, 95021, 95033, 95039, 95041, 95045, 95060, 95062, 95063, 95064, 95065, 95066, 95067, 95073, 95076, 95078, 95101, 95410, 95412, 95420, 95421, 95430, 95432, 95437, 95445, 95450, 95456, 95459, 95460, 95465, 95468, 95480, 95488, 95497];
        assignCategoryT = function (element, index, array) {
            energyBill.category[element] = 't';

            energyBill.zipcodes.push(element);

        };
        tArray.forEach(assignCategoryT);

        var vArray = [95501, 95502, 95503, 95514, 95518, 95519, 95521, 95524, 95525, 95526, 95528, 95536, 95537, 95540, 95542, 95546, 95547, 95549, 95550, 95551, 95555, 95558, 95561, 95562, 95564, 95565, 95569, 95570, 95589];

        assignCategoryV = function (element, index, array) {
            energyBill.category[element] = 'v';
            energyBill.zipcodes.push(element);
        };
        vArray.forEach(assignCategoryV);

        var wArray = [92304, 93201, 93203, 93204, 93206, 93212, 93214, 93219, 93224, 93230, 93232, 93239, 93240, 93241, 93242, 93243, 93245, 93249, 93250, 93251, 93252, 93256, 93263, 93266, 93268, 93274, 93276, 93277, 93280, 93282, 93286, 93291, 93292, 93301, 93302, 93303, 93304, 93305, 93306, 93307, 93308, 93309, 93311, 93312, 93313, 93314, 93330, 93615, 93618, 93631, 93646, 93647, 93654, 93656, 93666, 93670, 93673];

        assignCategoryW = function (element, index, array) {
            energyBill.category[element] = 'w';
            energyBill.zipcodes.push(element);
        };
        wArray.forEach(assignCategoryW);

        var yArray = [92704, 93602, 93603, 93621, 93623, 93628, 93633, 93634, 93641, 93643, 93644, 93664, 93667, 95223, 95224, 95233, 95247, 95318, 95321, 95335, 95338, 95346, 95364, 95370, 95375, 95379, 95383, 95389, 95511, 95514, 95525, 95526, 95527, 95528, 95542, 95545, 95546, 95550, 95552, 95553, 95554, 95556, 95558, 95559, 95560, 95563, 95565, 95568, 95569, 95571, 95573, 95587, 95595, 95631, 95634, 95636, 95666, 95667, 95684, 95689, 95701, 95709, 95714, 95715, 95717, 95720, 95724, 95726, 95735, 95910, 95915, 95916, 95923, 95930, 95934, 95936, 95939, 95940, 95941, 95942, 95944, 95945, 95947, 95956, 95959, 95960, 95966, 95971, 95978, 95980, 95983, 95984, 96009, 96010, 96011, 96013, 96016, 96020, 96028, 96040, 96041, 96051, 96056, 96059, 96061, 96065, 96068, 96069, 96071, 96075, 96076, 96084, 96088, 96096, 96125, 96137];


        assignCategoryY = function (element, index, array) {
            energyBill.category[element] = 'y';
            energyBill.zipcodes.push(element);
        };
        yArray.forEach(assignCategoryY);

        var zArray = [93633, 93664, 95221, 95223, 95375, 95389, 95721, 95724, 95728, 95735, 95942, 95971, 95981, 96061, 96063, 96071, 96125, 96137];

        assignCategoryZ = function (element, index, array) {
            energyBill.category[element] = 'z';
            energyBill.zipcodes.push(element);
        };
        zArray.forEach(assignCategoryZ);




        //Create a zipcode to category mapping --End

        // Sample estimated usage per region/zipcode
        energyBill.RegionkWh = [];
        //               energyBill.RegionkWh[94591] = [ 100, 52, 30, 29, 46, 123, 185, 223, 137, 52, 52, 107 ];
        energyBill.RegionkWh = [100, 52, 30, 29, 46, 123, 185, 223, 137, 52, 52, 107];



        //Make it under energyBill if required by any Controller/User to change it
        var solarRadiationFactor = [0.586626139817629, 0.729483282674772, 0.966565349544072,
                                                            1.142857142857140, 1.294832826747720, 1.316109422492400,
                                                            1.370820668693000, 1.264437689969600, 1.136778115501520,
                                                            0.954407294832826, 0.674772036474164, 0.556231003039513
                                                            ];

        for (var i = 0; i < months.length; i++) {
            energyBill.Month[i] = {};
            energyBill.Month[i].dollars = 0;
            energyBill.Month[i].kWh = 0;

        }

        energyBill.percentChange = 7.0;
        energyBill.yearChange = 25;
        energyBill.cumulative30YearsExpenseDisplay = 1;
        energyBill.dollar = true;
        energyBill.convert = true;
        //The kWhRates used to show in when drawing lineCharts
        energyBill.kWhRates = [0.08, 0.07, 0.08, 0.08, 0.09, 0.09, 0.09, 0.1, 0.11, 0.12, 0.12, 0.12, 0.12,
                                                      0.13, 0.13, 0.13, 0.11, 0.11, 0.12, 0.19, 0.19, 0.21, 0.18, 0.20, 0.28, 0.27,
                                                      0.28, 0.30, 0.28, 0.27]; //, 0.26, 0.28, 0.29, 0.29];

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
        categories.push({
            region: 'p',
            perSummerDayLimit: 13.8,
            perWinterDay: 12.3
        });
        categories.push({
            region: 'q',
            perSummerDayLimit: 7.0,
            perWinterDay: 12.3
        });
        categories.push({
            region: 'r',
            perSummerDayLimit: 15.6,
            perWinterDay: 11.0
        });
        categories.push({
            region: 's',
            perSummerDayLimit: 13.8,
            perWinterDay: 11.2
        });
        categories.push({
            region: 't',
            perSummerDayLimit: 7.0,
            perWinterDay: 8.5
        });
        categories.push({
            region: 'v',
            perSummerDayLimit: 8.7,
            perWinterDay: 10.6
        });
        categories.push({
            region: 'w',
            perSummerDayLimit: 16.8,
            perWinterDay: 10.1
        });
        categories.push({
            region: 'x',
            perSummerDayLimit: 10.1,
            perWinterDay: 10.9
        });
        categories.push({
            region: 'y',
            perSummerDayLimit: 10.6,
            perWinterDay: 12.6
        });
        categories.push({
            region: 'z',
            perSummerDayLimit: 6.2,
            perWinterDay: 9.0
        });



        for (var i = 0; i < categories.length; i++) {
            var tmp = categories[i];
            var cat = tmp.region;
            var summerTiers = [0.17411, 0.20461, 0.40364, 0.42364];
            var winterTiers = [0.17411, 0.20461, 0.36839, 0.38839];
            var multipliers = [1, 1.3, 2, 3, 100];

            energyBill.region[cat] = new Object();
            energyBill.region[cat].slabs = {};
            energyBill.region[cat].slabs.summer = []; //May-Oct index 4-9
            energyBill.region[cat].slabs.winter = [];
            for (var j = 0; j < summerTiers.length; j++) {
                energyBill.region[cat].slabs.summer.push({
                    ratePerkWh: summerTiers[j],
                    perDay: tmp.perSummerDayLimit * multipliers[j]
                });
                energyBill.region[cat].slabs.winter.push({
                    ratePerkWh: winterTiers[j],
                    perDay: tmp.perWinterDay * multipliers[j]
                });


            }

        }

        //Default values of energyBill.Monthly Bill

        energyBill.convertToComma = function (yourNumber) {
            var components = yourNumber.toString().split(".");
            //Comma-fies the first part
            components[0] = components[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            //Combines the two sections
            return components.join(".");

        };
        isSummer = function (month) {
            if (month > 3 && month < 10)
                return true;
            else
                return false;

        };

        energyBill.propagateEnergyBillFromDollar = function (i) {

            //Start validation
            var input = energyBill.Month[i].dollars;

            isSummer = function (month) {
                if (month > 3 && month < 10)
                    return true;
                return false;
            };

            findkWhFromDollars = function (dollar, k) {
                var totalKwh = 0;
                var slabs = [];
                var zip = parseInt(energyBill.zipcode);
                var category = energyBill.category[zip];
                var numDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

                if (isSummer(k))
                    slabs = energyBill.region[category].slabs.summer;
                else
                    slabs = energyBill.region[category].slabs.winter;

                for (var i = 0; i < slabs.length && (dollar > 0); i++) {

                    if (dollar > slabs[i].ratePerkWh * numDays[k] * slabs[i].perDay) {
                        totalKwh += slabs[i].perDay * numDays[k];
                        dollar -= slabs[i].ratePerkWh * numDays[k] * slabs[i].perDay;

                    } else {
                        totalKwh += dollar / slabs[i].ratePerkWh;
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
                var zip = parseInt(energyBill.zipcode);
                var category = energyBill.category[zip];

                if (isSummer(k))
                    slabs = energyBill.region[category].slabs.summer;
                else
                    slabs = energyBill.region[category].slabs.winter;


                for (var i = 0; i < slabs.length; i++) {

                    if (kWhUsed > numDays[k] * slabs[i].perDay) {
                        totalDollar += numDays[k] * slabs[i].perDay * slabs[i].ratePerkWh;
                        kWhUsed -= numDays[k] * slabs[i].perDay;

                    } else {
                        totalDollar += kWhUsed * slabs[i].ratePerkWh;
                        break;
                    }

                }
                return totalDollar;

            };

            energyBill.Month[i].dollars = Math.ceil(findDollarFromkWh(input, i));


        };
        //Calculate total annual cost and return fills the array with monthly expenditure
        energyBill.calculateTotalDollars = function () {
            var dataMonths = [];
            energyBill.annualCost = 0;

            //Use slab logic here ToDo
            for (var i = 0; i < energyBill.Month.length; i++) {
                var tmp = energyBill.Month[i];

                var num = tmp.dollars;
                dataMonths.push(num);
                energyBill.annualCost += num;
            }
            energyBill.annualCostDisplay = energyBill.convertToComma("" + Math.ceil(energyBill.annualCost));
            energyBill.avgMonthlyBill = Math.ceil(energyBill.annualCost / 12);

            return dataMonths;

        };
        //Calculate total annual Usage and return fills the array with monthly data Usage
        energyBill.calculateTotalkWh = function () {
            var dataMonths = [];
            energyBill.annualUsage = 0;
            for (var i = 0; i < energyBill.Month.length; i++) {
                var tmp = energyBill.Month[i];

                var num = tmp.kWh;


                dataMonths.push(num);
                energyBill.annualUsage += num;
            }
            energyBill.annualUsageDisplay = energyBill.convertToComma("" + Math.ceil(energyBill.annualUsage));
            return dataMonths;

        };
        energyBill.noInputGiven = function () {
            for (var i = 0; i < energyBill.Month.length; i++) {
                var tmp = energyBill.Month[i];
                if (tmp.dollars != 0)
                    return false;
            }
            return true;


        };
        energyBill.setDefault = function () {
            energyBill.Month[0].dollars = 117;
            energyBill.Month[1].dollars = 103;
            energyBill.Month[2].dollars = 90;
            energyBill.Month[3].dollars = 92;
            energyBill.Month[4].dollars = 100;
            energyBill.Month[5].dollars = 132;
            energyBill.Month[6].dollars = 158;
            energyBill.Month[7].dollars = 176;
            energyBill.Month[8].dollars = 138;
            energyBill.Month[9].dollars = 102;
            energyBill.Month[10].dollars = 100;
            energyBill.Month[11].dollars = 120;

            energyBill.Month[0].kWh = 595;
            energyBill.Month[1].kWh = 528;
            energyBill.Month[2].kWh = 498;
            energyBill.Month[3].kWh = 497;
            energyBill.Month[4].kWh = 520;
            energyBill.Month[5].kWh = 627;
            energyBill.Month[6].kWh = 713;
            energyBill.Month[7].kWh = 766;
            energyBill.Month[8].kWh = 646;
            energyBill.Month[9].kWh = 528;
            energyBill.Month[10].kWh = 528;
            energyBill.Month[11].kWh = 605;

        };
        energyBill.anyInputMissed = function () {
            var i = 0,
                num = 0;
            for (i = 0; i < energyBill.Month.length; i++) {
                var tmp = energyBill.Month[i];
                if (tmp.dollars != 0)
                    num++;
            }
            if (num == 0)
                return true; //Should not come here as noInputGiven must have been used once
            else if (num < energyBill.Month.length - 1)
                return true; //Atleast one input has not been given
            else
                return false; //All inputs provided


        };
        energyBill.firstFilledMonth = function () {

            for (i = 0; i < energyBill.Month.length; i++) {
                var tmp = energyBill.Month[i];
                if (tmp.dollars != 0)
                    return i;
            }
            return -1; //No such month exists

        };
        energyBill.ratio = [];
        energyBill.ratio[0] = [1, 0.86, 0.74, 0.75, 0.83, 1.14, 1.37, 1.55, 1.19, 0.85, 0.83, 1.03];
        energyBill.ratio[1] = [1.14, 1, 0.87, 0.88, 0.97, 1.28, 1.54, 1.72, 1.34, 0.99, 0.97, 1.16];
        energyBill.ratio[2] = [1.27, 1.13, 1, 1.01, 1.1, 1.44, 1.70, 1.88, 1.5, 1.12, 1.1, 1.3];
        energyBill.ratio[3] = [1.26, 1.12, 0.99, 1, 1.08, 1.42, 1.68, 1.86, 1.49, 1.11, 1.09, 1.28];
        energyBill.ratio[4] = [1.17, 1.03, 0.91, 0.92, 1, 1.32, 1.58, 1.76, 1.39, 1.02, 1, 1.2];
        energyBill.ratio[5] = [0.86, 0.73, 0.64, 0.64, 0.69, 1, 1.22, 1.39, 1.05, 0.71, 0.70, 0.89];
        energyBill.ratio[6] = [0.67, 0.56, 0.50, 0.50, 0.54, 0.78, 1, 1.15, 0.83, 0.55, 0.55, 0.69];
        energyBill.ratio[7] = [0.58, 0.46, 0.41, 0.41, 0.45, 0.64, 0.86, 1, 0.68, 0.46, 0.46, 0.59];
        energyBill.ratio[8] = [0.81, 0.67, 0.61, 0.61, 0.66, 0.95, 1.17, 1.32, 1, 0.67, 0.67, 0.84];
        energyBill.ratio[9] = [1.15, 1.01, 0.88, 0.90, 0.98, 1.30, 1.56, 1.74, 1.36, 1, 0.98, 1.18];
        energyBill.ratio[10] = [1.17, 1.03, 0.90, 0.92, 1, 1.32, 1.58, 1.76, 1.38, 1.02, 1, 1.2];
        energyBill.ratio[11] = [0.97, 0.83, 0.72, 0.72, 0.80, 1.11, 1.34, 1.52, 1.16, 0.82, 0.80, 1];
        energyBill.setEstimatedValues = function () {
            var zip = energyBill.zipcode;
            //   zip = 94591;//hardcoded value do away with it once updated from user
            //    var estimateSampleUsage = energyBill.RegionkWh[zip];
            var ratioMonth = [];

            var estimateSampleUsage = energyBill.RegionkWh;
            var sampleMonthIndex = energyBill.firstFilledMonth(); //Month Index starts with zero as Jan
            ratioMonth = energyBill.ratio[sampleMonthIndex];
            for (i = 0; i < energyBill.Month.length; i++) {
                if (i == sampleMonthIndex)
                    continue;
                if (energyBill.Month[i].dollars == 0 || energyBill.Month[i].kWh == 0) {
                    energyBill.Month[i].dollars = energyBill.Month[sampleMonthIndex].dollars * ratioMonth[i];
                    //Propagate the dollar for kWh estimated
                    energyBill.propagateEnergyBillFromDollar(i);
                }
            }

        };

        energyBill.setEstimatedSolarProduction = function () {

            var estimates = []; //[356, 428, 666, 780, 906, 894, 878, 857, 736, 557, 405, 300];
            var numDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            var energyMultiplier;
            energyBill.solarEstimatedProduction = 0;
            var type = 280;
            var energyProduction = 0;
            var miscCost = 0;
            var variation = [2.77, 3.13, 3.78, 4.21, 4.48, 4.61, 4.14, 4.12, 3.75, 2.94, 2.85, 2.39];
            for (var i = 0; i < energyBill.Month.length; i++) {
                /* Assuming 3.79 hours of sun everyday should multiply by 3600 but values are too big ~50000 kWh
                 *Primarily to match values
                 * Small issue: systemSize is representing number of panels
                 * ToDo: panel type to be fixed when the type is clicked while creating scenario
                 */
                if (energyBill.solarSystem.length == 0) {
                    energyBill.solarSystem.push({});
                    energyBill.solarSystem[0].systemSize = "20";
                }

                energyMultiplier = variation[i] * 1 * numDays[i] * solarRadiationFactor[i] / 1000;
                for (var j = 0; j < energyBill.solarSystem.length; j++) {
                    if (energyBill.solarSystem[j].type260 == 1) {
                        if (energyBill.solarSystem[j].convEfficiency != undefined) {
                            energyProduction += 260 * energyMultiplier *
                                parseInt(energyBill.solarSystem[j].systemSize) *
                                parseInt(energyBill.solarSystem[j].convEfficiency) / 100;
                            console.log(energyBill.solarSystem[j].convEfficiency);
                        } else {
                            energyProduction += 260 * energyMultiplier *
                                parseInt(energyBill.solarSystem[j].systemSize);
                        }

                    } else {
                        if (energyBill.solarSystem[j].convEfficiency != undefined) {
                            energyProduction += 280 * energyMultiplier *
                                parseInt(energyBill.solarSystem[j].systemSize) *
                                parseInt(energyBill.solarSystem[j].convEfficiency) / 100;
                            console.log(energyBill.solarSystem[j].convEfficiency);
                        } else {
                            energyProduction += 280 * energyMultiplier *
                                parseInt(energyBill.solarSystem[j].systemSize);
                        }

                    }
                }
                energyBill.numPanels = 0;
                for (var j = 0; j < energyBill.solarSystem.length; j++) {
                    if (energyBill.solarSystem[j].type260 == 1) {

                        energyBill.numPanels += parseInt(energyBill.solarSystem[j].systemSize);
                        energyBill.panelType = 260;

                    } else {
                        energyBill.numPanels += parseInt(energyBill.solarSystem[j].systemSize);
                        energyBill.panelType = 280;
                    }
                }
                estimates.push(Math.ceil(energyProduction));
                energyBill.solarEstimatedProduction += energyProduction;

                energyProduction = 0;

            }
            energyBill.advancedOptions = [];
            energyBill.solarCost = 0;
            for (var j = 0; j < energyBill.solarSystem.length; j++) {
                if (energyBill.solarSystem[j].type260 == 1) {
                    energyBill.solarCost += 1000 * parseInt(energyBill.solarSystem[j].systemSize);
                }
                else {
                    energyBill.solarCost += 1200 * parseInt(energyBill.solarSystem[j].systemSize);
                }
                
                
                if (energyBill.solarSystem[j].AMPService != undefined) {
                        energyBill.solarCost += 2250;
                        energyBill.advancedOptions.push("New 125-200 AMP Service");
                } 
                    
                if (energyBill.solarSystem[j].subPanel != undefined) {
                        energyBill.solarCost += 600;
                        energyBill.advancedOptions.push("Sub Panel");

                } 
                if (energyBill.solarSystem[j].AMPDMUpgrade != undefined) {
                        energyBill.solarCost += 4500;
                        energyBill.advancedOptions.push("New 400 AMP Double Meter Upgrade");
                } 
                if (energyBill.solarSystem[j].meterRelocation != undefined) {
                        energyBill.solarCost += 950;
                        energyBill.advancedOptions.push("Meter Relocation up to 6 ft.");
                } 
                if (energyBill.solarSystem[j].meterRelocGt != undefined) {
                        energyBill.solarCost += 1950;
                        energyBill.advancedOptions.push("Meter Relocation Greater than 6 ft.");
                } 
                if (energyBill.solarSystem[j].stringInv != undefined) {
                        energyBill.solarCost += 1600;
                        energyBill.advancedOptions.push("String Inverter Upgrades (reloads)");
                } 
                if (energyBill.solarSystem[j].trenchWire != undefined) {
                        energyBill.solarCost += 30;
                        energyBill.advancedOptions.push("Trenching for 'Below Ground' wire");
                } 
                if (energyBill.solarSystem[j].cuttingTrench != undefined) {
                        energyBill.solarCost += 60;
                        energyBill.advancedOptions.push("Concrete Cutting for Trench ");
                } 

                if (energyBill.solarSystem[j].steepRoof != undefined) {

                        energyBill.solarCost += 50*energyBill.numPanels;
                        energyBill.advancedOptions.push("Steep Roof Pitch 30 degrees or greater ");                    
                } 

                if (energyBill.solarSystem[j].grndMount != undefined) {
                        energyBill.solarCost += 120*energyBill.numPanels;
                        energyBill.advancedOptions.push("Ground Mount Installs");                    
                } 
                if (energyBill.solarSystem[j].panelRemove != undefined) {
                        energyBill.solarCost += 250*energyBill.numPanels;
                        energyBill.advancedOptions.push("Panel Removal/Reinstallation for roof repair");                    
                } 

                if (energyBill.solarSystem[j].Other != undefined) {
                        energyBill.solarCost += 4500;
                        energyBill.advancedOptions.push("Other");                                        

                } 
                
                
            }

            energyBill.outOfPocket = 0.1 * energyBill.solarCost;
            if (energyBill.outOfPocket > 1000) {
                energyBill.outOfPocket = 1000;
            }
            energyBill.interest = 15.9 / (12 * 100);
            energyBill.cash = energyBill.solarCost - energyBill.outOfPocket;
            //E7*(E6/12)*((1+(E6/12))^E5)/((1+(E6/12))^E5-1) divyank
            var E7 = energyBill.cash;
            var E6 = 15.9 / 100; //Interest
            var E5 = 12 * 12;
            //var E5 = 6;
            energyBill.emi = E7 * (E6 / 12) * (Math.pow(1 + (E6 / 12), E5)) / (Math.pow((1 + (E6 / 12)), E5) - 1);
            energyBill.emi = Math.ceil(energyBill.emi);
            energyBill.emi = Math.ceil(energyBill.cash * 0.016);
            energyBill.OptionBemi = Math.ceil(energyBill.cash * 0.0105);
            /*
            energyBill.emi = energyBill.cash*(energyBill.interest)*( Math.pow(1 +                                                                               energyBill.interest,energyBill.yearChange)) /
                                     (Math.pow(1+energyBill.interest,energyBill.yearChange)-1);
                                     */

            console.log(energyBill.emi);
            console.log(energyBill.OptionBemi);

            energyBill.solarCostDisplay = energyBill.convertToComma("" + energyBill.solarCost);
            energyBill.cashDisplay = energyBill.convertToComma("" + energyBill.cash);
            energyBill.ezPayDisplay = energyBill.convertToComma("" + energyBill.ezPay);


            energyBill.solarEstimatedProductionDisplay = energyBill.convertToComma("" +
                Math.ceil(energyBill.solarEstimatedProduction));

            energyBill.solarEstimated30YearProduction = energyBill.solarEstimatedProduction;
            energyProd = energyBill.solarEstimatedProduction;
            for (var i = 0; i < energyBill.yearChange; i++) {
                energyProd = energyProd * (1 - energyBill.solarDepreciation);

            }



            energyBill.solarEstimated30YearProductionDisplay = energyBill.convertToComma("" +
                Math.ceil(energyBill.solarEstimatedProduction * energyBill.yearChange));
            energyBill.solarProduction = Math.ceil(energyBill.solarEstimatedProduction);
            energyBill.solarSystemOffset = energyBill.annualCost *
                energyBill.solarEstimatedProduction / energyBill.annualUsage;
            energyBill.solarSystemOffset += miscCost;
            energyBill.solarSystemOffsetDisplay = energyBill.convertToComma("" +
                Math.ceil(energyBill.solarSystemOffset));
            if ((energyBill.annualCost - energyBill.solarSystemOffset) > 0) {

                energyBill.annualTrueUpDisplay = energyBill.convertToComma("" + Math.ceil(
                    energyBill.annualCost - energyBill.solarSystemOffset));
                energyBill.annualTrueUpDisplay = "$" + energyBill.annualTrueUpDisplay;
            } else {

                energyBill.annualTrueUpDisplay = "-$" + energyBill.convertToComma("" + Math.ceil(
                    (energyBill.solarSystemOffset - energyBill.annualCost)));
            }
            return estimates;

        };

        energyBill.menuPageArrayeu = [{
                'title': 'Review Your Energy Costs',
                'visited': false,
                'url': '#/startProposal/id1'
                                           },
            {
                'title': 'Your Billing History',
                'visited': false,
                'url': '#/review/id1'
                                           },
            {
                'title': 'Your Current Electric Bills',
                'visited': false,
                'url': '#/multipleBillBarGraph/id1'
                                           },
            {
                'title': 'Electric Price History',
                'visited': false,
                'url': '#/lineGraph/id1'
                                           },
            {
                'title': 'Electric Price Changs',
                'visited': false,
                'url': '#/percentageChange/id1'
                                           },
            {
                'title': 'Your Future Electric Costs',
                'visited': false,
                'url': '#/futureElectricCost/id1'
                                           }];

        energyBill.menuPageArrayup = [{
                'title': 'What Your Options',
                'visited': false,
                'url': '#/yourOptions/id1'
                                           },
            {
                'title': 'How Solar Work',
                'visited': false,
                'url': '#/solarSystemWork/id1'
                                           },
            {
                'title': 'Bild Your Solar System',
                'visited': false,
                'url': '#/buildSolarSystem/id1'
                                           },
            {
                'title': 'Your Solar Production',
                'visited': false,
                'url': '#/estimatedSolarSystemProduction/id1'
                                           },
            {
                'title': 'Solar System Sumary',
                'visited': false,
                'url': '#/solarSystemSummary/id1'
                                           }];

        energyBill.menuPageArraypay = [{
                'title': 'Payments options',
                'visited': false,
                'url': '#/paymentOptions/id1'
                                           },
            {
                'title': 'Explore Payments',
                'visited': false,
                'url': '#/summary/id1'
                                           },
            {
                'title': 'HERO Summary',
                'visited': false,
                'url': '#/heroSummary/id1'
                                           },
            {
                'title': 'Whats Next?',
                'visited': false,
                'url': '#/finishApplication/id1'
                                           }];

        this.dataObj = energyBill;
    });


proposalControllers.controller("proposalTool", ['$scope', 'dataService', function ($scope, dataService) {
    $scope.energyBill = dataService.dataObj;
    $scope.address1 = "115 Cordova St";
    $scope.address2 = "Vallejo, 94591";
    $scope.showElec = false;


    $scope.nextPageValidation = function () {
        var fname = $('#firstName').val();
        var lname = $('#lastName').val();
        var email = $('#email').val();
        var phoneNo = $('#phoneNo').val();
        var address = $('#address').val();
        var city = $('#city').val();
        var state = $('#state').val();
        var zipcode = $('#zipcode').val();

        var names = ["#firstName", "#lastName", "#email", "#phoneNo", "#address", "#city", "#state", "#zipcode"];
        var doms = [];
        var i = 0;
        //Initializing doms
        for (i = 0; i < names.length; i++) {
            var tmp = {};
            tmp.name = names[i];
            tmp.valid = false;

            doms.push(tmp);

        }
        //After doms must contain 8 names and 8 false



        //Validation
        for (i = 0; i < names.length; i++) {
            //Get this dom object
            var tmp = doms[i];

            var ele = $(tmp.name).val();


            if (tmp.name == "#firstName" || tmp.name == "#lastName" || tmp.name == "#city" || tmp.name == "#state") {
                var re = new RegExp("[a-zA-Z][a-zA-Z ]+");
                if (re.test(ele)) {
                    tmp.valid = true;
                } else {
                    tmp.valid = false;
                }
            }
            if (tmp.name == "#email") {
                var re = new RegExp("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$");
                if (re.test(ele)) {
                    tmp.valid = true;
                } else {
                    tmp.valid = false;
                }

            }
            if (tmp.name == "#phoneNo") {

                var re = new RegExp('\([0-9]\){3}');

                if (re.test(ele)) {
                    tmp.valid = true;
                } else {
                    tmp.valid = false;
                    //tmp.valid = true;

                }
            }
            if (tmp.name == "#address") {
                var re = new RegExp("[A-Za-z0-9'\.\-\s\,]");
                if (re.test(ele)) {
                    tmp.valid = true;
                } else {
                    tmp.valid = false;
                }
            }
            if (tmp.name == "#zipcode") {
                tmp.valid = true;
            }
        }


        //Verification
        for (i = 0; i < names.length; i++) {
            var tmp = doms[i];

            if (tmp.valid == false) {
                break;
            }
        }
        if (i < names.length) {
            var tmp = doms[i];
            //do red
            console.log(tmp);
            $(tmp.name).css('border', '');
            $(tmp.name).css('border', '1px solid red');
            $(tmp.name).click(function () {
                $(tmp.name).css('border', '');
            });

        } else {
            var href = $("#nextPageId").attr("href")

            $("#nextPageId").attr("href", "#/startProposal/id1");
        }

    };


    $scope.toggleElect = function () {
        if ($scope.showElec)
            $scope.showElec = false;
        else
            $scope.showElec = false;

    }
    $scope.toggle = function () {

    };


    $scope.submitCall = function () {

    }
}]).directive('zipValidator', function (dataService) {
    return {
        require: 'ngModel',

        link: function (scope, element, attrs, ctrl) {

            ctrl.$parsers.unshift(function (value) {
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
            ctrl.$formatters.unshift(function (value) {
                // validate.
                ctrl.$setValidity('regexValidate', $.isNumeric(value));

                // return the value or nothing will be written to the DOM.
                return value;
            });

        }
    };
}).directive('phFormatter', function (dataService) {
    return {
        require: 'ngModel',

        link: function (scope, element, attrs, ctrl) {

            ctrl.$formatters.unshift(function (value) {
                // test and set the validity after update.
                // if it's valid, return the value to the model,
                // otherwise return undefined.
                return value;
            });

            // add a formatter that will process each time the value
            // is updated on the DOM element.
            ctrl.$parsers.unshift(function (value) {
                var inputVal = element.val();
                // validate.

                var strPhone;
                var country, city, number;

                inputVal = inputVal.replace(/\D+/g, '');
                switch (inputVal.length) {
                case 10: // +1PPP####### -> C (PPP) ###-####
                    country = 1;
                    city = inputVal.slice(0, 3);
                    number = inputVal.slice(3);
                    break;

                case 11: // +CPPP####### -> CCC (PP) ###-####
                    country = inputVal[0];
                    city = inputVal.slice(1, 4);
                    number = inputVal.slice(4);
                    break;

                case 12: // +CCCPP####### -> CCC (PP) ###-####
                    country = inputVal.slice(0, 3);
                    city = inputVal.slice(3, 5);
                    number = inputVal.slice(5);
                    break;

                default:
                    ctrl.$setValidity('regexValidate', false);
                    ctrl.$setViewValue(inputVal);
                    ctrl.$render();

                    return inputVal;
                }

                number = '(' + city + ')' + number.slice(0, 3) + '-' + number.slice(3);

                ctrl.$setViewValue(number);
                ctrl.$render();
                ctrl.$setValidity('regexValidate', true);

                // return the value or nothing will be written to the DOM.
                return value;
            });

        }
    };
});

proposalControllers.controller('startProposalController', ['$scope', 'dataService', function ($scope, dataService) {
    $scope.energyBill = dataService.dataObj;


    $scope.navMenuPageArrayEnerUses = $scope.energyBill.menuPageArrayeu;
    $scope.navMenuPageArrayUpgrad = $scope.energyBill.menuPageArrayup;
    $scope.navMenuPageArrayPayment = $scope.energyBill.menuPageArraypay;

    for (var i = 0; i < $scope.energyBill.menuPageArrayeu.length; i++) {
        var tmp = $scope.energyBill.menuPageArrayeu[i];
        if (tmp.url == '#/startProposal/id1')
            tmp.visited = true;
    }
    $scope.EnergyUsesMenu = function (i) {
        return $scope.energyBill.menuPageArrayeu[i].visited == true;
    };

}]);
proposalControllers.controller('reviewController', ['$scope', 'dataService', function ($scope, dataService) {
    $scope.energyBill = dataService.dataObj;
    $scope.navMenuPageArrayEnerUses = $scope.energyBill.menuPageArrayeu;
    $scope.navMenuPageArrayUpgrad = $scope.energyBill.menuPageArrayup;
    $scope.navMenuPageArrayPayment = $scope.energyBill.menuPageArraypay;

}]);


proposalControllers.controller('justOneBillController', ['$scope', 'dataService', function ($scope, dataService) {
    $scope.custom = true;
    $scope.model = {
        id: 0
    };
    $scope.energyBill = dataService.dataObj;
    $scope.navMenuPageArrayEnerUses = $scope.energyBill.menuPageArrayeu;
    $scope.navMenuPageArrayUpgrad = $scope.energyBill.menuPageArrayup;
    $scope.navMenuPageArrayPayment = $scope.energyBill.menuPageArraypay;
    $scope.toggleCustom = function () {

        $scope.energyBill.dollar = $scope.energyBill.dollar === false ? true : false;
    };


    }]).directive('convertToNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (val) {

                return parseInt(val, 10);
            });
            ngModel.$formatters.push(function (val) {


                return '' + val;
            });
        }
    };
});

proposalControllers.controller('multipleBillController', ['$scope', 'dataService', function ($scope, dataService) {

    $scope.energyBill = dataService.dataObj;
    $scope.navMenuPageArrayEnerUses = $scope.energyBill.menuPageArrayeu;
    $scope.navMenuPageArrayUpgrad = $scope.energyBill.menuPageArrayup;
    $scope.navMenuPageArrayPayment = $scope.energyBill.menuPageArraypay;

    /*
     * Create watch on the values work on conversions in realtime
     * when this is done responsibility of toggle would just be to show the value/alter mode
     * Ideally these must be exported via service calls.
     */

    $scope.toggleCustom = function () {

        $scope.energyBill.dollar = $scope.energyBill.dollar === false ? true : false;
        $scope.energyBill.annualUsage = Math.ceil($scope.energyBill.annualUsage);
    };

}]).directive('currencyInput', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {


            ctrl.$parsers.push(function (inputValue) {
                var inputVal = element.val();

                //clearing left side zeros
                while (inputVal.charAt(1) == '0') {
                    inputVal = inputVal.substr(2);
                }
                var res;
                var value;

                res = inputVal.replace(/[^0-9]/g, '');
                value = parseInt(res);

                if (!isNaN(value)) {
                    ctrl.$setViewValue('$' + res);

                    ctrl.$render();
                    return value;
                } else {

                    ctrl.$setViewValue("$" + 0);

                    ctrl.$render();
                    return 0;

                }


            });

            ctrl.$formatters.push(function (value) {
                return "$" + value;
            });


            return;

        }
    };
}).directive('kwhInput', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {

            ctrl.$parsers.push(function (inputValue) {
                var inputVal = element.val();

                //clearing left side zeros
                while (inputVal.charAt(0) == '0') {
                    inputVal = inputVal.substr(1);
                }
                var res;
                var value;

                res = inputVal.replace(/[^0-9]/g, '');
                value = parseInt(res);


                if (!isNaN(value)) {
                    // ctrl.$setViewValue(res + ' kWh');

                    ctrl.$render();
                    return value;
                } else {
                    //  ctrl.$setViewValue("kWh");

                    ctrl.$render();
                    return 0;

                }

            });

            ctrl.$formatters.push(function (value) {
                return value + ' kWh';
            });
            element.bind('blur', function () {
                if (!ctrl.$valid) {
                    return;
                }
                var viewValue = ctrl.$modelValue;
                var formatters = ctrl.$formatters;
                for (var i = formatters.length - 1; i >= 0; --i) {
                    viewValue = formatters[i](viewValue);
                }
                viewValue = viewValue.replace(/[^0-9]/g, '');
                ctrl.$viewValue = viewValue + " kWh";
                ctrl.$render();
            });

            return;
        }
    };
    }]);

proposalControllers.controller('heroSummaryController', ['$scope', 'dataService', function ($scope, dataService) {
    $scope.energyBill = dataService.dataObj;

    $scope.navMenuPageArrayEnerUses = $scope.energyBill.menuPageArrayeu;
    $scope.navMenuPageArrayUpgrad = $scope.energyBill.menuPageArrayup;
    $scope.navMenuPageArrayPayment = $scope.energyBill.menuPageArraypay;
    $scope.showHide = true;
    $scope.showHideDetail = function () {
        $scope.showHide = $scope.showHide === false ? true : false;
    };

}]);
proposalControllers.controller('optionController', ['$scope', 'dataService', function ($scope, dataService) {
    $scope.energyBill = dataService.dataObj;
    $scope.showOptionA = false;
    $scope.showOptionB = false;
    $scope.showOptionC = false;
    $scope.OptionB = false;

    $scope.OptionC = false;
    $scope.visitDiscount = false;

    $scope.showNextOptionA = function () {
        $scope.showOptionA = true;
        $scope.OptionB = true;

    };
    $scope.showNextOptionB = function () {

        $scope.showOptionB = true;
        $scope.OptionC = true;
        $scope.OptionB = false;
    };
    $scope.showNextOptionC = function () {
        $scope.showOptionC = true;
        $scope.OptionC = false;
    };
    $scope.ShowVisitDiscount = function () {
        $scope.visitDiscount = true;
    };

}]);
proposalControllers.controller('paymentOptionsController', ['$scope', 'dataService', function ($scope, dataService) {
    $scope.energyBill = dataService.dataObj;
    $scope.navMenuPageArrayEnerUses = $scope.energyBill.menuPageArrayeu;
    $scope.navMenuPageArrayUpgrad = $scope.energyBill.menuPageArrayup;
    $scope.navMenuPageArrayPayment = $scope.energyBill.menuPageArraypay;


    $scope.showHide = true;
    $scope.showHideDetail = function () {
        $scope.showHide = $scope.showHide === false ? true : false;
    };
    $(document).ready(function () {
        $("#thirdPage").hide();
        $("#secondPage").hide();
        $("#nextA").hide();
        $("#nextB").hide();
        $("#nextC").hide();
        $("#nextD").hide();
        $("#nextE").hide();
        $("#nextF").hide();
        $("#nextG").hide();
        $("#link").hide();
        $("#secondPageInitialA").hide();
        $("#secondPageInitialB").hide();
        $("#secondPageInitialC").hide();
        $("#secondPageOptionAB").hide();
        $("#secondPageOptionContentA").hide();
        $("#secondPageOptionContentB").hide();
        $("#secondPageOptionContentC").hide();

        $("#next").click(function () {
            $("#firstPage").hide();
            $("#secondPage").show();
            $("#secondPageInitialA").show();
            $("#next").hide();
            $("#nextA").show();
        });
        $("#nextA").click(function () {
            $("#firstPage").hide();
            $("#secondPageInitialB").show();
            $("#nextA").hide();
            $("#nextB").show();
        });
        $("#nextB").click(function () {
            $("#secondPageInitialC").show();            
            $("#nextB").hide();
            $("#nextC").show();
        });
        $("#nextC").click(function () {
            $("#secondPageOptionAB").show();          
            $("#nextC").hide();
            $("#nextD").show();
        });
        $("#nextD").click(function () {
            $("#secondPageOptionContentA").show();          
            $("#nextD").hide();
            $("#nextE").show();
        });
        $("#nextE").click(function () {
            $("#secondPageOptionContentB").show();          
            $("#nextE").hide();
            $("#nextF").show();
        });
        $("#nextF").click(function () {
            $("#secondPageOptionContentC").show();          
            $("#nextF").hide();
            $("#nextG").show();
        });
        $("#nextG").click(function () {
             $("#secondPage").hide();          
             $("#thirdPage").show();
             $("#nextG").hide();
             $("#link").show();
        });
    });


}]);
proposalControllers.controller('buildSolarSystemController', ['$scope', 'dataService', function ($scope, dataService) {
    $scope.energyBill = dataService.dataObj;
    $scope.navMenuPageArrayEnerUses = $scope.energyBill.menuPageArrayeu;
    $scope.navMenuPageArrayUpgrad = $scope.energyBill.menuPageArrayup;
    $scope.navMenuPageArrayPayment = $scope.energyBill.menuPageArraypay;
    $scope.numArray = $scope.energyBill.numArray;
    $scope.dropDownValue = [];

    for (var i = 8; i <= 60; i = i + 2) {

        $scope.dropDownValue.push(i);

    }

    $scope.mounting = function (index, type) {
        $scope.energyBill.solarSystem[index].type260 = type;
    }

    $scope.anotherArray = function () {
        var i = $scope.numArray.length;
        i++;
        $scope.numArray.push(i);
    };
    $scope.showme = false;
    $scope.removeArray = function (obj) {

        var index = obj.$parent.item;
        var i = $scope.numArray.indexOf(index);
        if (i > -1) {
            $scope.numArray.splice(i, 1);
        }
       // console.log($scope.numArray);
    }


}]);
proposalControllers.controller('percentageChangeController', ['$scope', 'dataService', function ($scope, dataService) {
    $scope.energyBill = dataService.dataObj;
    $scope.navMenuPageArrayEnerUses = $scope.energyBill.menuPageArrayeu;
    $scope.navMenuPageArrayUpgrad = $scope.energyBill.menuPageArrayup;
    $scope.navMenuPageArrayPayment = $scope.energyBill.menuPageArraypay;





}]).directive('percModelFormatter', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, controller) {
            controller.$formatters.push(function (value) {
                return value + " %";
            });
        }
    }
}).directive('yrsModelFormatter', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, controller) {
            controller.$formatters.push(function (value) {
                return value + " yrs";
            });
        }
    }
});;


proposalControllers.controller('yourOptionsController', ['$scope', 'dataService', function ($scope, dataService) {
    $scope.energyBill = dataService.dataObj;
    $scope.navMenuPageArrayEnerUses = $scope.energyBill.menuPageArrayeu;
    $scope.navMenuPageArrayUpgrad = $scope.energyBill.menuPageArrayup;
    $scope.navMenuPageArrayPayment = $scope.energyBill.menuPageArraypay;


}]);


proposalControllers.controller('multipleBillBarGraphController', ['$scope', 'dataService', function ($scope, dataService) {

    $scope.energyBill = dataService.dataObj;
    $scope.navMenuPageArrayEnerUses = $scope.energyBill.menuPageArrayeu;
    $scope.navMenuPageArrayUpgrad = $scope.energyBill.menuPageArrayup;
    $scope.navMenuPageArrayPayment = $scope.energyBill.menuPageArraypay;
    $scope.showHide = $scope.energyBill.showHide;
    $scope.dataMonths = [];


    if ($scope.energyBill.noInputGiven()) {
        $scope.energyBill.setDefault();
    }

    if ($scope.energyBill.anyInputMissed()) {
        $scope.energyBill.setEstimatedValues();

    }


    $scope.ShowGraph = function () {
        $scope.showHide = $scope.showHide === false ? true : false;
        $scope.energyBill.showHide = false;
    };

    $scope.energyBill.calculateTotalDollars();
    $scope.energyBill.calculateTotalkWh();

    $scope.toggleCustomBar = function () {
        var barChart = $('#bars').highcharts();
        $scope.energyBill.dollar = $scope.energyBill.dollar === true ? false : true;

        if ($scope.energyBill.dollar === true) {

            var dataMonths = $scope.energyBill.calculateTotalDollars();
            barChart.series[0].setData(dataMonths);

        } else {
            var dataMonths = $scope.energyBill.calculateTotalkWh();
            barChart.series[0].setData(dataMonths);
        }
    }

    //The first time controller is invoked
    if ($scope.energyBill.dollar === true) {
        $scope.dataMonths = $scope.energyBill.calculateTotalDollars();
    } else {
        $scope.dataMonths = $scope.energyBill.calculateTotalkWh();
    }


    $('#bars').highcharts({
        credits: {
            enabled: false
        },
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
                    if ($scope.energyBill.dollar === true) {
                        if ($scope.dataMonths[index].y !== undefined)
                            return ' <a> <strong>' + this.value + ' </strong><br>' + '$' +
                                Math.ceil($scope.dataMonths[index].y) + '</a>';
                        else
                            return ' <a><strong>' + this.value + '</strong><br>' + '$' +
                                Math.ceil($scope.dataMonths[index]) + '</a>';
                    } else {
                        if ($scope.dataMonths[index].y !== undefined)
                            return ' <a><strong>' + this.value + '</strong><br>' +
                                Math.ceil($scope.dataMonths[index].y) + ' kWh' + '</a>';
                        else
                            return ' <a><strong>' + this.value + '</strong><br>' +
                                Math.ceil($scope.dataMonths[index]) + ' kWh' + '</a>';

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
                    if ($scope.energyBill.dollar === true)
                        return '$' + this.value;
                    else
                        return this.value + ' kWh';
                }
            },

            tickAmount: 7
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    verticalAlign: 'top',
                    y: 85,
                    useHTML: true,

                    formatter: function () {
                        return '<span class="glyphicon glyphicon-resize-vertical" style="position:absolute;font \
                                    -size:15px; color:white;right:-7px; top:5px;"> </span>';
                    }
                },
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
                            if ($scope.energyBill.dollar === true) {

                                $scope.energyBill.Month[this.x].dollars = Math.ceil(this.y);
                                $scope.energyBill.propagateEnergyBillFromDollar(this.x);
                                $scope.energyBill.calculateTotalDollars();
                                $scope.$apply();

                            } else {

                                $scope.energyBill.Month[this.x].kWh = Math.ceil(this.y);
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
        legend: {
            enabled: false
        },

        tooltip: {
            yDecimals: 2,
            formatter: function () {
                if ($scope.energyBill.dollar === true)
                    return '$' + Highcharts.numberFormat(this.y, 2);
                else
                    return Highcharts.numberFormat(this.y, 2) + ' kWh';
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

proposalControllers.controller('oneBillBarGraphController', ['$scope', 'dataService', function ($scope, dataService) {
    $scope.energyBill = dataService.dataObj;
    $scope.navMenuPageArrayEnerUses = $scope.energyBill.menuPageArrayeu;
    $scope.navMenuPageArrayUpgrad = $scope.energyBill.menuPageArrayup;
    $scope.navMenuPageArrayPayment = $scope.energyBill.menuPageArraypay;
    $scope.showHide = true;
    $scope.ShowGraph = function () {
        $scope.showHide = $scope.showHide === false ? true : false;
    };

    }]);

proposalControllers.controller('solarSystemWorkController', ['$scope', 'dataService', function ($scope, dataService) {
    $scope.energyBill = dataService.dataObj;
    $scope.navMenuPageArrayEnerUses = $scope.energyBill.menuPageArrayeu;
    $scope.navMenuPageArrayUpgrad = $scope.energyBill.menuPageArrayup;
    $scope.navMenuPageArrayPayment = $scope.energyBill.menuPageArraypay;

    }]);
proposalControllers.controller('solarSystemSummaryController', ['$scope', 'dataService', function ($scope, dataService) {
    $scope.energyBill = dataService.dataObj;
    $scope.navMenuPageArrayEnerUses = $scope.energyBill.menuPageArrayeu;
    $scope.navMenuPageArrayUpgrad = $scope.energyBill.menuPageArrayup;
    $scope.navMenuPageArrayPayment = $scope.energyBill.menuPageArraypay;

    $scope.exportAsPdf = function () {
        var doc = new jsPDF('landscape');
        var logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAACrCAYAAACQeW4cAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEMxRTIwQzJBOTQxMTFFM0I3RjBFOEU0MjU2MkQ4NDQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEMxRTIwQzFBOTQxMTFFM0I3RjBFOEU0MjU2MkQ4NDQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkRBMDdFRjM2Mjk5MTFFM0FDRURCMUYzQTIwRkVCQkEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkRBMDdFRjQ2Mjk5MTFFM0FDRURCMUYzQTIwRkVCQkEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7ll96yAABlYklEQVR42uxdB3wU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';
        doc.addImage(logo, "JPG", 10, 10, 60, 30);


        doc.setFont("Verdana");
        doc.setFontSize(12);


        doc.text(220, 20, 'Name: ' + $scope.energyBill.firstName.toUpperCase() + ' ' +
            $scope.energyBill.lastName.toUpperCase());
        doc.text(220, 28, 'Phone: ' + $scope.energyBill.phoneNumber);


        doc.text(220, 36, 'Address: ' + $scope.energyBill.address);
        doc.text(220, 44, 'Zip: ' + $scope.energyBill.zipcode);

        //Draw a horizontal Line
        doc.setTextColor(85, 99, 106);
        doc.setFontSize(42);
        var x = 60;
        y = 70;
        doc.text(60, 70, 'Your Solar System Details');
        x += 8;
        y += 5;
        doc.setFillColor(85, 99, 106);
        doc.setLineWidth(1.5);
        doc.line(x, y, x + 157, y);

        var setHeaders = function (x, y) {

            doc.setFontSize(14);
            doc.setLineWidth(1);
            doc.line(20, y + 20, x + 215, y + 20);
            doc.text(30, y + 30, "S.No");
            doc.text(60, y + 30, "Item Description");
            doc.text(205, y + 30, "Quantity");
            //x = 285 is the left most end of the landscape pdf in a 14 point font. 
            doc.text(265, y + 30, "Price");

            doc.setLineWidth(1);
            doc.line(20, y + 40, x + 215, y + 40);


        };

        var setItems = function (x, y) {

            var str = "High Efficiency Panels Watts";
            doc.text(60, y + 10, str);
            doc.text(30, y + 10, "1.");
            doc.text(205, y + 10, " " + $scope.energyBill.numPanels);
            doc.setFontSize(24);
            doc.addPage();
            y = 10;
            doc.addImage(logo, "JPG", 10, 10, 60, 30);
            doc.text(60, y + 40, "COMPETITIVE ESTIMATE GOOD FOR 6 MONTHS");
            doc.setFontSize(18);
            doc.text(30, y + 60, "Total Investment: $" + $scope.energyBill.solarCostDisplay);


            doc.text(30, y + 70, "Out of Pocket: $" + $scope.energyBill.outOfPocket);


            doc.setLineWidth(0.5);

            doc.line(20, y + 80, x + 215, y + 80);
            doc.setFontSize(18);
            doc.text(30, y + 92, "Cash");
            doc.text(200, y + 92, "Ez Pay ");

            doc.line(20, y + 100, x + 215, y + 100);
            doc.line(140, y + 82, 140, y + 98);
            doc.setFontSize(14);
            doc.text(160, y + 150, "Monthly Investment @ 15.9% APR ");
            doc.text(170, y + 155, "for 144 months(12 yrs.) $" + $scope.energyBill.emi);
            doc.text(20, y + 150, "Balance Due  Upon Completion $" + ($scope.energyBill.solarCost - $scope.energyBill.outOfPocket));


        };

        //Set headers
        setHeaders(x, y);

        y += 40;

        setItems(x, y);

        doc.save('Test.pdf');

    }

    }]);
proposalControllers.controller('summaryController', ['$scope', 'dataService', function ($scope, dataService) {
    $scope.energyBill = dataService.dataObj;
    $scope.navMenuPageArrayEnerUses = $scope.energyBill.menuPageArrayeu;
    $scope.navMenuPageArrayUpgrad = $scope.energyBill.menuPageArrayup;
    $scope.navMenuPageArrayPayment = $scope.energyBill.menuPageArraypay;



    $('#columnChart').highcharts({
        chart: {
            type: 'column'

        },

        xAxis: {
            type: 'datetime',
            labels: {
                rotation: -45,


            },
            dateTimeLabelFormats: {
                day: '%y'
            }
        },
        yAxis: {
            title: '',
            labels: {
                formatter: function () {
                    if (this.value > 0)
                        return "$" + $scope.energyBill.convertToComma(this.value);
                    else if (this.value == 0)
                        return "$0";
                    else
                        return "-" + "$" + $scope.energyBill.convertToComma(-this.value);

                }
            }
        },
        legend: {
            enabled: false
        },
        series: [{

            data: [2000, -2500, -3456, 2456, 1145, 5432, 6432, 5234, -4234, 6423, 5423, 4243, -4423, 5243, 6423, 1243, -1044, 1323, 1323, 1323, 1423, 1523, 1654, 1064, 8423, 1923],
            pointStart: Date.UTC(2016, 0, 1),
            color: '#717171',
            pointInterval: 365 * 24 * 3600 * 1000 // one year
        }]
    });

    }]);
proposalControllers.controller('finishApplicationController', ['$scope', 'dataService', function ($scope, dataService) {
    $scope.energyBill = dataService.dataObj;
    $scope.navMenuPageArrayEnerUses = $scope.energyBill.menuPageArrayeu;
    $scope.navMenuPageArrayUpgrad = $scope.energyBill.menuPageArrayup;
    $scope.navMenuPageArrayPayment = $scope.energyBill.menuPageArraypay;

    }]);
proposalControllers.controller('noBillBarGraphController', ['$scope', 'dataService', function ($scope, dataService) {
    $scope.energyBill = dataService.dataObj;
    $scope.navMenuPageArrayEnerUses = $scope.energyBill.menuPageArrayeu;
    $scope.navMenuPageArrayUpgrad = $scope.energyBill.menuPageArrayup;
    $scope.navMenuPageArrayPayment = $scope.energyBill.menuPageArraypay;
    $scope.showHide = true;
    $scope.ShowGraph = function () {
        $scope.showHide = $scope.showHide === false ? true : false;
    };
    if ($scope.energyBill.dollar === true) {

        $scope.energyBill.calculateTotalDollars();


    } else {
        $scope.energyBill.calculateTotalkWh();

    }


    }]);
proposalControllers.controller('lineGraphController', ['$scope', 'dataService', function ($scope, dataService) {

    $scope.energyBill = dataService.dataObj;
    $scope.navMenuPageArrayEnerUses = $scope.energyBill.menuPageArrayeu;
    $scope.navMenuPageArrayUpgrad = $scope.energyBill.menuPageArrayup;
    $scope.navMenuPageArrayPayment = $scope.energyBill.menuPageArraypay;

    $scope.lineGraphNotice = $scope.energyBill.lineGraphShowNotice;
    $scope.showHide = $scope.energyBill.showHideLineGraph;
    var rates = $scope.energyBill.kWhRates;
    $scope.ShowGraph = function () {
        $scope.showHide = $scope.showHide === false ? true : false;
        $scope.energyBill.showHideLineGraph = false;
        $scope.lineGraphNotice = $scope.lineGraphNotice === false ? true : false;

    };
    $('#lineGraph').highcharts({
        title: {
            /*text: 'Electric Price History',*/
            x: 0 //center
        },
        credits: {
            enabled: false
        },


        xAxis: {
            categories: ['1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'],
            minTickInterval: 5,
            min: 0,
            max: 30,
            showLastLabel: true,
            endOnTick: true
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
            line: {
                animation: true
            }
        },
        tooltip: {
            //   valueSuffix:
            formatter: function () {
                return '$' + Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            color: '#817f7f',

            data: rates
        }],
        plotOptions: {
            series: {
                animation: {
                    duration: 4000
                }
            }
        },
        pointInterval: 0.05
    });



}]);


proposalControllers.controller('areaChartController', ['$scope', 'dataService', function ($scope, dataService) {


    var workData = [];
    var years = [];
    var totalYearData = [];
    $scope.energyBill = dataService.dataObj;
    $scope.navMenuPageArrayEnerUses = $scope.energyBill.menuPageArrayeu;
    $scope.navMenuPageArrayUpgrad = $scope.energyBill.menuPageArrayup;
    $scope.navMenuPageArrayPayment = $scope.energyBill.menuPageArraypay;

    $scope.energyBill.cumulative30YearsExpense = 0;

    $scope.clickButton = function () {
        var i = workData.length;
        var areaChart = $('#areaChart').highcharts();
        var series = areaChart.series[0];
        var x = 20;
        // Add it


        if (i < totalYearData.length) {
            //workData[i] = fiveYearData[i];
            series.addPoint(totalYearData[i]);
            //Label Approach
            $scope.label.destroy();
            if (i < totalYearData.length - 1) {
                var point = series.points[i];
                if (areaChart.plotSizeX - point.plotX > 100) {
                    $scope.label = areaChart.renderer.label(
                            /*
                                                    '<div class="btn-proposal row" display: block;>\
                                                        <div class="btn-text col-sm-6"> Next 5 Years</div> \
                                                        <div class="btn-graphic col-sm-6">\
                                                            <div style="margin-top: 12px; width:40px; font-size:25px" \
                                                                class="glyphicon glyphicon-chevron-right"> \
                                                            </div>\
                                                        </div>\
                                                    </div>',
                            */
                            '<div class="btn-label" display: block;><div class="btn-text"> \
                    <b style="padding-right:5px;">  Next 5 Year</b><span class="glyphicon glyphicon-arrow-right" style="border-left: 2px solid #fff; padding-left:8px;"> </div></div>', point.plotX - 50, 200,
                            'square',

                            point.plotX, 200,
                            'square', point.plotX, point.plotY, true)
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
                } else {
                    $scope.label = areaChart.renderer.label(
                            '<div class="btn-label" display: block;><div class="btn-text"> \
                     <b style="padding-right:8px; border-right: 2px solid; "> Next 5 Years</b><span class="glyphicon glyphicon-chevron-right" style="padding-left:8px;"></div></div>', point.plotX - 50, 200,
                            'square', point.plotX, point.plotY, true)
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

                $(".btn-label").click($scope.clickButton);
            } else {
                //The last time the box no longer needed

                $scope.energyBill.lastIteration = true;
                $scope.energyBill.lastIteration2 = false;
                $scope.$apply();

            }
        }
    };

    $scope.ShowBluImage = function () {
        $scope.energyBill.lastIteration = false;
        /*$scope.energyBill.lastIteration == true;*/
        $scope.energyBill.lastIteration2 = $scope.energyBill.lastIteration2 === false ? true : false;


    };

    $scope.energyBill.percentChange = parseFloat($scope.energyBill.percentChange);
    var annualExpenses = [];
    annualExpenses[0] = $scope.energyBill.annualCost;
    totalYearData.push($scope.energyBill.annualCost);
    years.push(0);
    for (var i = 1; i < $scope.energyBill.yearChange; i++) {

        annualExpenses[i] = annualExpenses[i - 1] + annualExpenses[i - 1] * $scope.energyBill.percentChange / 100;

        if ((i + 1) % 5 == 0) {
            totalYearData.push(annualExpenses[i]);
            years.push(i + 1);
        }

        $scope.energyBill.cumulative30YearsExpense += annualExpenses[i];
    }
    $scope.energyBill.cumulative30YearsExpense = Math.ceil($scope.energyBill.cumulative30YearsExpense);

    $scope.energyBill.cumulative30YearsExpenseDisplay = $scope.energyBill.convertToComma($scope.energyBill.cumulative30YearsExpense);

    for (var i = 0; i < totalYearData.length; i++) {
        if (i < 2)
            workData[i] = totalYearData[i];

    }
    $scope.loop = 0;
    $scope.energyBill.lastIteration = false;
    $scope.energyBill.lastIteration2 = false;
    $('#areaChart').highcharts({
        credits: {
            enabled: false
        },
        chart: {
            type: 'area',
            animation: false,
            events: {
                load: function () {
                    //Label Approach
                    var point = this.series[0].points[1];
                    $scope.label = this.renderer.label('<div class="btn-label icon-right" \
                                                                    display: block;>\
                                                                    <div class="btn-text"><b style="padding-right:5px;">Next 5 Years </b><span class="glyphicon glyphicon-circle-arrow-right" style="border-left: 2px solid #fff; padding-left:8px;"> </div></div>',
                            point.plotX, 200,
                            'square', point.plotX, point.plotY + this.plotTop,
                            true)
                        .add();
                    $(".btn-label").click($scope.clickButton);

                }

            },

        },
        title: {
            //  text: 'Your Future Electric Costs'
        },
        legend: {
            enabled: false
        },
        xAxis: {
            allowDecimals: false,
            categories: years,
            labels: {
                formatter: function () {
                    var index = this.axis.categories.indexOf(this.value);
                    if (this.value == 0)
                        return '<strong> Today' + '</strong><br> $' +
                            $scope.energyBill.convertToComma(Math.ceil(workData[index])) + '/yr';
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
            max: totalYearData[totalYearData.length - 1],


            labels: {
                formatter: function () {
                    return "$" + $scope.energyBill.convertToComma(this.value);
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

proposalControllers.controller('estimatedSolarSystemController', ['$scope', 'dataService', function ($scope, dataService) {

    $scope.energyBill = dataService.dataObj;
    $scope.navMenuPageArrayEnerUses = $scope.energyBill.menuPageArrayeu;
    $scope.navMenuPageArrayUpgrad = $scope.energyBill.menuPageArrayup;
    $scope.navMenuPageArrayPayment = $scope.energyBill.menuPageArraypay;
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
                        'September', 'October', 'November', 'December'];
    $scope.dataMonths = [];
    var dollars = [];

    //Populate the kWh if not fetched check from a global toggle

    for (var i = 0; i < months.length; i++) {
        var tmp = $scope.energyBill.Month[i];
        var num = tmp.kWh;

        $scope.dataMonths.push(num);
    }

    solarEstimate = $scope.energyBill.setEstimatedSolarProduction();


    $('#lineAreaChart').highcharts({
        credits: {
            enabled: false
        },
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
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        series: [{
                name: 'Your Electricity Usage',
                type: 'column',
                color: '#0000FF',
                data: $scope.dataMonths
        }, {
                type: 'area',
                name: 'Estimated Solar Production',
                color: '#eefc6a',
                data: solarEstimate,
                lineColor: 'black',
                marker: {
                    lineWidth: 1,
                    lineColor: 'black',
                    fillColor: '#FFFFFF'
                }
        }
        ]
    });

}]);