document.addEventListener("DOMContentLoaded", function(event) {
    var dateField = document.getElementById('date');
    var timeField = document.getElementById('timestamp');

    var busy = false;

    var watcher = function(element, callback) {
        var stop = false;
        var wait = 1000; // 1s
        var watchBody = function() {
            if (stop) { return false; }
            callback(element.value);
            window.setTimeout(watchBody, wait);
            return true;
        };
        
        element.addEventListener("focus", function(e) {
            stop = false;
            window.setTimeout(watchBody, wait);
        });

        element.addEventListener("blur", function(e) {
            stop = true;
        });
    };

    var dateWatcher = watcher(dateField, function(date) {
        var d = new XDate(date);
        timeField.value = d.getTime() / 1000;
    });

    var timeWatcher = watcher(timeField, function(date) {
        var d = new XDate(date * 1000);
        dateField.value = d.toString('i');
    });
});
