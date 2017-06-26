const $ = require('jquery');

const LabelFocus = function LabelFocus() {
  this.el = '.multiple-choice';
  this.className = 'is-focused';
};

LabelFocus.prototype.init = function init() {
  this.cacheEls();
  this.bindEvents();
};

LabelFocus.prototype.cacheEls = function cacheEls() {
  this.$body = $('body');
};

LabelFocus.prototype.bindEvents = function bindEvents() {
  const delegate = `${this.el} input[type=radio], ${this.el} input[type=checkbox]`;

  this.$body
    .on('focus.LabelFocus', delegate, $.proxy(this.onFocus, this))
    .on('blur.LabelFocus', delegate, $.proxy(this.onBlur, this));
};

LabelFocus.prototype.onFocus = function onFocus(e) {
  $(e.currentTarget).parent('label').addClass(this.className);
};

LabelFocus.prototype.onBlur = function onBlur(e) {
  $(e.currentTarget).parent('label').removeClass(this.className);
};

LabelFocus.prototype.destroy = function destroy() {
  this.$body
    .off('change.LabelFocus');
};

module.exports = new LabelFocus();
