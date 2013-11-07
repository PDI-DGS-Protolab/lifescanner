describe('GenericListCtrl', function () {

    var scope, controller;
    beforeEach(function () {
        module('liveScannerApp');
    });


    describe(' when attempting fake HTTP connections for getting the source API content', function() {
        
        var $httpBackend, $rootScope, createController,$controller;

        beforeEach(inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');

            //TODO : check if it can be replaced with getting 
            //the JSON data directly from the file
            $httpBackend.whenGET("/programs").respond(getData());

            $rootScope = $injector.get('$rootScope');   
            $controller = $injector.get('$controller');

            createController = function() {
            return $controller('GenericListCtrl', {
                '$scope' : $rootScope 
            });
            };

        }));

        it("should perform GET http call to /programs", inject(function ($httpBackend) {
            $httpBackend.expectGET('/programs');
            var controller = createController();
            $httpBackend.flush();
            expect($rootScope.data.showsPropertiesOfInterest[0].title).not.toEqual("");
            //console.log($rootScope.data.showsPropertiesOfInterest);
        }));


        it('SelectCtrl: correct deleting from unselected list', function () {

            $httpBackend.expectGET('/programs');
            var controller = createController();
            $httpBackend.flush();
            var scope=$rootScope;

            //scope.data.showsPropertiesOfInterest = new ShowsArray(['a', 'b']);
            expect(scope.data.showsPropertiesOfInterest.length).toBe(3);
            scope.select(scope.data.showsPropertiesOfInterest[0]);
            scope.$digest();

            console.log(scope.data.showsPropertiesOfInterest.length);
            console.log(scope.data.markedShows);
            expect(scope.data.showsPropertiesOfInterest.length).toBe(2);
            expect(scope.data.showsPropertiesOfInterest[0].title).toEqual("LegiÃ£o Estrangeira");
            scope.select(scope.data.showsPropertiesOfInterest[1]);
            scope.$digest();
            expect(scope.data.showsPropertiesOfInterest.length).toBe(1);
        });


        //TODO : add get reference as in the function above
        xit('SelectCtrl: correct move from unselected list to selected list', function () {
            // $httpBackend.expectGET('/programs');
            // var controller = createController();
            // $httpBackend.flush();
            // var scope=$rootScope;

            scope.data.markedShows = new ShowsArray(['d']);
            scope.data.showsPropertiesOfInterest = new ShowsArray(['a','b','c']);
            var temp=scope.data.showsPropertiesOfInterest[0];
            scope.select(scope.data.showsPropertiesOfInterest[0]);

            scope.$digest();
            expect(scope.data.showsPropertiesOfInterest.length).toBe(2);

            expect(scope.data.markedShows.length).toBe(2);

            expect(scope.data.markedShows[1]).toBe(temp);
        });

        //TODO : add get reference...
        xit('SelectCtrl: checkboxState equals to false', function () {
            scope.data.showsPropertiesOfInterest = new ShowsArray([{"id":0,ceckboxState:true},{"id":1,ceckboxState:true}]);
            scope.select(scope.data.showsPropertiesOfInterest[0]);
            scope.$digest();
            expect(scope.data.markedShows[0].checkboxState).toBe(false);
        });
        
    });


//TODO : join with GET request
xdescribe('unSelectCtrl', function () {
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

xdescribe('toggleCheckboxCtrl', function () {
        
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

//TODO : connection with real server - retriving the real JSON content


//Temporary JSON data
function getData(){
  return [ {
  "id" : 15068,
  "title" : "Encontro com Deus na Madrugada",
  "description" : "Nas madrugadas a programaÃ§Ã£o da Rede Gospel traz os melhores programas da semana. O que vocÃª nÃ£o pode ver durante o dia, vocÃª confere atÃ© o amanhecer no Encontro com Deus na Madrugada.",
  "start" : 1380684600000,
  "end" : 1380704400000,
  "duration" : 330,
  "channel" : {
    "name" : "Rede Gospel",
    "abbrev" : "GOS",
    "logo" : "http://img.tvstar.com.br/channel/GOS.jpg",
    "fibraLineup" : "21"
  },
  "content" : {
    "idShow" : 3987,
    "title" : "Encontro com Deus na Madrugada",
    "description" : "Nas madrugadas a programaÃ§Ã£o da Rede Gospel traz os melhores programas da semana. O que vocÃª nÃ£o pode ver durante o dia, vocÃª confere atÃ© o amanhecer no Encontro com Deus na Madrugada.",
    "slug" : "encontro-com-deus-na-madrugada",
    "type" : "Variedades",
    "genre" : "ReligiÃ£o",
    "rating" : "Programa livre para todas as idades",
    "images" : [ {
      "id" : 1390,
      "url" : "http://2",
      "width" : 0,
      "height" : 0
    } ],
    "synopsis" : [ ]
  }
}, {
  "id" : 15279,
  "title" : "SessÃ£o PlenÃ¡ria",
  "description" : "A atividade legislativa do Senado Federal se dÃ¡ principalmente por meio de reuniÃµes das comissÃµes e sessÃµes plenÃ¡rias. Para saber mais: www.senado.gov.br/tv",
  "start" : 1380682800000,
  "end" : 1380709800000,
  "duration" : 450,
  "channel" : {
    "name" : "TV Senado",
    "abbrev" : "SEN",
    "logo" : "http://img.tvstar.com.br/channel/SEN.jpg",
    "fibraLineup" : "183"
  },
  "content" : {
    "idShow" : 1254,
    "title" : "SessÃ£o PlenÃ¡ria",
    "description" : "A atividade legislativa do Senado Federal se dÃ¡ principalmente por meio de reuniÃµes das comissÃµes e sessÃµes plenÃ¡rias. Para saber mais: www.senado.gov.br/tv",
    "slug" : "sessao-plenaria",
    "type" : "Jornalismo",
    "genre" : "PolÃ¬tico",
    "rating" : "Programa livre para todas as idades",
    "images" : [ {
      "id" : 1030,
      "url" : "http://5",
      "width" : 0,
      "height" : 0
    } ],
    "synopsis" : [ {
      "id" : 2510,
      "text" : "",
      "created" : 1380664800000
    } ]
  }
}, {
  "id" : 15381,
  "title" : "LegiÃ£o Estrangeira",
  "description" : "A participaÃ§Ã£o do PaÃ¬s em temas mundiais e os fatos do cenÃ¡rio nacional sÃ£o comentados na atraÃ§Ã£o comandada pela jornalista MÃ´nica Teixeira num debate com correspondentes internacionais.",
  "start" : 1380690000000,
  "end" : 1380702600000,
  "duration" : 210,
  "channel" : {
    "name" : "Cultura",
    "abbrev" : "CUL",
    "logo" : "http://img.tvstar.com.br/channel/CUL.jpg",
    "fibraLineup" : "2"
  },
  "content" : {
    "idShow" : 2327,
    "title" : "LegiÃ£o Estrangeira",
    "description" : "A participaÃ§Ã£o do PaÃ¬s em temas mundiais e os fatos do cenÃ¡rio nacional sÃ£o comentados na atraÃ§Ã£o comandada pela jornalista MÃ´nica Teixeira num debate com correspondentes internacionais.",
    "slug" : "legiao-estrangeira",
    "type" : "Jornalismo",
    "genre" : "Informativo",
    "rating" : "Programa livre para todas as idades",
    "images" : [ {
      "id" : 5205,
      "url" : "http://5",
      "width" : 0,
      "height" : 0
    } ],
    "synopsis" : [ ]
  }
} ]

}