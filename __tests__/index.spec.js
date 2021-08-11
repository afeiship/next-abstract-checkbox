(function () {
  const NxAbstractCheckbox = require('../src');

  describe('NxAbstractCheckbox.methods', function () {
    let data;
    beforeEach(function () {
      const res = require('./resouces.json');
      data = res.result;
    });

    test('api:new with value will be sort', () => {
      var checkboxHelper = new NxAbstractCheckbox({
        value: ['ba60e63291305df804965624f788a70b', '75debe6a00010d08188aa3e1e30dc464'],
        idKey: 'uuid',
        items: data
      });

      expect(checkboxHelper.get()).toEqual([
        '75debe6a00010d08188aa3e1e30dc464',
        'ba60e63291305df804965624f788a70b',
      ]);
    });

    test('api:select push an id', function () {
      var checkboxHelper = new NxAbstractCheckbox({ idKey: 'uuid', items: data });
      var res = checkboxHelper.select('ba60e63291305df804965624f788a70b');
      // console.log(res);
      expect(res).toEqual(['ba60e63291305df804965624f788a70b']);
    });

    test('api:select push the same id', function () {
      var checkboxHelper = new NxAbstractCheckbox({ idKey: 'uuid', items: data });
      var res = checkboxHelper.select('ba60e63291305df804965624f788a70b');
      checkboxHelper.select('ba60e63291305df804965624f788a70b');
      expect(res).toEqual(['ba60e63291305df804965624f788a70b']);
    });
  });
})();
