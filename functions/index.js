const functions = require('firebase-functions');
const express = require('express');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxage: 1000 * 60 * 1
  }
}));


// app.get('/function/:file', (req, res) => {
//   console.log(`open:views/${req.params.file}.html`);
//
//   fs.readFile(`views/${req.params.file}.html`, 'utf-8', (err, data) => {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     res.end();
//   });
// });

// ルーティングのテスト
app.get('/function/test1', (req, res) => {
  fs.readFile('views/test1.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

// postリクエストのパラメータ取得のテスト
app.post('/function/test2', (req, res) => {
  // パラメータを取得
  let name = req.body._name;
  let age = req.body._age;

  // ユーザーディクショナリを作成
  let user = {name: name, age: age}

  // ユーザー情報をセッションに保存
  req.session.user = user;

  console.log(`test2_name: ${req.session.user.name}`);

  fs.readFile('views/test2.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

// test2でsessionに保存したデータを保持できているかのテスト
app.post('/function/test3', (req, res) => {

  console.log(`test3_name: ${req.session.user.name}`)

  fs.readFile('views/test3.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

// test3までに保持されているsession内のデータ削除のテスト
app.post('/function/logout', (req, res) => {
  delete req.session.user;

  if (typeof req.session.user == "undefined") {
    console.log('logout success')
  }

  res.send('logout');
})

app.get('/function/get_user_test', async (req, res) => {
  const dao = require('./model/dao.js');

  var text = await dao.getUsers();

  console.log('get user finisehd');
  res.send(text);
  res.end();
});

// ユーザー追加入力フォームを表示
app.get('/function/insert_test', (req, res) => {
  // insert_test.htmlを返す
  fs.readFile('views/insert_test.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

// ユーザー追加のテスト
app.post('/function/insert_test', (req, res) => {
  // 変数を定義
  let name = null;
  let age = null;

  try {
    name = req.body._name;
    age = Number(req.body._age);
  } catch(error) {
    // 入力フォームに戻る
    console.log('error: ' + error);
    fs.readFile('views/insert_test.html', 'utf-8', (err, data) => {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }

  // Userオブジェクトを生成
  let user = require('./model/user.js');
  user.setUser(name, age);

  // cloud firestoreに登録
  let dao = require('./model/dao.js');
  dao.insert_user(user);

  console.log('user insert finished');
  res.end();

});

// storageのテスト
app.get('/function/storage_test_down', async (req, res) => {
  const sao = require('./model/sao.js');

  // 指定したPatternファイルをダウンロードする
  const file = await sao.downloadPatt('pattern-marker.patt');

  console.log('storage down finished');
  res.send(`file => ${file}`);
  res.end();
});

app.get('/function/storage_test_up', (req, res) => {

  fs.readFile('views/create_file.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

app.post('/function/storage_test_up', async (req, res) => {
  // パラメータを取得
  let text = req.body._text;
  let body = req.body._body;

  console.log(`text => ${text}`)

  // ストレージに接続
  const sao = require('./model/sao.js');

  // テキストをアップロード
  await sao.uploadPatt(text, body);

  res.send('upload finished');
  res.end();
})

// scrapingのテスト
app.get('/function/scrap_test', (req, res) => {

  (() => {
    const scrap = require('./model/orient_devil.js');

    var text = ('await scrap.pup_test()');

    console.log('scrap test finished');
    res.send(text);
    res.end();
  })();
});

exports.app = functions.https.onRequest(app);

// viewsディレクトリのhtmlファイルを表示するだけ
exports.helloWorld = functions.https.onRequest((req, res) => {
  functions.logger.info("Hello logs!", {structuredData: true});

   fs.readFile('views/hello.html', 'utf-8', (err, data) => {
     res.writeHead(200, {'Content-Type': 'text/html'});
     res.write(data);
     res.end();
   });
});

// 文字を表示するだけのページを返すだけ
exports.pien = functions.https.onRequest((req, res) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  res.send("Hello from Firebase!");
});

// modelディレクトリのpiee.jsを呼び出すだけ
exports.piee = functions.https.onRequest((req, res) => {
   const pie = require('./model/piee.js');
   console.log(pie.pie());

   res.end();
});

// firestoreのユーザーを表示するだけ
exports.user = functions.https.onRequest((req, res) => {
  const user = require('./model/user.js');

  // cloud firestoreからデータを取得
  const dao = require('./model/dao.js');
  dao.getUsers();

  res.end();
});
