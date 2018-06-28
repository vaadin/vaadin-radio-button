var envIndex = process.argv.indexOf('--env') + 1;
var env = envIndex ? process.argv[envIndex] : undefined;

module.exports = {
  testTimeout: 180 * 1000,
  verbose: false,
  // MAGI REMOVE START
  plugins: {
    'istanbul': {
      dir: './coverage',
      reporters: ['text-summary', 'lcov'],
      include: [
        '**/vaadin-radio-button/src/*.html'
      ],
      exclude: [],
      thresholds: {
        global: {
          statements: 94
        }
      }
    }
  },
  // MAGI REMOVE END

  registerHooks: function(context) {
    const saucelabsPlatformsMobile = [
    ];

    const saucelabsPlatformsMicrosoft = [
      'Windows 10/microsoftedge@16',
      'Windows 10/internet explorer@11'
    ];

    const saucelabsPlatformsDesktop = [
    ];

    const saucelabsPlatforms = [
      ...saucelabsPlatformsMobile,
      ...saucelabsPlatformsMicrosoft,
      ...saucelabsPlatformsDesktop
    ];

    const cronPlatforms = [
    ];

    if (env === 'saucelabs') {
      context.options.plugins.sauce.browsers = saucelabsPlatforms;
    } else if (env === 'saucelabs-cron') {
      context.options.plugins.sauce.browsers = cronPlatforms;
    }
  }
};
