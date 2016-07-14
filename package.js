Package.describe({
  name: 'marvin:panacea-textit',
  version: '0.0.1',
  summary: 'Meteor server to relay messages between Panacea Mobile and TextIt.in',
  git: 'https://github.com/marvinmarnold/meteor-panacea-textit',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.4.4');
  api.use('ecmascript');
  api.use('simple:rest@1.1.1')
  api.mainModule('server/main.js', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('panacea-textit');
  api.mainModule('panacea-textit-tests.js');
});
