(function() {

  this.StudentListCtrl = function($scope) {
    var val;
    $scope.deleteStudent = function(student) {
      return $scope.students.remove(student);
    };
    $scope.addStudent = function() {
      return $scope.students.push({
        name: ''
      });
    };
    $scope.formsAreInvalid = function() {
      console.log($scope.keepApartForm.$invalid);
      return $scope.studentListForm.$invalid;
    };
    $scope.groupStudents = function(students, numGroups, keepApartPairs) {
      var attemptsLeft, pair, student, studentNames;
      studentNames = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = students.length; _i < _len; _i++) {
          student = students[_i];
          _results.push(student.name);
        }
        return _results;
      })();
      keepApartPairs = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = keepApartPairs.length; _i < _len; _i++) {
          pair = keepApartPairs[_i];
          _results.push([pair[0].name, pair[1].name]);
        }
        return _results;
      })();
      attemptsLeft = 100;
      $scope.groups = null;
      while (!(($scope.groups != null) || attemptsLeft === 0)) {
        $scope.groups = GroupApp.groupInto(numGroups, studentNames, keepApartPairs);
        attemptsLeft -= 1;
      }
      return console.log("Attempts: " + (100 - attemptsLeft));
    };
    $scope.showGroups = function() {
      if ($scope.groups != null) {
        if ($scope.groups.length > 0) {
          return 'Groups Found';
        } else {
          return 'Empty';
        }
      } else {
        return 'Not Possible';
      }
    };
    $scope.addKeepApartPair = function() {
      return $scope.keepApartPairs.push([null, null]);
    };
    $scope.removePair = function(pair) {
      return $scope.keepApartPairs.remove(pair);
    };
    $scope.otherStudents = function(student, pairIndex) {
      var i, pair, students, _len, _ref;
      students = $scope.students.copy();
      students.remove(student);
      _ref = $scope.keepApartPairs;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        pair = _ref[i];
        if (!(i < pairIndex)) continue;
        if (student === pair[0]) students.remove(pair[1]);
        if (student === pair[1]) students.remove(pair[0]);
      }
      return students;
    };
    $scope.studentUniqueSet = {};
    $scope.students = (function() {
      var _i, _len, _ref, _results;
      _ref = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        val = _ref[_i];
        _results.push({
          name: val
        });
      }
      return _results;
    })();
    $scope.numGroups = 3;
    $scope.groups = [];
    return $scope.keepApartPairs = [];
  };

}).call(this);
