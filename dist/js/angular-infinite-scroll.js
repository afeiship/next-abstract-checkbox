(function () {
  'use strict';

  angular.module('nx.widget', []);

})();

(function () {
  'use strict';

  angular.module('nx.widget')
    .directive('nxInfiniteScroll', ['$timeout', function ($timeout) {
      return {
        restrict: 'A',
        scope: {
          distance: '@',
          enableScroll: '=',
          page: '=',
          rows: '=',
          loadData: '&',
          hasMore: '=',
          loading: '=',
          load: '=',
          items: '='
        },
        link: linkFn,
        controller: ["$scope", function ($scope) {
          $scope.init = init;
          $scope.load = load;

          function init() {

            angular.extend({
              page: 1,
              rows: 20,
              items: [],
              loading: false,
              hasMore: false
            }, $scope);

            load();
          }


          function load() {
            var responseData;
            var returned = $scope.loadData();
            $scope.page++;
            $scope.loading = true;
            if (!returned.then) {
              returned = {
                then: (function (fn) {
                  //synchronization
                  return function (callback) {
                    callback.call(window, {
                      data: fn()
                    });
                  };
                })(returned)
              };
            }

            returned.then(function (response) {
              responseData = response.data;
              $scope.items = $scope.items.concat(responseData);
              $scope.hasMore = (responseData.length === $scope.rows);
              $scope.loading = false;
            });
          }

        }]
      };


      function linkFn(scope, element, attrs) {
        scope.init();


        if (scope.enableScroll) {
          var distance = parseInt(attrs.distance) || 0;
          var debounce = parseInt(attrs.debounce) || 600;
          var el = element[0];
          var timer = null;

          element.bind('scroll', function () {
            if (el.scrollTop + el.offsetHeight >= el.scrollHeight - distance) {
              $timeout.cancel(timer);  //does nothing, if timeout alrdy done
              timer = $timeout(function () {   //Set timeout
                scope.load();
              }, debounce);
            }
          });
        }
      }

    }]);


})();
