const $ = require('jquery');

const LabelSelect = function LabelSelect() {
  this.el = '.multiple-choice';
  this.className = 'is-selected';
  this.delegateSelector = `${this.el} input[type=radio], ${this.el} input[type=checkbox]`;
};

LabelSelect.prototype.init = function init() {
  this.cacheEls();
  this.bindEvents();
  this.render();
};

LabelSelect.prototype.cacheEls = function cacheEls() {
  this.$body = $('body');
};

LabelSelect.prototype.bindEvents = function bindEvents() {
  this.$body
    .on('change.LabelSelect', this.delegateSelector, $.proxy(this.onChange, this));
};

LabelSelect.prototype.onChange = function onChange(e) {
  const $el = $(e.currentTarget);
  const $parent = $el.parent('label');

  // clear out all other selections on radio elements
  if ($el.attr('type') === 'radio') {
    $(`[name=${$el.attr('name')}]`).parent('label').removeClass(this.className);
  }

  // set state class on check
  if ($el.is(':checked')) {
    $parent.addClass(this.className);
  } else {
    $parent.removeClass(this.className);
  }
};

LabelSelect.prototype.render = function render() {
  this.$body.find(this.delegateSelector).filter(':checked').each((i, el) => {
    $(el).parent().addClass(this.className);
  });
};

LabelSelect.prototype.destroy = function destroy() {
  this.$body
    .off('change.LabelSelect');
};

module.exports = new LabelSelect();
