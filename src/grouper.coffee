Array::copy ?= ()-> @slice()
Array::remove ?= (item)-> @splice(@indexOf(item),1); @
Array::has ?= (item)-> @indexOf(item) != -1
Array::intersection ?= (other)->
  if other?
    item for item in other when @has(item)
  else
    []
Array::overlap ?= (other)-> @intersection(other)?.length > 0
Array::random ?= ()-> @[Math.floor(Math.random() * @length)]
Array::add ?= (item)-> @push(item) if not @has(item)

# Create a mapping to help look up pairs
createRelationMap = (pairs)->
  map = {}
  for pair in pairs
    (map[pair[0]] ?= []).add(pair[1])
    (map[pair[1]] ?= []).add(pair[0])
  return map

# Calculate the possible choices of students for this group from those left
possibleChoices = (students, group, keepApartFrom)->
  choices = []
  for student in students
    studentsToKeepApart = keepApartFrom[student]
    if not group.overlap(studentsToKeepApart)
      choices.add(student)
  choices


# Group the set of students into numGroups groups,
# ensuring that no students that are to be keepApartd are in the same group
groupInto = (numGroups, studentsList, keepApartPairs = [])->

  # Create the mapping for the pairs of students to keep keepApartd
  keepApartFrom = createRelationMap(keepApartPairs)

  # Create the empty groups
  groups = []
  for i in [0...numGroups]
    groups[i] = []

  # Make a copy of the set of students
  students = studentsList.copy()

  # Loop through the groups, adding students to each until we run out of students
  groupIndex = 0
  while students.length > 0

    # Get the group to add a student
    group = groups[groupIndex]

    # Randomly choose a student who is not to be kept separate from those already in the group
    chooseFrom = possibleChoices(students, group, keepApartFrom)

    # Give up if no students can go in this group
    if chooseFrom.length == 0
      return null

    student = chooseFrom.random()
    
    # Move student into group
    group.add(student)
    students.remove(student)

    # Index of the next group
    groupIndex = (groupIndex+1) % numGroups

  console.dir groups
  return groups


groupBy = (groupSize, students, keepApartPairs)->
    groupInto(students.length / groupSize, students, keepApartPairs)

this.GroupApp = 
  groupBy: groupBy
  groupInto: groupInto
  createRelationMap: createRelationMap
  possibleChoices: possibleChoices