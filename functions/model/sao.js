// const {Storage} = require('@google-cloud/storage');
//
// const projectId = 'aaas-iori';
// const bucketName = 'aaas-iori.appspot.com';
//
// // const gcs = new Storage({
// //   projectId: projectId,
// //   keyFilename: '../aaas-iori-878bcb050fd0.json'
// // });
//
// const bucket = new Storage({keyFilename: '../aaas-iori-878bcb050fd0.json'});

// const firebaseConfig = {
//   apiKey: "AIzaSyBXa5waXjg5x17KxbR-HMyXXQ4kivx1jLc",
//   authDomain: "aaas-iori.firebaseapp.com",
//   databaseURL: "https://aaas-iori.firebaseio.com",
//   projectId: "aaas-iori",
//   storageBucket: "aaas-iori.appspot.com",
//   messagingSenderId: "514691189462",
//   appId: "1:514691189462:web:ce27d3a63b8bc5b278d777"
// };

const admin = require('firebase-admin');
const functions = require('firebase-functions');
const fs = require('fs');

// if (!admin.apps.length) {
//   admin.initializeApp(functions.config().firebase);
// }

const bucket = admin.storage().bucket();

// ファイルのアップロード
exports.upload_file = async (file_name, body) => {
  return new Promise((resolve, reject) => {
    const fs = require('fs');
    const Readable = require('stream').Readable;

    const upload_file = bucket.file(`patterns/${file_name}.txt`);
    const uploadStream = upload_file.createWriteStream({
      predefinedAcl: 'publicRead',
      metadata: {
        cacheControl: 'no-cache',
        contentType: 'text/plain',
      },
    });

    const readStream = new Readable();
    readStream.push(`${body}`);
    readStream.push(null);

    readStream
      .pipe(uploadStream)
      .on('end', function() {})
      .on('finish', resolve);

    console.dir(upload_file);

  });

  // const files = await bucket.getFiles({});
  //
  // console.log('files: ', files)
  // console.log('files type: ', typeof files)

};

// ファイルのダウンロード
exports.download_file = async (file_name) => {

  // let file = await (await bucket.file(`patterns/${file_name}`).download()).toString();
  let file = await bucket.file(`patterns/${file_name}`).getMetadata();

  console.log(`file(type) => ${typeof file}`)
  console.dir(file)
  console.log(`file(mediaLink) => ${file[0].selfLink}`)
  file_url = file[0].mediaLink

  return file_url;

  // console.log('patt: ', patt_storage);
  // patterns_storage.child(`${patt_file_name}`).getDownloadURL().then(function(url) {
  //   console.log('storage accessed');
  //
  // }).catch(function(error) {
  //   console.log('pattern file download error');
  // });
};

// 画像ファイルのアップロード
exports.upload_image = async (file_name, body) => {
  return new Promise((resolve, reject) => {
    const fs = require('fs');
    const Readable = require('stream').Readable;

    // 正規表現で整形する
    body = body.replace(/.+,/, '');

    body = new Buffer(body, 'base64');
    console.log(`body => ${body}`);

    const upload_file = bucket.file(`marker_images/${file_name}`);
    // const uploadStream = upload_file.createWriteStream({
    //   predefinedAcl: 'publicRead',
    //   metadata: {
    //     cacheControl: 'no-cache',
    //     contentEncoding: 'base64',
    //     contentType: 'image/png',
    //   },
    // });

    upload_file.save(body, {
      predefinedAcl: 'publicRead',
      metadata: {
        contentType: 'image/png',
      },
    });

    // const readStream = new Readable();
    // readStream.push(`${body}`);
    // readStream.push(null);
    //
    // readStream
    //   .pipe(uploadStream)
    //   .on('end', function() {})
    //   .on('finish', resolve);

    console.dir(upload_file);

  });

  return;

};

// pattファイルのアップロード
exports.upload_patt = async (file_name, body) => {
  return new Promise((resolve, reject) => {
    const fs = require('fs');
    const Readable = require('stream').Readable;

    const upload_file = bucket.file(`patterns/${file_name}`);

    upload_file.save(body, {
      predefinedAcl: 'publicRead',
      metadata: {
        contentType: 'application/octet-stream',
      },
    });
    // const uploadStream = upload_file.createWriteStream({
    //   predefinedAcl: 'publicRead',
    //   metadata: {
    //     cacheControl: 'no-cache',
    //     contentType: 'application/octet-stream',
    //   },
    // });
    //
    // const readStream = new Readable();
    // readStream.push(`${body}`);
    // readStream.push(null);
    //
    // readStream
    //   .pipe(uploadStream)
    //   .on('end', function() {})
    //   .on('finish', resolve);

    console.dir(upload_file);
  });
}
