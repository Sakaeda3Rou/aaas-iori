const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('model'));
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

admin.initializeApp(functions.config().firebase);


// app.get('/function/:file', (req, res) => {
//   console.log(`open:views/${req.params.file}.html`);
//
//   fs.readFile(`views/${req.params.file}.html`, 'utf-8', (err, data) => {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     res.end();
//   });
// });

// XMLHttpRequestテストの受け皿
app.post('/function/select', (req, res) => {
  console.log('welcome to XMLHttpRequest function');

  console.log(`request body => ${req.body}`)
  console.log(`request type => ${typeof req.body}`)

  
  res.write('pien');
  res.end();
});

app.post('/function/login', (req, res) => {
  console.log('login(post)');

  // パラメータを取得
  const user = req.body.user

  res.end();

  fs.readFile('views/test1.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

app.get('/function/login', (req, res) => {
  console.log('login(get)');

  res.end();
});

// ルーティングのテスト
app.get('/function/test1', (req, res) => {


  fs.readFile('views/test1.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

app.post('/function/test1', (req, res) => {
  console.log(`body => ${req.body}`)

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
  const file = await sao.download_file('pattern-marker.patt');

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
  await sao.upload_file(text, body);

  res.send('upload finished');
  res.end();
})

// scrapingのテスト
app.get('/function/scrap_test', async (req, res) => {

  const scrap = require('./model/orient_devil.js');

  var text = await scrap.pup_test("pien");

  console.log('scrap test finished');
  res.send('orient devil');
  res.end();
});

app.get('/function/chrome_test', async (req, res) => {
  const scrap = require('./model/orient_devil.js');

  var text = await scrap.chrome_test();

  console.log('chrome test finished');
  res.send('chrome test');
  res.end();
});

// マーカー作成のテスト
app.get('/function/create_marker_test', async(req, res) => {

  const scrap = require('./model/orient_devil.js');

  // TODO: uidを設定
  let uid = 'abcdefghijklmnopqrstuvwxyz12';

  var marker = await scrap.create_marker(uid);

  res.send(marker);
  res.end();
});

// パターン作成のテスト
app.get('/function/create_pattern_test', async(req, res) => {
  // TODO: 画像を受け取る

  // TODO: create_patternに渡すものを用意
  let encoded_image = 'data:image/jpeg;base64,'

  // 画像を渡してパターンファイルを作成する
  res.render('create_pattern', {
    encoded_image: encoded_image,
  });
});

// canvasのテスト
app.get('/function/canvas_test', async(req, res) => {

  const image_devil = require('./model/image_devil.js');

  let uid = 'abcdefghijklmnopqrstuvwxyz12';

  // TODO: uidを渡す
  let image = await image_devil.create_image(uid);

  console.log('image devil finished');
  res.write(`
    <html>
      <head>
        <title>canvas test</title>
      </head>
      <body>
        <!-- <canvas id="test_canvas" width="${image.width}" height="${image.height}"></canvas> -->

        <img src="${image.src}">

        <script>
          // 描画コンテキストの取得
          // var canvas = document.getElementById('test_canvas');
          // var context = canvas.getContext('2d');

        </script>
      </body>
    </html>
  `);
  res.end();
});

app.get('/function/camera_test', async(req, res) => {

  const sao = require('./model/sao.js');
  const dao = require('./model/dao.js');

  let uid = 'abcdefghijklmnopqrstuvwxyz12';

  // TODO: ユーザーの所属クランからマーカーパターンを取得する

  let pattern = await sao.download_file(`${uid}.patt`);


  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(`
    <html>
      <head>
        <title>camera test page</title>
        <script src="https://cdn.jsdelivr.net/gh/aframevr/aframe@1c2407b26c61958baa93967b5412487cd94b290b/dist/aframe-master.min.js"></script>
        <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js"></script>
      </head>
      <body style="margin: 0px; overflow: hidden;">
        <a-scene embedded arjs>
  `);


  // TODO: パターンをhtmlに書き込む
  res.write(`
    // <a-marker type="pattern" url="${pattern}">
    <a-marker preset="hiro">
      <a-entity
        position="0 -1 0"
        scale="0.05 0.05 0.05"
        gltf-model="https://arjs-cors-proxy.herokuapp.com/https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf"
      ></a-entity>
  `)

  res.write(`
          </a-marker>
          <a-entity camera></a-entity>
        </a-scene>
      </body>
    </html>
  `);
  res.end();
});

app.get('/function/camera_test_v2', async (req, res) => {

  const sao = require('./model/sao.js');
  const dao = require('./model/dao.js');


  // レスポンスヘッダーを設定
  res.writeHead(200, {'Content-Type': 'text/html'});

  fs.readFile('views/camera_top.html', 'utf-8', (err, data) => {
    console.log('1')
    res.write(data);

    // a-scene開始タグ
    // res.write(`
    //   <a-scene vr-mode-ui="enabled: false">
    //     <a-entity camera>
    //
    // `);

    // a-scene終了タグ
    // res.write(`
    //     </a-entity>
    //   </a-scene>
    // `)

    // オブジェクト選択メニューの表示
    res.write(`
      <div class="object-select-menu" style="z-index: 10; background-color: rgba(0, 0, 0, 0.3); width: 100%; top: 0; left: 0; position: absolute;">
        <ul>
          <li><input type="radio" name="object" value="001" checked>Object1</li>
          <li><input type="radio" name="object" value="002">Object2</li>
        </ul>

        <input type="button" id="object-select-decision" value="Decision" onclick="decisionButtonAction()">
      </div>
    `)

    fs.readFile('views/camera_bottom.html', 'utf-8', (err, data) => {
      console.log('2')
      res.write(data);
      res.end();
    });
  });

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
