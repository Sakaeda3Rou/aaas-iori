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
// const storage = new Storage({keyFilename: '../aaas-iori-878bcb050fd0.json'});

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

// パターンファイルのアップロード
exports.uploadPatt = (patt_file) => {

  // デフォルトバケットにアップロード
  // bucket.upload('/Users/noa/Downloads/test.txt');


  getFolder();
  async function getFolder() {
    const files = await bucket.getFiles({});

    console.log('files: ', files)
    console.log('files type: ', typeof files)
  }

}

// パターンファイルのダウンロード
exports.downloadPatt = (patt_file_name) => {

  downloadFile();

  async function downloadFile() {
    let file = await bucket.file('patterns/pattern-marker.patt').download();
    console.log('file type => ', typeof file);
    console.log('file => ', file);

  }
  // console.log('patt: ', patt_storage);
  // patterns_storage.child(`${patt_file_name}`).getDownloadURL().then(function(url) {
  //   console.log('storage accessed');
  //
  // }).catch(function(error) {
  //   console.log('pattern file download error');
  // });
}
