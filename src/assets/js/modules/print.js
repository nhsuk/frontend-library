/* globals window */
const $ = require('jquery');

const printHandler = {
  onPrintDialogueOpen() {
    this.$details.attr('open', '');
  },

  onPrintDialogueClose() {
    this.$details.removeAttr('open');
  },

  init() {
    this.$details = $('details');

    // Assume collapsed images are meant to be hidden
    if (this.$details.find('img').length) {
      return;
    }

    // Webkit
    if (window.matchMedia) {
      const mediaQueryList = window.matchMedia('print');
      mediaQueryList.addListener((evt) => {
        if (evt.matches) {
          this.onPrintDialogueOpen();
        } else {
          this.onPrintDialogueClose();
        }
      });
    }

    // Firefox, IE
    window.onbeforeprint = () => { this.onPrintDialogueOpen(); };
    window.onafterprint = () => { this.onPrintDialogueClose(); };
  }
};

module.exports = printHandler;
