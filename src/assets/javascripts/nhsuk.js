const $ = require('jquery');
const cookieMessage = require('./modules/cookie-message');
const feedbackForm = require('./modules/feedback-form');
const analytics = require('./modules/analytics');
const labelFocus = require('./modules/label-focus');
const labelSelect = require('./modules/label-select');
const tabs = require('./modules/tabs');
const conditionalSubfields = require('./modules/conditional-subfields');
const print = require('./modules/print');
const collage = require('./modules/collage');

cookieMessage('global-cookies-banner');

$(() => {
  feedbackForm.init();
  analytics.init();
  labelFocus.init();
  labelSelect.init();
  tabs.init();
  conditionalSubfields.init();
  print.init();
  collage.init();
});
