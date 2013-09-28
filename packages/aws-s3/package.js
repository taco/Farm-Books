Package.describe({
  summary: "/* fill me in */"
});

Npm.depends({
    'aws-sdk': '1.6.0'
});

Package.on_use(function (api, where) {
  api.add_files('aws-s3.js', 'server');
});

// Package.on_test(function (api) {
//   api.use('aws-s3');

//   api.add_files('aws-s3_tests.js', ['client', 'server']);
// });
