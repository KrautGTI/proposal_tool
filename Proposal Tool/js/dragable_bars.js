$(function () {
	
    mydata = [10, 5, 3, 2, 7, 2, 8,14, 12, 22, 11, 3];
    $('#bars').highcharts({

      title: {
       /* text: 'Highcharts draggable points demo'*/
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
   
});