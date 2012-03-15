  g = students = group = keepApart = null

  beforeEach ->
    students = ['Jo Bloggs','Annie Other','Brian Berry','Peter Problem','Jake Rake','Mark Blackboard','Jeremy Strong','Ella Rose']
    group = new GroupApp.Set(['Jo Bloggs', 'Annie Other'])
    keepApart = [
      ['Jo Bloggs','Brian Berry']
      ['Annie Other','Ella Rose']
    ]

  describe 'Set.shareElements', ->
    set1 = set2 = set3 = set4 = null
    beforeEach ->
      set1 = new GroupApp.Set(['A', 'B', 'C'])
      set2 = new GroupApp.Set(['B', 'D'])
      set3 = new GroupApp.Set(['D', 'E'])
      set4 = new GroupApp.Set([])

    it 'returns true if the two sets have common elements', ->
      expect(set1.shareElements(set1)).toBeTruthy()
      expect(set1.shareElements(set2)).toBeTruthy()
      expect(set2.shareElements(set3)).toBeTruthy()
    it 'returns false if the two sets do not have common elements', ->
      expect(set1.shareElements(set3)).toBeFalsy()
      expect(set1.shareElements(set4)).toBeFalsy()
    it 'returns false if the first set is empty', ->
      expect(set4.shareElements(set1)).toBeFalsy()

  describe 'Set.random', ->
    it 'returns a random element from the set', ->
      set1 = new GroupApp.Set(['A', 'B', 'C', 'D', 'E'])
      random = set1.random()
      console.log random
      expect(set1.has(random)).toBeTruthy()

  describe 'Relations.relations', ->
    it 'Collects up pairs from the specified array', ->
      r = new GroupApp.Relations(keepApart)
      expect(r.areRelated('Jo Bloggs', 'Brian Berry')).toBeTruthy()
      expect(r.relations('Jo Bloggs').size()).toBeGreaterThan(0)
      expect(r.relations('Jo Bloggs').has('Brian Berry')).toBeTruthy()

  describe 'Grouper.possibleChoices', ->
      it 'chooses students that are not to be separated', ->
        g = new GroupApp.Grouper()
        r = new GroupApp.Relations(keepApart)
        expect(g.possibleChoices(new GroupApp.Set(students), group, r).empty()).toBeFalsy()

    describe 'groupInto', ->
      it 'returns the specified number of groups', ->
        g = new GroupApp.Grouper()
        subGroups = g.groupInto(4, students, keepApart)
        expect(subGroups.length).toEqual(4)
        expect(subGroups[0].size()).toEqual(2)
        console.dir subGroups
#
#    describe 'groupBy', ->
#      it 'returns the number of groups that would take the specified number students', ->
#        g = new GroupApp.Grouper()
