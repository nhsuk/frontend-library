const $ = require('jquery');

const FeedbackForm = function FeedbackForm() {
  this.toggleEl = '.js-feedback-toggle';
};

FeedbackForm.prototype.init = function init() {
  this.cacheEls();
  this.bindEvents();
  this.render();
};

FeedbackForm.prototype.cacheEls = function cacheEls() {
  this.$body = $('body');

  this.$bannerToggle = $(this.toggleEl);
  this.$feedbackBanner = $('.js-feedback-banner');

  this.$formContainer = $('.js-feedback-container');
  this.$form = this.$formContainer.find('form');
};

FeedbackForm.prototype.bindEvents = function bindEvents() {
  this.$body
    .on('click.feedbackForm', this.toggleEl, $.proxy(this.showForm, this))
    .on('click.feedbackForm', 'button[type="reset"]', $.proxy(this.hideForm, this));
};

FeedbackForm.prototype.render = function render() {
  if (!this.isSubmitted()) {
    this.$formContainer.hide();
  } else {
    this.scrollToForm(0);
  }
};

FeedbackForm.prototype.showForm = function showForm(e) {
  e.preventDefault();
  this.$formContainer.show();
  this.scrollToForm();
};

FeedbackForm.prototype.hideForm = function hideForm() {
  this.$formContainer.hide();
};

FeedbackForm.prototype.isSubmitted = function isSubmitted() {
  return this.$formContainer.hasClass('is-submitted');
};

FeedbackForm.prototype.scrollToForm = function scrollToForm(duration = 750) {
  $('html, body').animate({
    scrollTop: this.$formContainer.offset().top,
  }, duration);
};

module.exports = new FeedbackForm();
