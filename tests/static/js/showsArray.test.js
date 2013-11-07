'use strict';
describe("ShowsArray", function () {
  describe("getShowsIdTitleLogoDescriptionCrtl", function () {

    var arr;

    it('empty ShowsArray should return 0 elements ShowsArray', function () {
      arr = new ShowsArray("");
      expect(arr.getShowsIdTitleLogoDescription()).not.toContain(" ");
      expect(arr.getShowsIdTitleLogoDescription().length).not.toBeGreaterThan(0);

      arr = new ShowsArray();
      expect(arr.getShowsIdTitleLogoDescription()).not.toContain(" ");
      expect(arr.getShowsIdTitleLogoDescription().length).not.toBeGreaterThan(0);
    });

    it('Return same order, same length and not selected', function () {
      //var arr = new ShowsArray("/mocks/model1.json");
      //arr.getShowsIdTitleLogoDescription();

      //expect(arr.length).toBeGreaterThan(0);
      arr = new ShowsArray([
        {id: 1234, title: 'element1', channel: {logo: null}, description: ""},
        {id: 1000, title: 'element2', channel: {logo: null}, description: ""}
      ]);
      //expect(arr.getShowsIdTitleLogoDescription()).toContain("1234");
      expect(arr.getShowsIdTitleLogoDescription().length).toBe(arr.length);
      arr = arr;      
      expect(arr.getShowsIdTitleLogoDescription().length).toBe(arr.length);
      for (var i = 0; i < arr.length; ++i) {
        expect(arr.getShowsIdTitleLogoDescription()[i].id).toBe(arr[i].id);
        expect(arr.getShowsIdTitleLogoDescription()[i].checkboxState).toBe(false);
      }
    });

    it('Change empty descriptions', function () {
      arr = new ShowsArray([
        {id: 1234, title: 'element1', channel: {logo: null}, description: ""}
      ]);
      expect(arr.getShowsIdTitleLogoDescription().length).toBe(arr.length);
      expect(arr.getShowsIdTitleLogoDescription()[0].description).not.toBe(arr[0].description);
      expect(arr.getShowsIdTitleLogoDescription()[0].description).not.toBe("");
    });
  });

  describe("sortByTitleCtrl", function () {

    var arr, sort_arr;

    beforeEach(function () {
      arr = new ShowsArray([
        {id: 1234, title: 'element1', channel: {logo: null}, description: ""}, //0
        {id: 2640, title: 'element2', channel: {logo: null}, description: ""}, //1
        {id: 3000, title: 'ELEMENT3', channel: {logo: null}, description: ""}, //2
        {id: 4000, title: 'ELEmenT4', channel: {logo: null}, description: ""}, //3
        {id: 5000, title: 'E'       , channel: {logo: null}, description: ""}, //4
        {id: 5640, title: 'aaaaaaaa', channel: {logo: null}, description: ""}, //5
        {id: 6450, title: 'zzzzzzzz', channel: {logo: null}, description: ""}  //6
      ]);
      sort_arr = new ShowsArray(arr);
      sort_arr.sortByTitle();
    });

    it("Same number of elements", function() {
      expect(sort_arr.length).toBe(arr.length);
    });

    it("Same elements", function() {
      for (var e = 0; e < arr.length; ++e) {
        expect(sort_arr).toContain(arr[e]);
      }
    });

    it("Check correct sorting", function() {
      expect(sort_arr[0].title).toBe(arr[5].title);
      expect(sort_arr[sort_arr.length - 1].title).toBe(arr[arr.length - 1].title);
      expect(sort_arr[1].title).toBe(arr[4].title);      
      expect(sort_arr[3].title).toBe(arr[1].title);
      expect(sort_arr[4].title).toBe(arr[2].title);
      expect(sort_arr[5].title).toBe(arr[3].title);
    });
  });
});