(function() {

  this.StudentListCtrl = function($scope) {
    var val;
    $scope.deleteStudent = function(studentToDelete) {
      var student, students, _i, _len;
      students = $scope.students;
      for (_i = 0, _len = students.length; _i < _len; _i++) {
        student = students[_i];
        if (!(student === studentToDelete)) continue;
        students.splice(i, 1);
        return;
      }
    };
    $scope.addStudent = function() {
      return $scope.students.push({
        name: ''
      });
    };
    $scope.groupStudents = function(students, numGroups) {
      var g, group, groups, student, studentNames;
      g = new GroupApp.Grouper();
      studentNames = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = students.length; _i < _len; _i++) {
          student = students[_i];
          _results.push(student.name);
        }
        return _results;
      })();
      groups = g.groupInto(numGroups, studentNames);
      return $scope.groups = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = groups.length; _i < _len; _i++) {
          group = groups[_i];
          _results.push(group.to_array());
        }
        return _results;
      })();
    };
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
    return $scope.groups = [];
  };

}).call(this);
