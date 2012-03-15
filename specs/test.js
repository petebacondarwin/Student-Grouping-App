(function() {
  var g, group, keepApart, students;

  g = students = group = keepApart = null;

  beforeEach(function() {
    students = ['Jo Bloggs', 'Annie Other', 'Brian Berry', 'Peter Problem', 'Jake Rake', 'Mark Blackboard', 'Jeremy Strong', 'Ella Rose'];
    group = new GroupApp.Set(['Jo Bloggs', 'Annie Other']);
    return keepApart = [['Jo Bloggs', 'Brian Berry'], ['Annie Other', 'Ella Rose']];
  });

  describe('Set.shareElements', function() {
    var set1, set2, set3, set4;
    set1 = set2 = set3 = set4 = null;
    beforeEach(function() {
      set1 = new GroupApp.Set(['A', 'B', 'C']);
      set2 = new GroupApp.Set(['B', 'D']);
      set3 = new GroupApp.Set(['D', 'E']);
      return set4 = new GroupApp.Set([]);
    });
    it('returns true if the two sets have common elements', function() {
      expect(set1.shareElements(set1)).toBeTruthy();
      expect(set1.shareElements(set2)).toBeTruthy();
      return expect(set2.shareElements(set3)).toBeTruthy();
    });
    it('returns false if the two sets do not have common elements', function() {
      expect(set1.shareElements(set3)).toBeFalsy();
      return expect(set1.shareElements(set4)).toBeFalsy();
    });
    return it('returns false if the first set is empty', function() {
      return expect(set4.shareElements(set1)).toBeFalsy();
    });
  });

  describe('Set.random', function() {
    return it('returns a random element from the set', function() {
      var random, set1;
      set1 = new GroupApp.Set(['A', 'B', 'C', 'D', 'E']);
      random = set1.random();
      console.log(random);
      return expect(set1.has(random)).toBeTruthy();
    });
  });

  describe('Relations.relations', function() {
    return it('Collects up pairs from the specified array', function() {
      var r;
      r = new GroupApp.Relations(keepApart);
      expect(r.areRelated('Jo Bloggs', 'Brian Berry')).toBeTruthy();
      expect(r.relations('Jo Bloggs').size()).toBeGreaterThan(0);
      return expect(r.relations('Jo Bloggs').has('Brian Berry')).toBeTruthy();
    });
  });

  describe('Grouper.possibleChoices', function() {
    return it('chooses students that are not to be separated', function() {
      var r;
      g = new GroupApp.Grouper();
      r = new GroupApp.Relations(keepApart);
      return expect(g.possibleChoices(new GroupApp.Set(students), group, r).empty()).toBeFalsy();
    });
  });

  describe('groupInto', function() {
    return it('returns the specified number of groups', function() {
      var subGroups;
      g = new GroupApp.Grouper();
      subGroups = g.groupInto(4, students, keepApart);
      expect(subGroups.length).toEqual(4);
      expect(subGroups[0].size()).toEqual(2);
      return console.dir(subGroups);
    });
  });

}).call(this);
