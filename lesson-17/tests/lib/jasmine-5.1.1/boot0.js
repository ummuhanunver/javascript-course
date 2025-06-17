(function() {
  const jasmineRequire = window.jasmineRequire || require('./jasmine.js');

  const jasmine = jasmineRequire.core(jasmineRequire),
    global = jasmine.getGlobal();
  global.jasmine = jasmine;

  jasmineRequire.html(jasmine);

  const env = jasmine.getEnv();

  const jasmineInterface = jasmineRequire.interface(jasmine, env);

  for (const property in jasmineInterface) {
    global[property] = jasmineInterface[property];
  }
})();
