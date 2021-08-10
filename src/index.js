(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var nxRemove = nx.remove || require('@jswork/next-remove');
  var nxToggle = nx.toggle || require('@jswork/next-toggle');
  var defaults = { value: [], idKey: 'id', items: [] };

  // @jswork/next-unique

  var NxCheckboxHelper = nx.declare('nx.CheckboxHelper', {
    properties: {
      checked: function () {},
      indeterminate: function () {},
      ids: function () {
        return this.options.items.map((item) => nx.get(item, this.options.idKey));
      }
    },
    methods: {
      init: function (inOptions) {
        this.options = nx.mix(null, defaults, inOptions);
        this.itemIds = this.normalize(this.options.value);
      },
      get: function () {
        return this.normalize();
      },
      has: function (inId) {
        return this.itemIds.indexOf(inId) !== -1;
      },
      // 单选框选中
      select: function (inId) {
        !this.has(inId) && this.itemIds.push(inId);
        return this.normalize();
      },
      // 单选框取消选中
      unselect: function (inId) {
        !this.has(inId) && nxRemove(this.itemIds, [inId]);
        return this.normalize();
      },
      // 单选框点击
      toggle: function (inId, inValue) {
        nxToggle(this.itemIds, [inId], inValue, this.options.idKey);
        return this.normalize();
      },
      toggleAll: function (inValue) {
        this.itemIds = inValue ? [].concat(this.ids) : [];
        return this.normalize();
      },
      // 统一处理id
      normalize: function (inIds) {
        return (inIds || this.itemIds).sort().slice();
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxCheckboxHelper;
  }
})();
