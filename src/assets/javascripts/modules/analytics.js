/* globals window */

// Analytics Utility module
// This module offers ways to send custom events to analytics packages:
// - by calling analytics.send. Eg. analytics.send('name', 'value')
// - by adding the data-analytics attribute to any element that can be clicked
//   with a component type
//   eg <div data-analytics="anchor"/>
// It needs the analytics tracking code to be enabled on the page
const $ = require('jquery');

const Analytics = function Analytics() {
  this.attrName = 'analytics';
  this.wtPrefix = 'DCSext.';
};

function createFunctionWithTimeout(callback, timeout) {
  let called = false;

  function fn() {
    if (!called) {
      called = true;
      callback();
    }
  }

  setTimeout(fn, timeout || 1000);
  return fn;
}

function followLink(evt) {
  const $el = $(evt.currentTarget);
  const href = $el.attr('href');
  const targetAttr = $el.attr('target');

  if (!href) {
    return false;
  }

  if (href.match(/^javascript:/i) || href.match(/^#/i)) {
    return false;
  }

  if (evt.ctrlKey || evt.shiftKey || evt.metaKey || evt.which === 2) {
    return false;
  }

  const target = (targetAttr && !targetAttr.match(/^_(self|parent|top)$/i)) ? targetAttr : false;
  if (target) {
    return false;
  }

  return true;
}

Analytics.prototype.init = function init() {
  this.cacheEls();
  this.bindEvents();
};

Analytics.prototype.cacheEls = function cacheEls() {
  this.$body = $('body');
};

Analytics.prototype.bindEvents = function bindEvents() {
  this.$body
    .on('click.analytics', `[data-${this.attrName}]`, $.proxy(this._sendFromEvent, this));
};

Analytics.prototype.send = function send(args, callback) {
  if (this._wtExists()) {
    // add required args for webtrends call
    args.push('WT.dl', '121');

    try {
      // call webtrends track function with arguments
      window.Webtrends.multiTrack({
        argsa: args,
        callback,
      });
    } catch (e) {
      throw e;
    }
  }
};

Analytics.prototype._sendFromEvent = function _sendFromEvent(evt) {
  const params = this._getEventData(evt);
  const $el = $(evt.currentTarget);
  let callback;

  if (followLink(evt)) {
    evt.preventDefault();
    callback = createFunctionWithTimeout(() => {
      window.location.href = $el.attr('href');
    });
  }

  this.send(params, callback);
};

Analytics.prototype._getEventData = function _getEventData(e) {
  const $el = $(e.currentTarget);
  const component = $el.data('analytics');
  let componentType = $el.data('analytics-type');
  const params = [];
  let name;
  let value;

  switch (component) {
    case 'anchor':
      name = `${this.wtPrefix}Anchor`;
      value = $el.attr('href');
      break;
    case 'image':
      name = `${this.wtPrefix}Image`;

      if ($el.attr('srcset')) {
        value = $el.attr('srcset').split(',')[0].trim();
      } else {
        value = $el.attr('src');
      }

      break;
    case 'contents-navigation':
      name = `${this.wtPrefix}ContentsNavigation`;
      value = `${$el.data('step')}__${$el.attr('href')}`;
      break;
    case 'pagination':
      name = `${this.wtPrefix}Pagination`;
      value = $el.attr('rel');
      break;
    case 'back':
      name = `${this.wtPrefix}BackNavigation`;
      value = $el.attr('href');
      break;
    case 'external':
      name = `${this.wtPrefix}ExternalLinks`;
      value = $el.attr('href');
      break;
    case 'event':
      name = `${this.wtPrefix}Event`;
      value = $el.prop('tagName');
      break;
    case 'image-set':
      name = `${this.wtPrefix}imageSet`;
      value = $el.attr('href');
      break;
    case 'collage-button':
      name = `${this.wtPrefix}CollageButton`;
      value = $el.text();
      break;
    case 'summary':
      name = `${this.wtPrefix}Details`;
      value = $el.text();
      componentType = $el.parent().attr('open') ? 'close' : 'open';
      break;
    default:
      name = `${this.wtPrefix}GeneralLinks`;
      value = component;
      break;
  }

  // push component name and value
  params.push(name, value);

  // if component has second level type
  if (componentType) {
    params.push(`${name}Type`, componentType);
  }

  return params;
};

Analytics.prototype._gaExists = () => {
  return typeof window.ga === typeof Function;
};

Analytics.prototype._wtExists = () => {
  return window.Webtrends instanceof Object;
};

module.exports = new Analytics();
