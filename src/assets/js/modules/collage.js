/* globals location, window, document */
const $ = require('jquery');

// Define the class
const Collage = function Collage(el, options) {
  this.settings = $.extend({}, this.defaults, options);
  this._cacheEls(el);
  this._bindEvents();
  this.render();
};

Collage.prototype = {

  defaults: {
    collapsedclass: 'is-collapsed',
    buttonclass: 'button button--secondary',
    expandtext: 'Expand',
    collapsetext: 'Collapse',
  },

  _cacheEls(wrap) {
    this.$collage = $(wrap);
    this.$button = $('<button></button>');
  },

  _bindEvents() {
    this.$button.on('click.Collage.btn', $.proxy(this._onButtonClick, this));
    this.$collage.on('click.Collage.img', 'img', $.proxy(this._onImageClick, this));
  },

  _onButtonClick(event) {
    event.preventDefault();
    if (this.$collage.hasClass(this.settings.collapsedclass)) {
      this.$collage.removeClass(this.settings.collapsedclass);
      this.$button
        .text(this.settings.collapsetext)
        .attr('data-analytics-type', 'collapse');
    } else {
      this.$collage.addClass(this.settings.collapsedclass);
      this.$button
        .text(this.settings.expandtext)
        .attr('data-analytics-type', 'expand');

      window.setTimeout(() => {
        $(document).scrollTop(this.$collage.offset().top);
      }, 50);
    }
  },

  _onImageClick(event) {
    const $image = $(event.target);

    if (this.$collage.hasClass(this.settings.collapsedclass)) {
      this.$collage.removeClass(this.settings.collapsedclass);
      this.$button.text(this.settings.collapsetext);

      window.setTimeout(() => {
        $(document).scrollTop($image.offset().top);
      }, 50);
    }
  },

  render() {
    this.$button
      .addClass(this.settings.buttonclass)
      .text(this.settings.expandtext)
      .attr({
        'data-analytics': 'collage-button',
        'data-analytics-type': 'expand',
      });

    this.$collage.after(this.$button);
  },

  destroy() {
    this.$button.off('click.Collage.btn');
    this.$collage.off('click.Collage.img');
    this.$button.remove();
  }

};

module.exports = {
  init() {
    $('.js-collage').each((idx, collage) => {
      const $collage = $(collage);
      $collage.data('nhsuk.collage', new Collage($collage, $collage.data()));
    });
  }
};
