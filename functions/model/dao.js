// Your web app's Firebase configuration
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

// if (!admin.apps.length) {
//   admin.initializeApp(functions.config().firebase);
// }

const db = admin.firestore();

// ユーザーを取得
exports.getUsers = async () => {
  var text = "";

  await db.collection('users').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        text += `${doc.id} => ${doc.data()}\n`;
      });
    })
    .catch((error) => {
      console.log('Error getting documents', error);
    });

    return text;
};

// ユーザーを追加する
exports.insert_user = (user) => {
  // cloud firestoreに接続
  const db = admin.firestore();

  // ユーザーを追加
  const res = db.collection('users').add({
    name: user.getName(),
    age: user.getAge()
  });

  // TODO: doc('uid')に変更する
  // const res = db.collection('users').doc('pien').set({
  //   name: user.getName(),
  //   age: user.getAge()
  // });

  console.log('Added document with ID: ', res.id);
};
