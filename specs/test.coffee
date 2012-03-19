  g = students = group = keepApartPairs = null

  beforeEach ->
    students = ['Jo Bloggs','Annie Other','Brian Berry','Peter Problem','Jake Rake','Mark Blackboard','Jeremy Strong','Ella Rose']
    group = ['Jo Bloggs', 'Annie Other']
    keepApartPairs = [
      ['Jo Bloggs','Brian Berry']
      ['Annie Other','Ella Rose']
    ]

  describe 'Array', ->
    describe 'add', ->
      it 'adds a new item into the array', ->
        a = []
        a.add('a')
        expect(a.length).toEqual(1)

    describe 'overlap', ->
      group1 = group2 = group3 = group4 = null
      beforeEach ->
        group1 = ['A', 'B', 'C']
        group2 = ['B', 'D']
        group3 = ['D', 'E']
        group4 = []

      it 'returns true if the two groups have common elements', ->
        expect(group1.overlap(group1)).toBeTruthy()
        expect(group1.overlap(group2)).toBeTruthy()
        expect(group2.overlap(group3)).toBeTruthy()
      it 'returns false if the two groups do not have common elements', ->
        expect(group1.overlap(group3)).toBeFalsy()
        expect(group1.overlap(group4)).toBeFalsy()
      it 'returns false if the first group is empty', ->
        expect(group4.overlap(group1)).toBeFalsy()

    describe 'random', ->
      it 'returns a random element from the group', ->
        group1 = ['A', 'B', 'C', 'D', 'E']
        random = group1.random()
        expect(group1.has(random)).toBeTruthy()

  describe 'createRelationMap', ->
    it 'Collects up pairs from the specified array', ->
      relationMap = GroupApp.createRelationMap(keepApartPairs)
      expect(relationMap['Jo Bloggs'].has('Brian Berry')).toBeTruthy()
      expect(relationMap['Jo Bloggs'].length).toBeGreaterThan(0)
      expect(relationMap['Brian Berry'].has('Jo Bloggs')).toBeTruthy()

  describe 'possibleChoices', ->
      it 'chooses students that are not to be separated', ->
        relationMap = GroupApp.createRelationMap(keepApartPairs)
        choices = GroupApp.possibleChoices(students, group, relationMap)
        expect(choices.length).toBeGreaterThan(0)

      it 'returns an empty array if there are no possible choices', ->
        relationMap = GroupApp.createRelationMap([['A','B'],['A','C']])
        choices = GroupApp.possibleChoices(['A'], ['B','B'], relationMap)
        expect(choices.length).toEqual(0)

    describe 'groupInto', ->
      it 'returns the specified number of groups', ->
        groups = GroupApp.groupInto(4, students, keepApartPairs)
        expect(groups.length).toEqual(4)
        expect(groups[0].length).toEqual(2)
