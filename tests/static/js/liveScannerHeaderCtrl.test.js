describe('HeaderCtrl', function () {

    var scope, 
        controller;
        beforeEach(function () {
        module('liveScannerApp');
    });

    describe('internal functions', function () {
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('HeaderCtrl', {
                '$scope': scope
            });
        }));

        it('should disable the button when there are less than 5 marked shows', function () {
            scope.data.markedShows = ['a', 'b', 'c', 'd'];
            scope.getProvisionarButtonStatus();
            scope.$digest();
            expect(scope.data.provisionarStyle).toBe('');
        });

        it('should activate the button when there are 5 marked shows', function () {
            scope.data.markedShows = ['a', 'b', 'c', 'd', 'e'];
            scope.getProvisionarButtonStatus();
            scope.$digest();
            expect(scope.data.provisionarStyle).toBe('validated');
        });
    });

    describe('when attempting fake HTTP connections for provisioning', function() {
        var $httpBackend, $rootScope, createController;

        beforeEach(inject(function($rootScope, $controller, $httpBackend) {
            scope = $rootScope.$new();
            httpBackend = $httpBackend;
            httpBackend.whenPOST("/suggestions/").respond(200, 1);
            controller = $controller('HeaderCtrl', {
                '$scope': scope,
                '$httpBackend' : httpBackend
            });


            // // Set up the mock http service responses
            // $httpBackend = $injector.get('$httpBackend');
            // // backend definition common for all tests
            // // $httpBackend.when('POST', '/suggestions/').respond(1);
            // // Get hold of a scope (i.e. the root scope)
            // $rootScope = $injector.get('$rootScope');
            // // The $controller service is used to create instances of controllers
            // var $controller = $injector.get('$controller');
            // createController = function() {
            //     return $controller('HeaderCtrl', {
            //         '$scope' : $rootScope
            //     });
            // };
        }));
        // afterEach(function() {
        //     $httpBackend.verifyNoOutstandingExpectation();
        //     $httpBackend.verifyNoOutstandingRequest();
        // });

        it("when there are 5 suggestions, there is a POST http call to /suggestions", inject(function ($httpBackend) {
            $httpBackend.expectPOST('/suggestions/').respond(200, 1);
            scope.data.markedShows = ['a', 'b', 'c', 'd', 'e'];
            // we don't want pop-ups at the test suite
            spyOn(window, 'alert').andCallFake(function() {  
                return 1;  
            });
            scope.provisionar();
            $httpBackend.flush();
        }));

        it("when there are more than 10 suggestions, there is not a POST http call to /suggestions", inject(function ($httpBackend) {
            var alert_msg = "default";
            spyOn(window, 'alert').andCallFake(function(msg) {  
               alert_msg = msg;  
            });
            scope.data.markedShows = ['s', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's'];
            scope.provisionar();
            expect(alert_msg).not.toEqual("default");
        }));
    });

    describe('when attempting real HTTP connections for provisioning', function() {
        var $httpBackend, $rootScope, createController;

        beforeEach(inject(function($rootScope, $controller, $httpBackend) {
            scope = $rootScope.$new();
            httpBackend = $httpBackend;
            controller = $controller('HeaderCtrl', {
                '$scope': scope,
                '$httpBackend' : httpBackend
            });
        }));

        // Ignored for now as we can't have the actual shows since we haven't tested it yet
        // When we can define this test, it should change the suggestions but then proceed
        // to set the suggestions to what they were before being called
        xit("when there are 5 correct suggestions, the server responds that 5 suggestions were updated", inject(function ($httpBackend) {
            spyOn(window, 'alert').andCallFake(function(msg) {  
                return 1;  
            });
            scope.data.markedShows = ['s', 's', 's', 's', 's'];
            scope.provisionar();
            $httpBackend.flush();
            expect(http.data.suggestionsUpdated).toEqual(5);
        }));
    });
});