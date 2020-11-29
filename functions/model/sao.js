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

const firebaseConfig = {
  apiKey: "AIzaSyBXa5waXjg5x17KxbR-HMyXXQ4kivx1jLc",
  authDomain: "aaas-iori.firebaseapp.com",
  databaseURL: "https://aaas-iori.firebaseio.com",
  projectId: "aaas-iori",
  storageBucket: "aaas-iori.appspot.com",
  messagingSenderId: "514691189462",
  appId: "1:514691189462:web:ce27d3a63b8bc5b278d777"
};

const admin = require('firebase-admin');
const functions = require('firebase-functions');

if (!admin.apps.length) {
  admin.initializeApp(functions.config().firebase);
}

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

  let file = await bucket.file('patterns/pattern-marker.patt').download();
  console.log('file type => ', typeof file);
  console.log('file => ', file);

  return file;

  // console.log('patt: ', patt_storage);
  // patterns_storage.child(`${patt_file_name}`).getDownloadURL().then(function(url) {
  //   console.log('storage accessed');
  //
  // }).catch(function(error) {
  //   console.log('pattern file download error');
  // });
};

// QRファイルのアップロード
exports.upload_qr = async (file_name, body) => {
  return new Promise((resolve, reject) => {
    const fs = require('fs');
    const Readable = require('stream').Readable;

    const upload_file = bucket.file(`qr/${file_name}`);
    const uploadStream = upload_file.createWriteStream({
      predefinedAcl: 'publicRead',
      metadata: {
        cacheControl: 'no-cache',
        contentType: 'image/png',
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

  return;

};

// pattファイルのアップロード
exports.upload_patt = async (file_name, body) => {
  return new Promise((resolve, reject) => {
    const fs = require('fs');
    const Readable = require('stream').Readable;

    const upload_file = bucket.file(`patterns/${file_name}`);
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
}
