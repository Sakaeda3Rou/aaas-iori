const {createCanvas, loadImage} = require('canvas')
const canvas = createCanvas(200, 200)
const context = canvas.getContext('2d')
const sao = require('./sao.js')

exports.create_image = async (uid) => {
  console.log(`createCanvas => ${createCanvas}`);

  // 基礎イメージをロード
  let image = await loadImage('images/fumo.jpg');
  console.log(`image => ${image}`)
  console.dir(image)

  // console.log(`image => ${image}`);

  // TODO: ここでuidをimageに書き込んでいく

  // TODO: pattFileStringを作成する
  const patternFileString = await create_patt(image);

  // TODO: 確認する
  console.log(`patternFileString => ${patternFileString}`);

  // TODO: saoでpattファイルをストレージに保存する
  sao.upload_patt('fumo', patternFileString)

  // TODO: imageを返す

  return patternFileString;
};

// パターンファイルを作成するメソッド
async function create_patt(image) {

  console.log(`context => ${context}`);
  console.dir(context);
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
