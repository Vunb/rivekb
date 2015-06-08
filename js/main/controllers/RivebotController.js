angular.module("rivekb")
.controller("RivebotController", ["$scope", "$log", "apply", function($scope, $log, apply){
    
    $scope.botOk = false;
    $scope.message = "";
    $scope.messages = [];

    var RiveScript = require('./lib/rivescript');
    var bot = new RiveScript({utf8: true, debug: true});

    bot.loadDirectory("brain/bkindex", loading_done, loading_error);

    function loading_done (batch_num) {
        $log.debug("Batch #" + batch_num + " has finished loading!");
        $log.debug("Now the replies must be sorted!");
        bot.sortReplies();
        apply(function() {
            $scope.botOk = true;
        })
    }

    function loading_error (batch_num, error) {
        $log.error("Error when loading files: " + error);
    }
    
    $scope.reply = function(message) {
        if(!message) return false;
        var user = "local";
        var reply = bot.reply(user, message);

        apply(function() {
            $scope.messages.push({
                timeReceived: new Date()
                , text: message
                , fromBot: false
            });
            $scope.messages.push({
                timeReceived: new Date()
                , text: reply
                , fromBot: true
            });
            $log.debug("Question: " + message);
            $log.debug("Answer: " + reply);
            $scope.message = "";
        })
    }
    
    $scope.reload = function() {
        window.location.reload();
    }
    
}]);