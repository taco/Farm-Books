var getExtension = function (fileField) {
  if (fileField.indexOf('\\') > -1) {
    fileField = fileField.substring(fileField.lastIndexOf('\\') + 1, fileField.length);
  }
  if (fileField.indexOf('/') > -1) {
    fileField = fileField.substring(fileField.lastIndexOf('/') + 1, fileField.length);
  }

  var extension;
  if (fileField.indexOf('.') > -1) {
    extension = fileField.substring(fileField.lastIndexOf('.') + 1, fileField.length);
  } else {
    extension = "";
  }
  return extension;
}

var getContentType = function (fileField) {
   var extension = getExtension(fileField);
   var contentType = "application/octet-stream";
   if ( extension == "txt" ) {
     contentType= "text/plain";
   } else if ( extension == "htm" || extension == "html" ) {
     contentType= "text/html";
   } else if ( extension == "jpg" || extension == "jpeg" ) {
     contentType = "image/jpeg";
   } else if ( extension == "gif" ) {
     contentType = "image/gif";
   } else if ( extension == "png" ) {
     contentType = "image/png";
   }

   return contentType;
}

Handlebars.registerHelper('s3', function (options) {
    var uploadOptions = options.hash,
        template = options.fn,
        callback = uploadOptions.callback,
        html;

    Template.s3Form.events({
        'change input[type="file"]': function (e) {
            var $file = $(e.target),
                $form = $file.parent('form'),
                contentType = getContentType($file.val()),
                split = $file.val().split('\\'),
                fileLoc = split[split.length - 1];

            
            console.log(fileLoc);

            fileLoc = 'receipts/-_-' + new Date().getTime() + '-_- ' + fileLoc;

            $form.find('[name=content-type]').val(contentType);
            $form.find('[name=key]').val(fileLoc);

            Meteor.call('sign', function (e, r) {
                $form.find('[name=AWSAccessKeyId]').val(r.accessKey);
                $form.find('[name=policy]').val(r.policy);
                $form.find('[name=signature]').val(r.signature);

                $xhr = $.ajax({
                    url: 'https://fhfarm-books.s3.amazonaws.com',
                    type: 'POST',
                    data: new FormData($form[0]),
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: function (response) {
                        var url = 'https://fhfarm-books.s3.amazonaws.com/' + encodeURI(fileLoc);
                        Meteor.call(callback, url);
                        $file[0].value = null;
                    }
                })
            });

        }
    });

    return Template.s3Form();

    // html = Spark.isolate(function () {
    //     return Template.s3Form();
    // });

    // html = Spark.attachEvents({
    //     'change input[type=file]': function (e) {

    //     }
    // }, html);

    // return html;
})


