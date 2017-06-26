/* globals window */
const $ = require('jquery');

const ConditionalSubfields = {
  el: '[data-controlled-by]',

  init() {
    this.cacheEls();
    this.bindEvents();
    this.render();
  },

  cacheEls() {
    this.conditionalFields = $(this.el);
  },

  bindEvents() {
    const controllers = $.unique(this.conditionalFields.map((i, controller) => {
      return $(controller).data('controlled-by');
    }));

    $.each(controllers, (i, name) => {
      $(`[name="${name}"]`).on('change.ConditionalSubfields', $.proxy(this.handleVisibility, this));
    });
  },

  render() {
    this.conditionalFields.each((i, fieldGroup) => {
      const name = $(fieldGroup).data('controlled-by');
      const $fields = $(`[name="${name}"]`).filter((idx, field) => {
        // Unchecked checkbox or checked radio button
        return field.type === 'checkbox' || $(field).is(':checked');
      });

      $fields.each($.proxy(this.handleVisibility, this));
    });
  },

  destroy() {
    this.$body.off('change.ConditionalSubfields');
  },

  handleVisibility() {
    this.conditionalFields.each((i, field) => {
      this._handleField($(field));
    });
  },

  _handleField($field) {
    // `controlled-by` specifies the field name which controls the visibility of element
    const controlInputName = $field.data('controlled-by');
    // `control-value` is the value which should trigger the visibility of element
    const controlInputValue = $field.data('control-value');
    let $controlInput = $(`[name="${controlInputName}"]`);

    // control visibility only for specified value (unless it's a wildcard `*`)
    if (controlInputValue && controlInputValue !== '*') {
      $controlInput = $controlInput.filter(`[value="${controlInputValue}"]`);
      $controlInput.attr('aria-controls', $field.attr('id'));
    }

    this._toggleField($field, $controlInput.is(':checked'));
  },

  _toggleField($field, isVisible) {
    $field
      .toggleClass('util-jshidden', !isVisible)
      .attr({
        'aria-expanded': isVisible,
        'aria-hidden': !isVisible
      });

    if (!isVisible && !$field.data('persist-values')) {
      $field.find('input')
        .prop('checked', false)
        .val('');
    }
  },
};

module.exports = ConditionalSubfields;
