(function() {
  var Grouper, Relations, Set;

  Set = (function() {

    function Set(elems) {
      var elem, _i, _len;
      if (elems == null) elems = [];
      this.hash = {};
      for (_i = 0, _len = elems.length; _i < _len; _i++) {
        elem = elems[_i];
        this.hash[elem] = true;
      }
    }

    Set.prototype.add = function(elem) {
      return this.hash[elem] = true;
    };

    Set.prototype.remove = function(elem) {
      return delete this.hash[elem];
    };

    Set.prototype.has = function(elem) {
      return this.hash[elem] != null;
    };

    Set.prototype.union = function(set2) {
      var elem, set, _i, _len, _ref;
      set = new Set();
      for (elem in this.hash) {
        set.add(elem);
      }
      _ref = set2.to_array();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elem = _ref[_i];
        set.add(elem);
      }
      return set;
    };

    Set.prototype.intersection = function(set2) {
      var elem, set;
      set = new Set();
      for (elem in this.hash) {
        if (set2.has(elem)) set.add(elem);
      }
      return set;
    };

    Set.prototype.shareElements = function(set2) {
      var elem;
      for (elem in this.hash) {
        if (set2.has(elem)) return true;
      }
      return false;
    };

    Set.prototype.minus = function(set2) {
      var elem, set;
      set = new Set();
      for (elem in this.hash) {
        if (!set2.has(elem)) set.add(elem);
      }
      return set;
    };

    Set.prototype.is_subset_of = function(set2) {
      var elem;
      for (elem in this.hash) {
        if (!set2.has(elem)) return false;
      }
      return true;
    };

    Set.prototype.equals = function(set2) {
      return this.is_subset_of(set2) && set2.is_subset_of(this);
    };

    Set.prototype.to_array = function() {
      var elem, _results;
      _results = [];
      for (elem in this.hash) {
        _results.push(elem);
      }
      return _results;
    };

    Set.prototype.each = function(f) {
      var elem, _results;
      _results = [];
      for (elem in this.hash) {
        _results.push(f(elem));
      }
      return _results;
    };

    Set.prototype.to_string = function() {
      return this.to_array();
    };

    Set.prototype.size = function() {
      return this.to_array().length;
    };

    Set.prototype.random = function() {
      var array;
      array = this.to_array();
      return array[Math.floor(Math.random() * array.length)];
    };

    Set.prototype.copy = function() {
      return new Set(this.to_array());
    };

    Set.prototype.empty = function() {
      return this.size() === 0;
    };

    return Set;

  })();

  Relations = (function() {

    function Relations(pairs) {
      var pair, _base, _base2, _i, _len, _name, _name2, _ref, _ref2;
      this.map = {};
      for (_i = 0, _len = pairs.length; _i < _len; _i++) {
        pair = pairs[_i];
        ((_ref = (_base = this.map)[_name = pair[0]]) != null ? _ref : _base[_name] = new Set()).add(pair[1]);
        ((_ref2 = (_base2 = this.map)[_name2 = pair[1]]) != null ? _ref2 : _base2[_name2] = new Set()).add(pair[0]);
      }
    }

    Relations.prototype.relations = function(a) {
      var _ref;
      return (_ref = this.map[a]) != null ? _ref : new Set();
    };

    Relations.prototype.areRelated = function(a, b) {
      var _ref, _ref2;
      return (_ref = (_ref2 = this.map[a]) != null ? _ref2.has(b) : void 0) != null ? _ref : false;
    };

    return Relations;

  })();

  Grouper = (function() {

    function Grouper() {}

    Grouper.prototype.groupBy = function(size, students, separatePairs) {
      return this.groupInto(this.students.size() / size, students, separatePairs);
    };

    Grouper.prototype.groupInto = function(numGroups, studentsList, separatePairs) {
      var chooseFrom, group, groupIndex, groups, i, separate, student, students;
      if (separatePairs == null) separatePairs = [];
      separate = new Relations(separatePairs);
      groups = (function() {
        var _results;
        _results = [];
        for (i = 1; 1 <= numGroups ? i <= numGroups : i >= numGroups; 1 <= numGroups ? i++ : i--) {
          _results.push(new Set());
        }
        return _results;
      })();
      students = new Set(studentsList);
      groupIndex = 0;
      while (!students.empty()) {
        group = groups[groupIndex];
        chooseFrom = this.possibleChoices(students, group, separate);
        student = chooseFrom.random();
        group.add(student);
        students.remove(student);
        groupIndex = (groupIndex + 1) % numGroups;
      }
      return groups;
    };

    Grouper.prototype.possibleChoices = function(students, group, separate) {
      var choices, separateFromStudent, student, _i, _len, _ref;
      choices = new Set();
      _ref = students.to_array();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        student = _ref[_i];
        separateFromStudent = separate.relations(student);
        if (!group.shareElements(separateFromStudent)) choices.add(student);
      }
      return choices;
    };

    return Grouper;

  })();

  this.GroupApp = {
    Set: Set,
    Relations: Relations,
    Grouper: Grouper
  };

}).call(this);
