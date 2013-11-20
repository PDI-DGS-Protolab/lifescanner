var liveScannerDev = angular.module('liveScannerDev', ['liveScannerApp', 'ngMockE2E']);

liveScannerDev.run(function ($httpBackend) {
  //Returns a mock JSON
  $httpBackend.whenGET('/programs').respond(getData());
  //$httpBackend.whenGET('/programs').passThrough();
  //
  $httpBackend.whenPOST().respond(200, 1);
});
