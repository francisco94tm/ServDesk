

angular.module('app').filter('numKeys', function() {
    return function(json) {
        var keys = Object.keys(json)
        return keys.length;
    }
});

/*Se crea el filtro y la funcion donde va a incrementar el número de ceros*/
angular.module('app').filter('minDigits', function () {
    return function (n, len) {
        var num = parseInt(n, 10);
        len = parseInt(len, 10);
        if (isNaN(num) || isNaN(len)) {
            return n;
        }
        num = '' + num;
        while (num.length < len) {
            num = '0' + num;
        }
        return num;
    };
});

angular.module('app').filter('groupBy', function($parse) {
   return _.memoize(function(items, field) {
        var getter = $parse(field);
        var y = _.groupBy(items, function(item) {
            return getter(item);
        }); 
        return _.groupBy(items, function(item) {
            return getter(item);
        });
    });   
});
 
angular.module('app').filter('roundTo', function(numberFilter) {
    return function(value, maxDecimals) {
        return numberFilter((value || 0)
            .toFixed(maxDecimals)
            .replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")
        );
    }
})