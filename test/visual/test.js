describe('vaadin-radio-button', () => {
  const locator = '#radio-tests[data-ready]';

  ['lumo', 'material'].forEach(theme => {
    it(`${theme}-radio-button-default`, function() {
      return this.browser
        .url(`radio-button.html?theme=${theme}`)
        .waitForVisible(locator, 15000)
        .assertView(`${theme}-radio-button-default`, locator);
    });

    it(`${theme}-radio-button-rtl`, function() {
      return this.browser
        .url(`radio-button.html?theme=${theme}&dir=rtl`)
        .waitForVisible(locator, 15000)
        .assertView(`${theme}-radio-button-rtl`, locator);
    });

    it(`${theme}-radio-group-default`, function() {
      return this.browser
        .url(`radio-group.html?theme=${theme}`)
        .waitForVisible(locator, 15000)
        .assertView(`${theme}-radio-group-default`, locator);
    });

    it(`${theme}-radio-group-rtl`, function() {
      return this.browser
        .url(`radio-group.html?theme=${theme}&dir=rtl`)
        .waitForVisible(locator, 15000)
        .assertView(`${theme}-radio-group-rtl`, locator);
    });

    it(`${theme}-radio-group-wrapping`, function() {
      return this.browser
        .url(`radio-group-wrapping.html?theme=${theme}`)
        .waitForVisible(locator, 15000)
        .assertView(`${theme}-radio-group-wrapping`, locator);
    });
  });
});
