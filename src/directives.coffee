angular.module('pbd', []).
directive('uniqueIn', ()->
  priority: -1
  require: 'ngModel'
  link: (scope, elm, attrs, ctrl)->
    uniqueSet = scope.$eval(attrs.uniqueIn)
    previous = null

    validator = (value)->
      if value !== previous
        if previous
          uniqueSet[previous] = (uniqueSet[previous] || 1) - 1
        if value
          uniqueSet[value] = (uniqueSet[value] || 0) + 1
      value

    ctrl.$formatters.push(validator)
    ctrl.$parsers.push(validator)

    storePrevious = (v)->
      previous = v

    ctrl.$formatters.unshift(storePrevious)
    ctrl.$parsers.push(storePrevious)

    scope.$watch(
      ()-> uniqueSet[ctrl.$viewValue] == 1,
      (value)-> ctrl.$setValidity('unique', value)
    )
