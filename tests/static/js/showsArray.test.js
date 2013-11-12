'use strict';
describe("ShowsArray", function () {
  describe("getShowsIdTitleLogoDescription", function () {

    var showsArray;

    it('With an empty ShowsArray it should return 0 elements ShowsArray', function () {
      showsArray= new ShowsArray("");
      expect(showsArray.getShowsIdTitleLogoDescription()).not.toContain(" ");
      expect(showsArray.getShowsIdTitleLogoDescription().length).not.toBeGreaterThan(0);

      showsArray= new ShowsArray();
      expect(showsArray.getShowsIdTitleLogoDescription()).not.toContain(" ");
      expect(showsArray.getShowsIdTitleLogoDescription().length).not.toBeGreaterThan(0);
    });

    it('Having 2 shows, it returns them in the same order, with the same length and it doesn\'t select the checkbox state', function () {
      showsArray= new ShowsArray([
        {id: 1234, title: 'element1', channel: {logo: null}, description: ""},
        {id: 1000, title: 'element2', channel: {logo: null}, description: ""}
      ]);
      expect(showsArray.getShowsIdTitleLogoDescription().length).toBe(showsArray.length);
      expect(showsArray.getShowsIdTitleLogoDescription().length).toBe(showsArray.length);
      for (var i = 0; i < showsArray.length; ++i) {
        expect(showsArray.getShowsIdTitleLogoDescription()[i].id).toBe(showsArray[i].id);
        expect(showsArray.getShowsIdTitleLogoDescription()[i].checkboxState).toBe(false);
      }
    });

    it('Change the empty descriptions for "Sem descrição disponível"', function () {
      showsArray= new ShowsArray([
        {id: 1234, title: 'element1', channel: {logo: null}, description: ""}
      ]);
      expect(showsArray.getShowsIdTitleLogoDescription().length).toBe(showsArray.length);
      expect(showsArray.getShowsIdTitleLogoDescription()[0].description).not.toBe(showsArray[0].description);
      expect(showsArray.getShowsIdTitleLogoDescription()[0].description).not.toBe("");
    });
  });
function filterByPropertyId(var1,var2){

    return var2["id"] === var1;
}
function allwaysFalse(var1,var2){

    return false;
}
describe("filterByPattern", function() {
    
    var showsArray;

    beforeEach(function () {
      showsArray= new ShowsArray([
        {id: 1234, title: 'element1', channel: {logo: null}, description: ""}, //0
        {id: 2640, title: 'element2', channel: {logo: null}, description: ""}, //1
        {id: 3000, title: 'ELEMENT3', channel: {logo: null}, description: ""}, //2
        {id: 4000, title: 'ELEmenT4', channel: {logo: null}, description: ""}, //3
        {id: 5000, title: 'E'       , channel: {logo: null}, description: ""}, //4
        {id: 5640, title: 'aaaaaaaa', channel: {logo: null}, description: ""}, //5
        {id: 6450, title: 'zzzzzzzz', channel: {logo: null}, description: ""}  //6
      ]);
    });

    it("Filtering an empty ShowsArray it should return 0 elements ShowsArray", function() {
        var arrayTest = new ShowsArray("");
        expect(arrayTest.filterByPattern(filterByPropertyId,1234)).toEqual([]);
        expect(arrayTest.filterByPattern(filterByPropertyId,1234).length).not.toBeGreaterThan(0);
    });

    it("When only one show is filtered it should return only 1 element ShowsArray", function() {
        expect(showsArray.filterByPattern(filterByPropertyId,5000)[0]).toEqual(showsArray[4]);
        expect(showsArray.filterByPattern(filterByPropertyId,5000).length).toBe(1);
    });
    
    it("When all the shows are filtered it should return 0 elements ShowsArray", function() {
        expect(showsArray.filterByPattern(allwaysFalse,6450)).toEqual([]);
        expect(showsArray.filterByPattern(allwaysFalse,6450).length).not.toBeGreaterThan(0);
    });    
  });

describe("SortByProperty", function() {
    
    var showsArray, sort_showsArray;

    beforeEach(function () {
      showsArray= new ShowsArray([
        {id: 1234, title: 'element1', channel: {logo: null}, description: ""}, 
        {id: 2640, title: 'element2', channel: {logo: null}, description: ""}, 
        {id: 3000, title: 'ELEMENT3', channel: {logo: null}, description: ""}, 
        {id: 4000, title: 'ELEmenT4', channel: {logo: null}, description: ""}, 
        {id: 5000, title: 'E'       , channel: {logo: null}, description: ""}, 
        {id: 5640, title: 'aaaaaaaa', channel: {logo: null}, description: ""}, 
        {id: 6450, title: 'zzzzzzzz', channel: {logo: null}, description: ""} 
      ]);
      sort_showsArray= new ShowsArray(showsArray);
      sort_showsArray.sortByProperty('title');
    });

    it("Sorted a ShowsArray it should have the same length that it have before sorting", function() {
      expect(sort_showsArray.length).toBe(showsArray.length);
    });

    it("Sorted ShowsArray should have the same elements, and in the same order that it have before sorting", function() {
      for (var e = 0; e < showsArray.length; ++e) {
        expect(sort_showsArray).toContain(showsArray[e]);
      }
    });
       
    it("Checking if the function has sorted correctly by checking title", function() {
      expect(sort_showsArray[0].title).toBe(showsArray[5].title);
      expect(sort_showsArray[6].title).toBe(showsArray[6].title);
      expect(sort_showsArray[1].title).toBe(showsArray[4].title);      
      expect(sort_showsArray[3].title).toBe(showsArray[1].title);
      expect(sort_showsArray[4].title).toBe(showsArray[2].title);
      expect(sort_showsArray[5].title).toBe(showsArray[3].title);
    });

    it("Respecting order of input when property values are equals", function() {
      sort_showsArray.sortByProperty('description');
      for (var e = 0; e < showsArray.length; ++e) {
        expect(sort_showsArray).toContain(showsArray[e]);
      }
    });
});

  describe("sortByTitle", function () {

    var showsArray, sort_showsArray;

    beforeEach(function () {
      showsArray= new ShowsArray([
        {id: 1234, title: 'element1', channel: {logo: null}, description: ""}, //0
        {id: 2640, title: 'element2', channel: {logo: null}, description: ""}, //1
        {id: 3000, title: 'ELEMENT3', channel: {logo: null}, description: ""}, //2
        {id: 4000, title: 'ELEmenT4', channel: {logo: null}, description: ""}, //3
        {id: 5000, title: 'E'       , channel: {logo: null}, description: ""}, //4
        {id: 5640, title: 'aaaaaaaa', channel: {logo: null}, description: ""}, //5
        {id: 6450, title: 'zzzzzzzz', channel: {logo: null}, description: ""}  //6
      ]);
      sort_showsArray= new ShowsArray(showsArray);
      sort_showsArray.sortByTitle();
    });

    it("Sorted a ShowsArray by title, it should have the same length that it have before sorting", function() {
      expect(sort_showsArray.length).toBe(showsArray.length);
    });

    it("Sorted ShowsArray by title, it should have the same elements, and in the same order that it have before sorting", function() {
      for (var e = 0; e < showsArray.length; ++e) {
        expect(sort_showsArray).toContain(showsArray[e]);
      }
    });

    it("Checking if the function has sorted by title correctly", function() {
      expect(sort_showsArray[0].title).toBe(showsArray[5].title);
      expect(sort_showsArray[sort_showsArray.length - 1].title).toBe(showsArray[showsArray.length - 1].title);
      expect(sort_showsArray[1].title).toBe(showsArray[4].title);      
      expect(sort_showsArray[3].title).toBe(showsArray[1].title);
      expect(sort_showsArray[4].title).toBe(showsArray[2].title);
      expect(sort_showsArray[5].title).toBe(showsArray[3].title);
    });
  });
});


