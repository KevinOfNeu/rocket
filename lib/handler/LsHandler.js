var Promise = require('promise');
var Table = require('cli-table');
var db = require('../db/index');

function friendlySize(bytes) {
  if (bytes < 1024) {
    return (bytes / 1024).toFixed(2) + ' KB';
  } else if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  } else {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  }
}

module.exports = {
  handle: function (options) {
    return new Promise(function (resolve, reject) {
      var table = new Table({
        head: ['DIR', 'FILE', 'SIZE', 'CLOUD_HASH', 'UPLOAD_AT'],
        colWidths: [40, 30, 15, 30, 30]
      });
      db.getInstance().find({
        path: {$exists: true},
        file: {$exists: true}
      }, function (err, docs) {
        if (err) {
          reject('Cannot find index, Maybe add some files first! \n');
        } else {
          var offset = options.offset;
          var limit = options.limit;
          if (offset && limit) {
            docs = docs.slice(offset, limit);
          }
          var statics = {
            uploaded: 0,
            uploadProgress: 0,
            uploadSize: 0, //bytes
            totalSize: 0 // bytes
          };
          docs.forEach(function (item) {
            if (item.cloud.hash) {
              statics.uploaded++;
              statics.uploadSize += item.meta.size;
            }
            statics.totalSize = statics.totalSize + item.meta.size;
            table.push(
              [item.query.dir, item.file, friendlySize(item.meta.size), item.cloud.hash, item.cloud.upload_at]
            );
          });
          console.log(table.toString());
          var report = '\nTotal: ' + docs.length + ' files \n';
          report += 'Uploaded: ' + statics.uploaded + ' files \n';
          report += 'Upload Progress: ' + (statics.uploadSize / statics.totalSize * 100).toFixed(2) + ' % \n';
          report += 'Total Size: ' + (statics.totalSize / (1024 * 1024 * 1024)).toFixed(2) + ' GB. \n';
          resolve(report);
        }
      });

    });
  }
};
