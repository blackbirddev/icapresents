// public/controllers/footer.js

/**
 * Expose footer functionality
 */
(function() {

    angular.module('footer', [])    

        /**
         * Make sure the footer is sticking to the bottom.
         */
        .controller('FooterController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
            setInterval(function () {
                var bodyHeight = $(".margin-view").height();
                var vwptHeight = $(window).height();
                if (vwptHeight > bodyHeight) {
                    $(".footer").css("position","absolute").css("bottom",-200)
                } else{
                    $(".footer").css("position","relative").css("bottom",0);
                }
            }, 500);
        }]);

})();
                                         
