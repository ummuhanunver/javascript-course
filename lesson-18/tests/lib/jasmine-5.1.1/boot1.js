
(function() {
  const env = jasmine.getEnv();

  const queryString = new jasmine.QueryString({
    getWindowLocation: function() {
      return window.location;
    }
  });

  const filterSpecs = !!queryString.getParam('spec');

  const config = {
    stopOnSpecFailure: queryString.getParam('stopOnSpecFailure'),
    stopSpecOnExpectationFailure: queryString.getParam(
      'stopSpecOnExpectationFailure'
    ),
    hideDisabled: queryString.getParam('hideDisabled')
  };

  const random = queryString.getParam('random');

  if (random !== undefined && random !== '') {
    config.random = random;
  }

  const seed = queryString.getParam('seed');
  if (seed) {
    config.seed = seed;
  }
  const htmlReporter = new jasmine.HtmlReporter({
    env: env,
    navigateWithNewParam: function(key, value) {
      return queryString.navigateWithNewParam(key, value);
    },
    addToExistingQueryString: function(key, value) {
      return queryString.fullStringWithNewParam(key, value);
    },
    getContainer: function() {
      return document.body;
    },
    createElement: function() {
      return document.createElement.apply(document, arguments);
    },
    createTextNode: function() {
      return document.createTextNode.apply(document, arguments);
    },
    timer: new jasmine.Timer(),
    filterSpecs: filterSpecs
  });
  env.addReporter(jsApiReporter);
  env.addReporter(htmlReporter);
  const specFilter = new jasmine.HtmlSpecFilter({
    filterString: function() {
      return queryString.getParam('spec');
    }
  });

  config.specFilter = function(spec) {
    return specFilter.matches(spec.getFullName());
  };

  env.configure(config);
  const currentWindowOnload = window.onload;

  window.onload = function() {
    if (currentWindowOnload) {
      currentWindowOnload();
    }
    htmlReporter.initialize();
    env.execute();
  };
})();
