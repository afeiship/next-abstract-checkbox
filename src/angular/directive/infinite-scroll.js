(function () {
  'use strict';

  angular.module('nx.widget')
    .directive('nxInfiniteScroll', [function ($scope) {
      return {
        restrict: 'A',
        scope: {
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

        var offset = parseInt(attrs.threshold) || 0;
        var e = element[0];

        element.bind('scroll', function () {
          if (e.scrollTop + e.offsetHeight >= e.scrollHeight - offset) {
            console.log('should scroll!');
            //scope.$apply(attrs.infiniteScroll);

          }
        });
      }

    }]);


})();
