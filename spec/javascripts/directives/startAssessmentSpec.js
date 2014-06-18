// describe('Directive: startAssessment', function() {
//   var today = new Date();
//   var scope, element, compile, timeout;
//   var user = {role: "facilitator"}
//   var rubric = {id: 1}
//   beforeEach(module('PDRClient'));

//   beforeEach(inject(function($rootScope, $compile, $timeout, $q) {
//     scope   = $rootScope.$new();
//     element = angular.element('<start-assessment></start-assessment>');
//     timeout = $timeout;
//     q = $q;
//     $compile(element)(scope);
//     // Line 19 in startAssessment.js//////
//     scope.$digest();
//     scope = scope.$$childHead;


//     function submitForm() {
//       var nameInput = element.find('input').first().val('New Assessment');
//       var dueDateInput = element.find('#due-date').val(today);
//       var rubricInput = element.find('#rubric').val('PD Readiness Rubric v3.0');
//       var button = element.find('input:submit').click
//     };

//   }));

//   it('fill out new Assessment form', function() {
//     scope.rubric = rubric
//     scope.create()

//   });

// });
