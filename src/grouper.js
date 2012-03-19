(function() {
  var createRelationMap, groupBy, groupInto, possibleChoices, _base, _base2, _base3, _base4, _base5, _base6, _base7;

  if ((_base = Array.prototype).copy == null) {
    _base.copy = function() {
      return this.slice();
    };
  }

  if ((_base2 = Array.prototype).remove == null) {
    _base2.remove = function(item) {
      this.splice(this.indexOf(item), 1);
      return this;
    };
  }

  if ((_base3 = Array.prototype).has == null) {
    _base3.has = function(item) {
      return this.indexOf(item) !== -1;
    };
  }

  if ((_base4 = Array.prototype).intersection == null) {
    _base4.intersection = function(other) {
      var item, _i, _len, _results;
      if (other != null) {
        _results = [];
        for (_i = 0, _len = other.length; _i < _len; _i++) {
          item = other[_i];
          if (this.has(item)) _results.push(item);
        }
        return _results;
      } else {
        return [];
      }
    };
  }

  if ((_base5 = Array.prototype).overlap == null) {
    _base5.overlap = function(other) {
      var _ref;
      return ((_ref = this.intersection(other)) != null ? _ref.length : void 0) > 0;
    };
  }

  if ((_base6 = Array.prototype).random == null) {
    _base6.random = function() {
      return this[Math.floor(Math.random() * this.length)];
    };
  }

  if ((_base7 = Array.prototype).add == null) {
    _base7.add = function(item) {
      if (!this.has(item)) return this.push(item);
    };
  }

  createRelationMap = function(pairs) {
    var map, pair, _i, _len, _name, _name2, _ref, _ref2;
    map = {};
    for (_i = 0, _len = pairs.length; _i < _len; _i++) {
      pair = pairs[_i];
      ((_ref = map[_name = pair[0]]) != null ? _ref : map[_name] = []).add(pair[1]);
      ((_ref2 = map[_name2 = pair[1]]) != null ? _ref2 : map[_name2] = []).add(pair[0]);
    }
    return map;
  };

  possibleChoices = function(students, group, keepApartFrom) {
    var choices, student, studentsToKeepApart, _i, _len;
    choices = [];
    for (_i = 0, _len = students.length; _i < _len; _i++) {
      student = students[_i];
      studentsToKeepApart = keepApartFrom[student];
      if (!group.overlap(studentsToKeepApart)) choices.add(student);
    }
    return choices;
  };

  groupInto = function(numGroups, studentsList, keepApartPairs) {
    var chooseFrom, group, groupIndex, groups, i, keepApartFrom, student, students;
    if (keepApartPairs == null) keepApartPairs = [];
    keepApartFrom = createRelationMap(keepApartPairs);
    groups = [];
    for (i = 0; 0 <= numGroups ? i < numGroups : i > numGroups; 0 <= numGroups ? i++ : i--) {
      groups[i] = [];
    }
    students = studentsList.copy();
    groupIndex = 0;
    while (students.length > 0) {
      group = groups[groupIndex];
      chooseFrom = possibleChoices(students, group, keepApartFrom);
      if (chooseFrom.length === 0) return null;
      student = chooseFrom.random();
      group.add(student);
      students.remove(student);
      groupIndex = (groupIndex + 1) % numGroups;
    }
    console.dir(groups);
    return groups;
  };

  groupBy = function(groupSize, students, keepApartPairs) {
    return groupInto(students.length / groupSize, students, keepApartPairs);
  };

  this.GroupApp = {
    groupBy: groupBy,
    groupInto: groupInto,
    createRelationMap: createRelationMap,
    possibleChoices: possibleChoices
  };

}).call(this);
