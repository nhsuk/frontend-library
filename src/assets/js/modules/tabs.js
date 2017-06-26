/* globals location, window, document */
const $ = require('jquery');

// Define the class
const Tabs = function Tabs(el, options) {
  this.settings = $.extend({}, this.defaults, options);
  this._cacheEls(el);
  this._bindEvents();
  this.render();
};

Tabs.prototype = {

  defaults: {
    activatefirst: true,
    focusfirst: false,
    scrollonload: true,
    updatehash: true,
    activetabclass: 'is-active',
    activepaneclass: 'is-active',
    activetabelement: 'li',
    tabidprefix: 'tab-',
    paneidsuffix: '-enhanced',
  },

  _cacheEls(wrap) {
    this.$tabNav = $('.js-tabs-nav', wrap).first();
    this.$tabs = $('a', this.$tabNav);
    this.$tabPanes = $('.js-tabs-content', wrap).first().children();
    this.$window = $(window);
  },

  _bindEvents() {
    this.$window.on('hashchange.Tabs', $.proxy(this._hashchange, this));

    this.$tabs
      .on('click.Tabs', $.proxy(this._clickTab, this))
      .on('keydown.Tabs', $.proxy(this._keydownTab, this));
  },

  _hashchange() {
    const hash = window.location.hash;
    const $tab = this.$tabNav.find(`a[href="${hash}"]`);

    if ($tab.size() > 0) {
      $tab.click();
    }
  },

  _clickTab(event) {
    event.preventDefault();
    this._activateTab($(event.target));
    this._activatePane($(event.target).attr('href'));
  },

  _keydownTab(event) {
    const $currentTab = $(event.target).parent();
    let preventDefault = false;

    switch (event.keyCode) {
      // left and up keys
      case 37:
      case 38: {
        const $prevTab = $currentTab.prev(this.settings.activetabelement);
        if ($prevTab.size() > 0) {
          $prevTab.find('a')
            .click()
            .focus();
          preventDefault = true;
        }
        break;
      }
      // right and down keys
      case 39:
      case 40: {
        const $nextTab = $currentTab.next(this.settings.activetabelement);
        if ($nextTab.size() > 0) {
          $nextTab.find('a')
            .click()
            .focus();
          preventDefault = true;
        }
        break;
      }
      // home key
      case 36:
        this.$tabNav.find(this.settings.activetabelement).first().find('a')
          .click()
          .focus();
        preventDefault = true;
        break;
      // end key
      case 35:
        this.$tabNav.find(this.settings.activetabelement).last().find('a')
          .click()
          .focus();
        preventDefault = true;
        break;
      default:
    }

    if (preventDefault) {
      event.preventDefault();
    }
  },

  _activateTab(activeLink, updateHash = true) {
    const c = this.settings.activetabclass;
    const e = this.settings.activetabelement;
    const $tab = this.$tabs.filter(activeLink);

    this.$tabs
      .attr('tabindex', '-1')
      .closest(e)
        .removeClass(c);

    $tab
      .attr('tabindex', '0')
      .closest(e)
        .addClass(c);

    if (updateHash) {
      $tab.focus();

      if (this.settings.updatehash) {
        window.location.hash = activeLink.attr('href');
      }
    }
  },

  _activatePane(hash) {
    const $shown = this.$tabPanes.filter(hash + this.settings.paneidsuffix);

    // hide panels
    this.$tabPanes
      .removeClass(this.settings.activepaneclass)
      .attr('aria-hidden', true);
    // show active panel
    $shown
      .attr('aria-hidden', false)
      .addClass(this.settings.activepaneclass);

    if (this.settings.focusfirst) {
      this._focusFirstElement($shown);
    }
  },

  _activateFirstLink() {
    const $firstTab = this.$tabNav.find(this.settings.activetabelement).first().find('a');

    this._activateTab($firstTab, false);
    this._activatePane($firstTab.attr('href'));
  },

  _focusFirstElement(el) {
    el.find('a, input, textarea, select, button, [tabindex]').not(':disabled').first().focus();
  },

  _scrollToLink(hash) {
    const tabPosition = this.$tabs.filter(`[href="${hash}"]`).offset().top;
    const panePosition = $(`${hash + this.settings.paneidsuffix}`).offset().top;

    if (this.settings.scrollonload) {
      const scrollPosition = Math.min(tabPosition, panePosition);

      window.setTimeout(() => {
        $(document).scrollTop(scrollPosition);
      }, 50);
    }
  },

  render() {
    // set role of tab nav
    this.$tabNav.attr('role', 'tablist');
    // set role of each tab
    this.$tabNav.find('li').each((idx, item) => {
      $(item)
        .attr('role', 'tab')
        .attr('id', this.settings.tabidprefix + $(item).find('a').attr('href').split('#')[1]);
    });
    // remove tabs from tabindex
    this.$tabs.each((idx, tab) => {
      $(tab).attr('tabindex', '-1');
    });
    // set role and aria attributes on tab panes
    this.$tabPanes.each((idx, pane) => {
      $(pane)
        .attr('role', 'tabpanel')
        .attr('aria-hidden', true)
        .attr('aria-labelledby', this.settings.tabidprefix + $(pane).attr('id'))
        .attr('id', $(pane).attr('id') + this.settings.paneidsuffix);
    });

    // set initial tab state
    const hash = window.location.hash;
    const $hashedTab = this.$tabs.filter(`[href="${hash}"]`);

    if (this.settings.updatehash && $hashedTab.size() > 0) {
      this._activateTab($hashedTab, false);
      this._activatePane(hash);
      this._scrollToLink(hash);
    } else if (this.settings.activatefirst) {
      this._activateFirstLink();
    } else {
      this._activatePane('*');
    }
  },

  destroy() {
    this.$window.off('hashchange.Tabs');
    this.$tabs
      .off('click.Tabs')
      .off('keydown.Tabs');
  }

};

module.exports = {
  init() {
    $('.js-tabs').each((idx, tabs) => {
      const $tabs = $(tabs);
      $tabs.data('nhsuk.tabs', new Tabs($tabs, $tabs.data()));
    });
  }
};
