(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var nxRemove = nx.remove || require('@jswork/next-remove');
  var deepEqual = global.deepEqual || require('deep-equal');
  var defaults = { value: [], idKey: 'id', items: [] };

  var NxAbstractCheckbox = nx.declare('nx.AbstractCheckbox', {
    properties: {
      checked: function () {
        return this.__equal__();
      },
      indeterminate: function () {
        if (this.runtimeIds.length === 0) return false;
        if (this.runtimeIds.length < this.ids.length) return true;
        return false;
      },
      ids: function () {
        return this.options.items.map((item) => nx.get(item, this.options.idKey));
      }
    },
    methods: {
      init: function (inOptions) {
        this.options = nx.mix(null, defaults, inOptions);
        this.runtimeIds = this.__normalize__(this.options.value);
      },
      get: function () {
        return this.__normalize__();
      },
      has: function (inId) {
        return this.runtimeIds.indexOf(inId) !== -1;
      },
      select: function (inId) {
        !this.has(inId) && this.runtimeIds.push(inId);
        return this.get();
      },
      selectMultiple: function (inIds) {
        inIds.forEach(function (id) {
          if (!this.has(id)) {
            this.runtimeIds.push(id);
          }
        }, this);
        return this.get();
      },
      selectAll: function () {
        this.runtimeIds = this.ids;
        return this.get();
      },
      unSelect: function (inId) {
        this.has(inId) && nxRemove(this.runtimeIds, [inId]);
        return this.get();
      },
      unSelectMultiple: function (inIds) {
        nxRemove(this.runtimeIds, inIds);
        return this.get();
      },
      unSelectAll: function () {
        this.runtimeIds = [];
        return this.get();
      },
      toggle: function (inId, inValue) {
        return inValue ? this.select(inId, inValue) : this.unSelect(inId);
      },
      toggleMultiple: function (inIds, inValue) {
        return inValue ? this.selectMultiple(inIds) : this.unSelectMultiple(inIds);
      },
      toggleAll: function (inValue) {
        var value = typeof inValue === 'undefined' ? !this.get().length : inValue;
        return value ? this.selectAll() : this.unSelectAll();
      },
      __normalize__: function (inIds) {
        return (inIds || this.runtimeIds).slice();
      },
      __equal__: function () {
        var ids_ = this.ids.slice().sort();
        var runtimeIds_ = this.runtimeIds.slice().sort();
        return deepEqual(ids_, runtimeIds_);
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAbstractCheckbox;
  }
})();
