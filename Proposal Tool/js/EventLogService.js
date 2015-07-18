


app.service('eventLogService', ['$http', 'sessionId', function ($http, sessionId) {

    var _autoFlushIntervalSeconds = 10000; // 10 seconds
    var _timeoutIntervalReference = null;
    var _logs = [];



    // force logs to be pushed to the server
    var flush = function () {

        if (_logs.length > 0) {

            // send them up to the server
            $http.post('api/ProposalTool/SaveADP', { DataPoints: _logs });

            _logs = [];
        }

    }

    // add a log to the log queue
    var addLog = function (name, value) {

        _logs.push({
            Name: name,
            Value: value,
            SessionId: sessionId,
            CreatedDate: GetTimeStamp()
        });

        // When we add a log we'll also enable the interval that auto submits our logs based on the _autoFlushIntervalSeconds
  
        if (_timeoutIntervalReference == null) {
            _timeoutIntervalReference = setInterval(flush, _autoFlushIntervalSeconds);
        }

    }

    // Specify how often to flush the log
    var setFlushIntervalSeconds = function (seconds) {
        _autoFlushIntervalSeconds = seconds * 1000;
        clearInterval(_timeoutIntervalReference);
    }

    function GetTimeStamp() {
        var a = new Date();
        var year = a.getUTCFullYear();
        var month = ("0" + (a.getUTCMonth() + 1)).slice(-2);
        var date = ("0" + a.getUTCDate()).slice(-2);
        var hour = ("0" + a.getUTCHours()).slice(-2);
        var min = ("0" + a.getUTCMinutes()).slice(-2);
        var sec = ("0" + a.getUTCSeconds()).slice(-2);
        var milli = a.getUTCMilliseconds();
        var time = month + '/' + date + '/' + year + ' ' + hour + ':' + min + ':' + sec + "." + milli;
        return time;
    }

    return {
        //createLog: createLog,
        addLog: addLog,
        flush: flush,
        setFlushIntervalSeconds: setFlushIntervalSeconds
    };

}]);

app.directive('eventLog', ['$filter', '$browser','eventLogService', function ($filter, $browser, eventLogService) {
    return {
        link: function ($scope, $element, $attrs, ngModelCtrl) {

            var listener = function () {

                handleElement($element, $attrs);
            }

            setEvents($element);





            function handleElement($element, $attrs) {

                var name = null;
                var value = null;
                var attrs = $attrs.eventLog.split(":");

                switch ($element[0].tagName) {

                    case "INPUT":
                    case "SELECT":
                    case "TEXTAREA":
                        name = attrs[0];
                        value = $element.val();
                        break;
                    case "DIV":
                    case "BUTTON":
                    case "SPAN":
                    case "IMG":
                    case "TD":
                    case "TR":
                    case "P":
                    case "A":
                        name = attrs[0];
                        value = attrs[1];
                        break;
                    default:
                        throw "Event Logger - <" + $element[0].tagName + "> not implemented for logging";
                        break;
                }


                return eventLogService.addLog(name, value);

            }

            function setEvents() {


                switch ($element[0].tagName) {

                    case "INPUT":
                    case "SELECT":

                        $element.bind('change', listener)

                        $element.bind('paste cut', function () {
                            $browser.defer(listener)
                        })

                        break;
                    case "DIV":
                    case "BUTTON":
                    case "SPAN":
                    case "IMG":
                    case "TD":
                    case "TR":
                    case "P":
                    case "A":
                        $element.bind('click', listener)
                        break;
                    default:
                        throw "Event Logger - <" + $element[0].tagName + "> not implemented for logging";
                        break;
                }


            }


        }

    }
}]);
