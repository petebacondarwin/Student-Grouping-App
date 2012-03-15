class Set    
  constructor: (elems = []) ->
    @hash = {}
    for elem in elems
      @hash[elem] = true
 
  add: (elem) ->
    @hash[elem] = true
 
  remove: (elem) ->
    delete @hash[elem]
 
  has: (elem) ->
    @hash[elem]?
 
  union: (set2) ->
    set = new Set()
    for elem of @hash
      set.add elem
    for elem in set2.to_array()
      set.add elem
    set
 
  intersection: (set2) ->
    set = new Set()
    for elem of @hash
      set.add elem if set2.has elem
    set

  shareElements: (set2) ->
    for elem of @hash
      return true if set2.has elem
    false
  minus: (set2) ->
    set = new Set()
    for elem of @hash
      set.add elem if !set2.has elem
    set
 
  is_subset_of: (set2) ->
    for elem of @hash
      return false if !set2.has elem
    true
 
  equals: (set2) ->
    this.is_subset_of(set2) and set2.is_subset_of this
 
  to_array: ->
    (elem for elem of @hash)
 
  each: (f) ->
    for elem of @hash
      f(elem)
 
  to_string: ->
    @to_array()

  size: ->
   @to_array().length

  random: ->
    array = @to_array()
    array[Math.floor(Math.random() * array.length)]

  copy: ->
    new Set(@to_array())

  empty: ->
    @size() == 0



class Relations
    constructor: (pairs)->
      # Generate the internal mapping from the pairs
      @map = {}
      for pair in pairs
        (@map[pair[0]] ?= new Set()).add(pair[1])
        (@map[pair[1]] ?= new Set()).add(pair[0])

    relations: (a)->
      @map[a] ? new Set()

    areRelated: (a,b)->
      @map[a]?.has(b) ? false


class Grouper
  constructor: ()->

  groupBy: (size, students, separatePairs)->
    @groupInto(@students.size() / size, students, separatePairs)

  # Group the set of students into numGroups groups,
  # ensuring that no students that are to be separated are in the same group
  groupInto: (numGroups, studentsList, separatePairs = [])->

    # Create the mapping for the pairs of students to keep separated
    separate = new Relations(separatePairs)

    # Create the empty groups
    groups = (new Set() for i in [1..numGroups])

    # Make a copy of the set of students
    students = new Set(studentsList)

    # Loop through the groups, adding students to each until we run out of students
    groupIndex = 0
    while not students.empty()

      # Get the group to add a student
      group = groups[groupIndex]

      # Randomly choose a student who is not to be kept separate from those already in the group
      chooseFrom = @possibleChoices(students, group, separate)
      student = chooseFrom.random()
      
      # Move student into group
      group.add(student)
      students.remove(student)

      # Index of the next group
      groupIndex = (groupIndex+1) % numGroups

    groups

  # Calculate the possible choices of students for this group from those left
  possibleChoices: (students, group, separate)->
    choices = new Set()
    for student in students.to_array()
      separateFromStudent = separate.relations(student)
      if not group.shareElements(separateFromStudent)
        choices.add(student)
    choices

this.GroupApp = 
    Set: Set
    Relations: Relations
    Grouper: Grouper