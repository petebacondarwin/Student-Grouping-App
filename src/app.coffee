Array::copy ?= ()-> @slice()
Array::remove ?= (item)-> @splice(@indexOf(item),1); @

this.StudentListCtrl = ($scope)->
  $scope.deleteStudent = (student)->
    $scope.students.remove(student)

  $scope.addStudent = ()->
    $scope.students.push(name:'')

  $scope.groupStudents = (students, numGroups, keepApartPairs)->
    studentNames = (student.name for student in students)
    keepApartPairs = ([pair[0].name, pair[1].name] for pair in keepApartPairs)

    g = new GroupApp.Grouper()
    groups = g.groupInto(numGroups, studentNames, keepApartPairs)

    $scope.groups = (group.to_array() for group in groups)

  $scope.addKeepApartPair = ()->
    $scope.keepApartPairs.push([null,null])

  $scope.removePair = (pair)->
    $scope.keepApartPairs.remove(pair)

  $scope.otherStudents = (student, pairIndex)->
    students = $scope.students.copy()
    # We don't let them select the same student on both sides of the pair
    students.remove(student)
    for pair, i in $scope.keepApartPairs when i < pairIndex
      # We don't let them select a pair that has been selected already
      students.remove(pair[1]) if student == pair[0]
      students.remove(pair[0]) if student == pair[1]
    return students

  # Initialize the model
  $scope.students = ( name: val for val in ['A','B','C','D','E','F','G','H'])
  $scope.numGroups = 3
  $scope.groups = []
  $scope.keepApartPairs = []
