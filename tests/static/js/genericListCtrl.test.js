describe('GenericListCtrl', function () {

  var scope, controller;
  beforeEach(function () {
    module('liveScannerApp');
  });

  var $httpBackend, $rootScope, $controller, createController;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');   
    $controller = $injector.get('$controller');
    $httpBackend = $injector.get('$httpBackend');
    createController = function() {
      return $controller('GenericListCtrl', {
        '$scope' : $rootScope
      });
    };
  }));

  describe('When attempting fake HTTP connections for getting the source API content', function() {

    beforeEach(inject(function($injector) {
      $httpBackend.whenGET("/programs").respond(getData());
    }));

    it("should perform GET http call to /programs and retrieve a correct result", function () {
      $httpBackend.expectGET('/programs');
      var controller = createController();
      $httpBackend.flush();
      expect($rootScope.data.showsPropertiesOfInterest[0].title).toEqual("Encontro com Deus na Madrugada");
    });

    describe('SelectCtrl', function() {

      it('Selecting a show from showsPropertiesOfInterest list, it should disapear from this list', function () {
        httpBackend.expectGET('/programs');
        var controller = createController();
        $httpBackend.flush();
        var scope=$rootScope;
        expect(scope.data.showsPropertiesOfInterest.length).toBe(3);
        scope.select(scope.data.showsPropertiesOfInterest[0]);
        scope.$digest();
        expect(scope.data.showsPropertiesOfInterest.length).toBe(2);
        expect(scope.data.showsPropertiesOfInterest[0].title).toEqual("LegiÃ£o Estrangeira");
        scope.select(scope.data.showsPropertiesOfInterest[1]);
        scope.$digest();
        expect(scope.data.showsPropertiesOfInterest.length).toBe(1);
      });

      it('Selecting a show from showsPropertiesOfInterest list, it should be in the last position of markedShows list', function () {
        $httpBackend.expectGET('/programs');
        var controller = createController();
        $httpBackend.flush();
        var scope=$rootScope;

        var temp=scope.data.showsPropertiesOfInterest[0];
        scope.select(scope.data.showsPropertiesOfInterest[0]);

        scope.$digest();
        expect(scope.data.showsPropertiesOfInterest.length).toBe(2);

        expect(scope.data.markedShows.length).toBe(1);

        expect(scope.data.markedShows[0]).toBe(temp);
      });

      it('Selecting a show from showsPropertiesOfInterest list, it should have checkbox property equal to false', function () {
        $httpBackend.expectGET('/programs');
        var controller = createController();
        $httpBackend.flush();
        var scope=$rootScope;
        scope.select(scope.data.showsPropertiesOfInterest[0]);
        scope.$digest();
        expect(scope.data.markedShows[0].checkboxState).toBe(false);
      });        
    });

    describe('unSelectCtrl', function () {

      it('Unselecting a show from markedShows list, it should disapear from this list', function () {
        $httpBackend.expectGET('/programs');
        var controller = createController();
        $httpBackend.flush();
        var scope=$rootScope;

        var foo = scope.data.showsPropertiesOfInterest[1];

        scope.select(scope.data.showsPropertiesOfInterest[0]);
        scope.$digest();
        scope.select(scope.data.showsPropertiesOfInterest[0]);
        scope.$digest();
        scope.select(scope.data.showsPropertiesOfInterest[0]);
        scope.$digest();

        scope.unSelect(scope.data.markedShows[0]);
        scope.$digest();
        expect(scope.data.markedShows.length).toBe(2);
        expect(scope.data.markedShows[0]).toBe(foo);

        scope.unSelect(scope.data.markedShows[0]);
        scope.$digest();
        expect(scope.data.markedShows.length).toBe(1);

        scope.unSelect(scope.data.markedShows[0]);
        scope.$digest();
        expect(scope.data.markedShows.length).toBe(0);   
      });

      it('Unselecting a show from markedShows list, it should increment by 1 showsPropertiesOfInterest length', function () {
        $httpBackend.expectGET('/programs');
        var controller = createController();
        $httpBackend.flush();
        var scope=$rootScope;
        scope.select(scope.data.showsPropertiesOfInterest[0]);
        scope.$digest();
        scope.select(scope.data.showsPropertiesOfInterest[0]);
        scope.$digest();
        scope.select(scope.data.showsPropertiesOfInterest[0]);
        scope.$digest();

        var temp=scope.data.markedShows[2];

        scope.unSelect(scope.data.markedShows[2]);

        scope.$digest();
        expect(scope.data.markedShows.length).toBe(2);

        expect(scope.data.showsPropertiesOfInterest.length).toBe(1);

        expect(scope.data.showsPropertiesOfInterest[0]).toBe(temp);
      });

      it('Unselecting a show from markedShows list, it should be in showsPropertiesOfInterest list ordered by title', function () {
        $httpBackend.expectGET('/programs');
        var controller = createController();
        $httpBackend.flush();
        var scope=$rootScope;

        var e1 = scope.data.showsPropertiesOfInterest[0];
        var e2 = scope.data.showsPropertiesOfInterest[1];
        var e3 = scope.data.showsPropertiesOfInterest[2];
        scope.select(e1);
        scope.select(e2);
        scope.select(e3);
        scope.$digest();

        scope.unSelect(e3);
        scope.$digest();
        expect(scope.data.showsPropertiesOfInterest[0].title).toBe(e3.title);

        scope.unSelect(e1);
        scope.$digest();
        expect(scope.data.showsPropertiesOfInterest[0].title).toBe(e1.title);
      });
    });

    describe('toggleCheckboxCtrl', function () {

      it('Correct change of property checkbox in a show', function () {
        $httpBackend.expectGET('/programs');
        var controller = createController();
        $httpBackend.flush();
        var scope=$rootScope;

        scope.toggleCheckbox(scope.data.showsPropertiesOfInterest[0]);
        scope.$digest();
        expect(scope.data.showsPropertiesOfInterest[0].checkboxState).toBe(true);

        scope.toggleCheckbox(scope.data.showsPropertiesOfInterest[0]);
        scope.$digest();
        expect(scope.data.showsPropertiesOfInterest[0].checkboxState).toBe(false);   
      });
    });
  });
});


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
