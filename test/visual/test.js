gemini.suite('vaadin-radio-button', rootSuite => {
  function wait(actions, find) {
    return actions.waitForJSCondition(window => {
      return window.webComponentsAreReady;
    }, 80000);
  }

  rootSuite.before(wait);

  ['lumo', 'material'].forEach(theme => {
    gemini.suite(`radio-button-tests-${theme}`, suite => {
      suite
        .setUrl(`radio-button.html?theme=${theme}`)
        .setCaptureElements('#default-tests')
        .capture('default')
        .capture('rtl', actions => {
          actions.executeJS(window => {
            window.document.documentElement.setAttribute('dir', 'rtl');
          });
        });
    });

    gemini.suite(`radio-group-tests-${theme}`, suite => {
      suite
        .setUrl(`radio-group.html?theme=${theme}`)
        .setCaptureElements('#default-tests')
        .capture('default', actions => {
          actions.executeJS(window => {
            window.focusRadio();
          });
        })
        .capture('rtl', actions => {
          actions.executeJS(window => {
            window.document.documentElement.setAttribute('dir', 'rtl');
          });
        });
    });

    gemini.suite(`radio-group-wrapping-tests-${theme}`, suite => {
      suite
        .setUrl(`radio-group-wrapping.html?theme=${theme}`)
        .setCaptureElements('#wrapping-tests')
        .capture('wrapping');
    });
  });
});
