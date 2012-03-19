(function() {

  angular.module('GroupEm.Directives', []).directive('uniqueIn', function() {
    return {
      priority: -1,
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        var previous, storePrevious, uniqueSet, validator;
        uniqueSet = scope.$eval(attrs.uniqueIn);
        previous = null;
        validator = function(value) {
          if (value !== previous) {
            if (previous) uniqueSet[previous] = (uniqueSet[previous] || 1) - 1;
            if (value) uniqueSet[value] = (uniqueSet[value] || 0) + 1;
          }
          return value;
        };
        ctrl.$formatters.push(validator);
        ctrl.$parsers.push(validator);
        storePrevious = function(v) {
          return previous = v;
        };
        ctrl.$formatters.unshift(storePrevious);
        ctrl.$parsers.push(storePrevious);
        return scope.$watch(function() {
          return uniqueSet[ctrl.$viewValue] === 1;
        }, function(value) {
          return ctrl.$setValidity('unique', value);
        });
      }
    };
  });

}).call(this);
