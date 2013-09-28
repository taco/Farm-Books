Package.describe({
  summary: 'Upload files directly to s3 from browser.'
});

Package.on_use(function (api, where) {
  api.use(['handlebars', 'spark', 'templating'], 'client');
  api.add_files('server.js', 'server');
  api.add_files(['template.html', 'client.js'], 'client');
});