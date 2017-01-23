(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.dishes = "";
  $scope.splitDishes = [] ;
  $scope.myErrorMessage = "" ;
  $scope.myMessage = "" ;

  $scope.checkIfTooMuch = function () {
     /* button clicked with any entry */
     if($scope.dishes == 0){
         $scope.myErrorMessage = "Please enter data first" ;
         $scope.myMessage = "" ;
         $scope.myBorder = "redBorder"
         return;
      }

     /* replace commas with whitespace, remove white space from beginning of line, remove white spaces from end of line, replace any sequence of white space with a comma, finally split on command -- replaces from stackoverflow -- it works! */
      $scope.splitDishes = $scope.dishes.replace(/^,/,'').replace(/,/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '').replace(/[\s,]+/g, ',').split(',');

      /* if there are  commas or spaces and no dishes will get split of 1 with an empty string */
      if($scope.splitDishes[0] === ""){
         $scope.myErrorMessage = "Please enter data first" ;
         $scope.myMessage = "" ;
         $scope.myBorder = "redBorder"
         return;
      }
      if ($scope.splitDishes.length <= 3){
         $scope.myErrorMessage = "" ;
         $scope.myMessage = "Enjoy!" ;
         $scope.myBorder = "greenBorder"
      }else{
         $scope.myErrorMessage = "" ;
         $scope.myMessage = "Too much!" ;
         $scope.myBorder = "greenBorder"
      }
  };
}

})();
