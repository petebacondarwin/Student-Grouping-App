this.StudentListCtrl = ($scope)->

  $scope.deleteStudent = (student)->
    $scope.students.remove(student)

  $scope.addStudent = ()->
    $scope.students.push(name:'')

  $scope.formsAreInvalid = ()->
    console.log $scope.keepApartForm.$invalid
    $scope.studentListForm.$invalid

  $scope.groupStudents = (students, numGroups, keepApartPairs)->
    studentNames = (student.name for student in students)
    keepApartPairs = ([pair[0].name, pair[1].name] for pair in keepApartPairs)

    attemptsLeft = 100
    $scope.groups = null
    until $scope.groups? or attemptsLeft == 0
      $scope.groups = (student for student in $scope.students
        when student.name == groupedStudent for groupStudent in GroupApp.groupInto(numGroups, studentNames, keepApartPairs)
      )
      attemptsLeft -= 1
    console.log "Attempts: #{100-attemptsLeft}"

  $scope.showGroups = ()->
    if $scope.groups?
      if $scope.groups.length > 0
        'Groups Found'
      else
        'Empty' 
    else
      'Not Possible'

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
  $scope.studentUniqueSet = {}
  $scope.students = ( name: val for val in ['A','B','C','D','E','F','G','H'])
  $scope.numGroups = 3
  $scope.groups = []
  $scope.keepApartPairs = []
