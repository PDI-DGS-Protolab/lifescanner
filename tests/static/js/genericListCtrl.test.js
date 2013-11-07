describe('GenericListCtrl', function () {

    var scope, controller;
    beforeEach(function () {
        module('liveScannerApp');
    });

    describe('SelectCtrl', function () {
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('GenericListCtrl', {
                '$scope': scope
            });
        }));

        it('Correct deleting from unselected list', function () {
            scope.data.showsPropertiesOfInterest = new ShowsArray(['a', 'b']);
            scope.select(scope.data.showsPropertiesOfInterest[1]);
            scope.$digest();
            expect(scope.data.showsPropertiesOfInterest.length).toBe(1);
            expect(scope.data.showsPropertiesOfInterest[0]).toBe('a');
            scope.select(scope.data.showsPropertiesOfInterest[0]);
            scope.$digest();
            expect(scope.data.showsPropertiesOfInterest.length).toBe(0);
        });

        it('Correct move from unselected list to selected list', function () {
            scope.data.markedShows = new ShowsArray(['d']);
            scope.data.showsPropertiesOfInterest = new ShowsArray(['a','b','c']);
            var temp=scope.data.showsPropertiesOfInterest[0];
            scope.select(scope.data.showsPropertiesOfInterest[0]);

            scope.$digest();
            expect(scope.data.showsPropertiesOfInterest.length).toBe(2);

            expect(scope.data.markedShows.length).toBe(2);

            expect(scope.data.markedShows[1]).toBe(temp);
        });

        it('CheckboxState equals to false', function () {
            scope.data.showsPropertiesOfInterest = new ShowsArray([{"id":0,ceckboxState:true},{"id":1,ceckboxState:true}]);
            scope.select(scope.data.showsPropertiesOfInterest[0]);
            scope.$digest();
            expect(scope.data.markedShows[0].checkboxState).toBe(false);
        });

    });

describe('unSelectCtrl', function () {
        var arr;
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('GenericListCtrl', {
                '$scope': scope
            });
            arr = new ShowsArray([
                {id: 1234, title: 'element1', channel: {logo: null}, description: ""}, 
                {id: 2640, title: 'element2', channel: {logo: null}, description: ""},
                {id: 3000, title: 'ELEMENT3', channel: {logo: null}, description: ""}
            ]);
        }));

        it('Correct deleting from selected list', function () {
            scope.data.markedShows = arr;
            scope.unSelect(scope.data.markedShows[0]);
            scope.$digest();
            expect(scope.data.markedShows.length).toBe(2);
            expect(scope.data.markedShows[0].title).toBe("element2");

            scope.unSelect(scope.data.markedShows[0]);
            scope.$digest();
            expect(scope.data.markedShows.length).toBe(1);

            scope.unSelect(scope.data.markedShows[0]);
            scope.$digest();
            expect(scope.data.markedShows.length).toBe(0);

            
        });

        it('Correct move from selected list to unselected list', function () {
            scope.data.markedShows = arr;
            var temp=scope.data.markedShows[2];

            scope.unSelect(scope.data.markedShows[2]);

            scope.$digest();
            expect(scope.data.markedShows.length).toBe(2);

            expect(scope.data.showsPropertiesOfInterest.length).toBe(1);

            expect(scope.data.showsPropertiesOfInterest[0]).toBe(temp);
        });

        it('Correct ordered insert in unselected list', function () {
            scope.data.showsPropertiesOfInterest = arr;
            scope.data.markedShows = new ShowsArray([
                {id: 1234, title: 'element0', channel: {logo: null}, description: ""},
                {id: 1234, title: 'element4', channel: {logo: null}, description: ""}]);
            scope.unSelect(scope.data.markedShows[0]);
            scope.$digest();
            expect(scope.data.showsPropertiesOfInterest[0].title).toBe("element0");

            scope.unSelect(scope.data.markedShows[0]);
            scope.$digest();
            expect(scope.data.showsPropertiesOfInterest[4].title).toBe("element4");
        });

    });

describe('toggleCheckboxCtrl', function () {
        
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('GenericListCtrl', {
                '$scope': scope
            });
        }));

        it('Correct change of checkboxState', function () {
            scope.data.markedShows = new ShowsArray([
                {id: 1234, title: 'element0', checkboxState: true, channel: {logo: null}, description: ""}]);
            scope.toggleCheckbox(scope.data.markedShows[0]);
            scope.$digest();
            expect(scope.data.markedShows[0].checkboxState).toBe(false);

            scope.toggleCheckbox(scope.data.markedShows[0]);
            scope.$digest();
            expect(scope.data.markedShows[0].checkboxState).toBe(true);

            
        });

        

    });
});