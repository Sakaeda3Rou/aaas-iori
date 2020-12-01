const sao = require('./sao.js')
const {createCanvas, loadImage} = require('canvas')
const canvas = createCanvas(200, 200);
const context = canvas.getContext('2d');


exports.create_image = async (uid) => {
  console.log(`createCanvas => ${createCanvas}`);

  // 基礎イメージをロード
  let image = await loadImage('images/wappenQR.png');
  // let image = await loadImage('images/fumo.jpg');

  // キャンバスのサイズを設定
  // canvas.width = image.width
  // canvas.height = image.height

  console.log(`image => ${image}`)
  console.dir(image);

  // ここでuidをimageに書き込んでいく
  // image = await draw_uid_to_image(uid, image);

  // TODO: pattFileStringを作成する
  const patternFileString = await create_patt(image);

  // TODO: 確認する
  console.log(`patternFileString => ${patternFileString}`);

  // TODO: saoでpattファイルをストレージに保存する
  // sao.upload_patt('fumo.patt', patternFileString)

  // TODO: imageを返す

  return patternFileString;
};

async function draw_uid_to_image(uid, image) {

  const text1 = uid.substr(0, 14);
  const text2 = uid.substr(14, 14);

  // 文字のスタイルを指定
  context.font = '20px sans-serif';
  context.fillSyle = '#c23a1e';

  // 文字の配置を指定
  context.textBaseline = 'center';
  context.textAlign = 'center';

  // 座標を指定して文字を描く
  var x = (canvas.width/2);
  var y = (canvas.height*3/5);
  context.fillText(text2, x, y);
  context.fillStyle = '#ecd318';
  y = (canvas.height/2);
  context.fillText(text1, x, y);

  image.src = canvas.toDataURL();

  return image;
}

// パターンファイルを作成するメソッド
async function create_patt(image) {

  canvas.width = 16;
  canvas.height = 16;

  var patternFileString = ''
  for(var orientation = 0; orientation > -2*Math.PI; orientation -= Math.PI/2) {

    context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.translate(canvas.width/2, canvas.height/2, canvas.width, canvas.height);
    context.rotate(orientation);
    context.drawImage(image, -canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
    context.restore();

    var imageData = context.getImageData(0, 0, canvas.width, canvas.height)

    if (orientation !== 0) patternFileString += '\n'

    for(var channelOffset = 2; channelOffset >= 0; channelOffset--) {
      for(var y = 0; y < imageData.height; y++) {
        for(var x = 0; x < imageData.width; x++) {
          if(x !== 0) patternFileString += ' '

          var offset = (y*imageData.width*4) + (x * 4) + channelOffset
          var value = imageData.data[offset]

          patternFileString += String(value).padStart(3);
        }
        patternFileString += '\n'
      }
    }
  }

  return patternFileString
}
