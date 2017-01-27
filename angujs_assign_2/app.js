(function () {
   'use strict';

   angular.module('ShoppingListCheckOff', [])
   .controller('ToBuyController', ToBuyController)
   .controller('AlreadyBoughtController', AlreadyBoughtController)
   .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

   ToBuyController.$inject = ['ShoppingListCheckOffService'];
   function ToBuyController(ShoppingListCheckOffService) {
      var toBuyList = this;
      toBuyList.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

      toBuyList.removeItem = function (itemIndex) {
         try{
            ShoppingListCheckOffService.removeToBuyItem(itemIndex);
         }catch(error){
            toBuyList.errorMessage = error.message ;
         }
      }
   }

   AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
   function AlreadyBoughtController(ShoppingListCheckOffService) {
      var alreadyBought = this;
      alreadyBought.items = ShoppingListCheckOffService.getBoughtItems();
      alreadyBought.errorMessage = "Nothing bought yet."
   }


   function ShoppingListCheckOffService() {
     var service = this;

     // List of shopping items
     var toBuyItems = [{name: "bag cookies", quantity: 3},
                       {name: "bag chips",   quantity: 5},
                       {name: "cartons milk",  quantity: 2},
                       {name: "bottles Cola",  quantity: 4},
                       {name: "six pack beer",   quantity: 2},
                       {name: "bottles asprin",   quantity: 2},
                       {name: "packs hot dogs",   quantity: 2},
                       {name: "hot dog buns",  quantity: 16}];

     var boughtItems = [];

     service.addBoughtItem = function (item) {
       boughtItems.push(item);
        AlreadyBoughtController ;
     };

     service.removeToBuyItem = function (itemIndex) {
       var boughtItem = toBuyItems[itemIndex] ;
       toBuyItems.splice(itemIndex, 1);
       service.addBoughtItem(boughtItem);
       if (toBuyItems.length === 0){
          throw new Error("Everything is bought!") ;
       }
     };

     service.getToBuyItems = function () {
       return toBuyItems;
     };

     service.getBoughtItems = function () {
         return boughtItems;
     }
  }
})();
