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
        'ba60e63291305df804965624f788a70b',
        '75debe6a00010d08188aa3e1e30dc464'
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

    test('api:selectMultiple', () => {
      var checkboxHelper = new NxAbstractCheckbox({ idKey: 'uuid', items: data });
      var res = checkboxHelper.selectMultiple([
        '4c4e97a96dc164db144452acdf993531',
        '22ba06aeec6e2bc08880b6eeb47ce27b'
      ]);

      expect(res).toEqual(['4c4e97a96dc164db144452acdf993531', '22ba06aeec6e2bc08880b6eeb47ce27b']);
    });

    test('api:selectAll', () => {
      var checkboxHelper = new NxAbstractCheckbox({ idKey: 'uuid', items: data });
      var res = checkboxHelper.selectAll();
      expect(res.length).toBe(16);
    });

    test('api:unselect', () => {
      var checkboxHelper = new NxAbstractCheckbox({ idKey: 'uuid', items: data });
      var res1 = checkboxHelper.selectMultiple([
        '4c4e97a96dc164db144452acdf993531',
        '22ba06aeec6e2bc08880b6eeb47ce27b'
      ]);

      var res2 = checkboxHelper.unSelect('4c4e97a96dc164db144452acdf993531');
      var res3 = checkboxHelper.unSelect('22ba06aeec6e2bc08880b6eeb47ce27b');

      expect(res2).toEqual(['22ba06aeec6e2bc08880b6eeb47ce27b']);
      expect(res3).toEqual([]);
    });

    test('api:unSelectMultiple', () => {
      var checkboxHelper = new NxAbstractCheckbox({ idKey: 'uuid', items: data });
      var res1 = checkboxHelper.selectMultiple([
        '4c4e97a96dc164db144452acdf993531',
        '22ba06aeec6e2bc08880b6eeb47ce27b',
        '5f2782eaa8ddbbe8c2c98822084c5532'
      ]);

      var res2 = checkboxHelper.unSelectMultiple([
        '4c4e97a96dc164db144452acdf993531',
        '5f2782eaa8ddbbe8c2c98822084c5532'
      ]);

      expect(res2).toEqual(['22ba06aeec6e2bc08880b6eeb47ce27b']);
    });

    test('api:unSelectAll', () => {
      var checkboxHelper = new NxAbstractCheckbox({ idKey: 'uuid', items: data });
      var res1 = checkboxHelper.selectMultiple([
        '4c4e97a96dc164db144452acdf993531',
        '22ba06aeec6e2bc08880b6eeb47ce27b',
        '5f2782eaa8ddbbe8c2c98822084c5532'
      ]);
      var res2 = checkboxHelper.unSelectAll();
      expect(res1.length).toBe(3);
      expect(res2.length).toBe(0);
    });

    test('prop:checked all', () => {
      var checkboxHelper = new NxAbstractCheckbox({ idKey: 'uuid', items: data });
      checkboxHelper.select(['4c4e97a96dc164db144452acdf993531']);
      expect(checkboxHelper.checked).toBe(false);
      checkboxHelper.selectAll();
      expect(checkboxHelper.checked).toBe(true);
    });

    test('prop:indeterminate all', () => {
      var checkboxHelper = new NxAbstractCheckbox({ idKey: 'uuid', items: data });
      checkboxHelper.select(['4c4e97a96dc164db144452acdf993531']);
      expect(checkboxHelper.indeterminate).toBe(true);
      checkboxHelper.selectAll();
      expect(checkboxHelper.indeterminate).toBe(false);
      checkboxHelper.unSelectAll();
      expect(checkboxHelper.indeterminate).toBe(false);
    });

    test('method: toggle', () => {
      var checkboxHelper = new NxAbstractCheckbox({
        value: ['ba60e63291305df804965624f788a70b', '75debe6a00010d08188aa3e1e30dc464'],
        idKey: 'uuid',
        items: data
      });

      var res1 = checkboxHelper.toggle('ba60e63291305df804965624f788a70b', true);
      var res2 = checkboxHelper.toggle('ba60e63291305df804965624f788a70b', false);
      expect(res1).toEqual([
        'ba60e63291305df804965624f788a70b',
        '75debe6a00010d08188aa3e1e30dc464'
      ]);
      expect(res2).toEqual(['75debe6a00010d08188aa3e1e30dc464']);
    });

    test('method: toggleMultiple', () => {
      var checkboxHelper = new NxAbstractCheckbox({
        value: [
          'ba60e63291305df804965624f788a70b',
          '75debe6a00010d08188aa3e1e30dc464',
          '29958b6cd9985bbbfefe1c665f28c739'
        ],
        idKey: 'uuid',
        items: data
      });

      var res1 = checkboxHelper.toggleMultiple(
        ['5f2782eaa8ddbbe8c2c98822084c5532', '29958b6cd9985bbbfefe1c665f28c739'],
        true
      );
      var res2 = checkboxHelper.toggleMultiple(
        ['ba60e63291305df804965624f788a70b', '75debe6a00010d08188aa3e1e30dc464'],
        false
      );

      expect(res1).toEqual([
        'ba60e63291305df804965624f788a70b',
        '75debe6a00010d08188aa3e1e30dc464',
        '29958b6cd9985bbbfefe1c665f28c739',
        '5f2782eaa8ddbbe8c2c98822084c5532'
      ]);

      expect(res2).toEqual([
        '29958b6cd9985bbbfefe1c665f28c739',
        '5f2782eaa8ddbbe8c2c98822084c5532'
      ]);
    });

    test('method: toggleAll', () => {
      var checkboxHelper = new NxAbstractCheckbox({
        idKey: 'uuid',
        items: data
      });

      expect(checkboxHelper.get()).toEqual([]);
      expect(checkboxHelper.toggleAll(true).length).toBe(16);
      expect(checkboxHelper.toggleAll(false).length).toBe(0);
    });
  });
})();
