this.StudentListCtrl = ($scope)->
  $scope.deleteStudent = (studentToDelete)->
    students = $scope.students
    for student in students when student == studentToDelete
      students.splice(i, 1)
      return

  $scope.addStudent = ()->
    $scope.students.push(name:'')

  $scope.groupStudents = (students, numGroups)->
    g = new GroupApp.Grouper()
    studentNames = (student.name for student in students)
    groups = g.groupInto(numGroups, studentNames)
    $scope.groups = (group.to_array() for group in groups)

  $scope.students = ( name: val for val in ['A','B','C','D','E','F','G','H'])
  $scope.numGroups = 3
  $scope.groups = []
