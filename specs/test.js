(function() {
  var g, group, keepApartPairs, students;

  g = students = group = keepApartPairs = null;

  beforeEach(function() {
    students = ['Jo Bloggs', 'Annie Other', 'Brian Berry', 'Peter Problem', 'Jake Rake', 'Mark Blackboard', 'Jeremy Strong', 'Ella Rose'];
    group = ['Jo Bloggs', 'Annie Other'];
    return keepApartPairs = [['Jo Bloggs', 'Brian Berry'], ['Annie Other', 'Ella Rose']];
  });

  describe('Array', function() {
    describe('add', function() {
      return it('adds a new item into the array', function() {
        var a;
        a = [];
        a.add('a');
        return expect(a.length).toEqual(1);
      });
    });
    describe('overlap', function() {
      var group1, group2, group3, group4;
      group1 = group2 = group3 = group4 = null;
      beforeEach(function() {
        group1 = ['A', 'B', 'C'];
        group2 = ['B', 'D'];
        group3 = ['D', 'E'];
        return group4 = [];
      });
      it('returns true if the two groups have common elements', function() {
        expect(group1.overlap(group1)).toBeTruthy();
        expect(group1.overlap(group2)).toBeTruthy();
        return expect(group2.overlap(group3)).toBeTruthy();
      });
      it('returns false if the two groups do not have common elements', function() {
        expect(group1.overlap(group3)).toBeFalsy();
        return expect(group1.overlap(group4)).toBeFalsy();
      });
      return it('returns false if the first group is empty', function() {
        return expect(group4.overlap(group1)).toBeFalsy();
      });
    });
    return describe('random', function() {
      return it('returns a random element from the group', function() {
        var group1, random;
        group1 = ['A', 'B', 'C', 'D', 'E'];
        random = group1.random();
        return expect(group1.has(random)).toBeTruthy();
      });
    });
  });

  describe('createRelationMap', function() {
    return it('Collects up pairs from the specified array', function() {
      var relationMap;
      relationMap = GroupApp.createRelationMap(keepApartPairs);
      expect(relationMap['Jo Bloggs'].has('Brian Berry')).toBeTruthy();
      expect(relationMap['Jo Bloggs'].length).toBeGreaterThan(0);
      return expect(relationMap['Brian Berry'].has('Jo Bloggs')).toBeTruthy();
    });
  });

  describe('possibleChoices', function() {
    it('chooses students that are not to be separated', function() {
      var choices, relationMap;
      relationMap = GroupApp.createRelationMap(keepApartPairs);
      choices = GroupApp.possibleChoices(students, group, relationMap);
      return expect(choices.length).toBeGreaterThan(0);
    });
    return it('returns an empty array if there are no possible choices', function() {
      var choices, relationMap;
      relationMap = GroupApp.createRelationMap([['A', 'B'], ['A', 'C']]);
      choices = GroupApp.possibleChoices(['A'], ['B', 'B'], relationMap);
      return expect(choices.length).toEqual(0);
    });
  });

  describe('groupInto', function() {
    return it('returns the specified number of groups', function() {
      var groups;
      groups = GroupApp.groupInto(4, students, keepApartPairs);
      expect(groups.length).toEqual(4);
      return expect(groups[0].length).toEqual(2);
    });
  });

}).call(this);
