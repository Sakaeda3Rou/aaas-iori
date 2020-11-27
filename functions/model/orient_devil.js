const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const options = new chrome.Options();

exports.chrome_test = async () => {
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    console.log('driver => ', driver);

    // 3秒待機
    // await sleep(3000)

    return "guaa";
  } catch(error) {
    console.log('driver error');
  } finally {
    await driver.quit();
  }

  return "pien";

  function sleep(time) {
    const d1 = new Date();
    while(true) {
      const d2 = new Date();
      if (d2 - d1 > time) {
        return;
      }
    }
  };
}

//*[@id="gb"]/div[2]/div[3]/div[1]/div/div[1]/a



const puppeteer = require('puppeteer');
const sao = require('./sao.js');


// test用
exports.pup_test = async (text) => {;

  // ブラウザを開く
  const browser = await puppeteer.launch({
    // headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });

  // エラーコードを用意
  var error_code = 0

  try {

    // テスト用
    // ページを作成
    const page = await browser.newPage();

    // QR生成サイトにアクセス
    error_code = 1
    await page.goto('https://aaas-iori.web.app/pupeteer_test.html');

    // データ入力フォームのレンダリング待機
    error_code = 2
    await page.waitForSelector('#input_test');

    // フォームにuidを入力
    error_code = 3
    await page.type('#input_test', text);

    // 入力欄のテキストを確認
    var test = await page.$eval('#input_test', selector => selector.value);
    console.log('input_test => ', test);

    // 待機
    // await page.waitFor(1000 * 2);

    // testボタンをクリック
    error_code = 4
    await page.click('#btn_make');

    // QR出現まで待機
    error_code = 5
    await page.waitForSelector('#qr_img');

    // QR要素を取得
    error_code = 6
    const qr_image = await page.$('#qr_img');
    console.log(`qr_image => ${qr_image}`);

    // QR要素内のsrcを取得
    error_code = 7
    const qr_src = await qr_image.getProperty("src");
    console.log(`qr_src => ${qr_src}`);
    console.log(`qr_src(type) => ${typeof qr_src}`);

    // ボタンのvalueを変更
    error_code = 8
    const button_value = await (await (await page.$('#btn_make')).getProperty("value")).jsonValue();
    console.log(`button_value => ${button_value}`);



    // ファイル名を取得

    // 待機
    await page.waitFor(1000 * 30);

  } catch(error) {
    console.log(`error_code: ${error_code}`);
    console.log(error);
  } finally {
    browser.close();
  }

  return 'guaa';
}

exports.create_marker = async (uid) => {

  // ブラウザを開く
  const browser = await puppeteer.launch({
    // headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });

  // エラーコードを用意
  var error_i  = 0

  try {
    // QRを取得
    error_i = 1
    const qr = await get_qr(browser, uid);

    // var qr = 'iVBORw0KGgoAAAANSUhEUgAAAyAAAAJYCAYAAACadoJwAAAAAXNSR0IArs4c6QAADglJREFUeJzt3EFu2zAARcG6yNq5/zFzAndpoKngMqYeJXtmGRgSoaweCPzL9Xq9/QIAAAj8Xn0AAADgfQgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgI0AAAICMAAEAADICBAAAyAgQAAAg87H6AAArfH19rT4C/Pr8/Fx9BICcGxAAACAjQAAAgIwAAQAAMgIEAADICBAAACAjQAAAgIwAAQAAMgIEAADICBAAACAjQAAAgIwAAQAAMgIEAADICBAAACAjQAAAgIwAAQAAMgIEAADICBAAACDzsfoAAGd2uVxWH+G/3G63f/591fmPdp5RW+cH4DE3IAAAQEaAAAAAGQECAABkBAgAAJARIAAAQMYKFsAOVq0kja5Ija5Rzfr9qLN8TwAecwMCAABkBAgAAJARIAAAQEaAAAAAGQECAABkrGABhGatKh1tFepo5xm16vwA78gNCAAAkBEgAABARoAAAAAZAQIAAGQECAAAkLGCBcDTjraOBcBxuQEBAAAyAgQAAMgIEAAAICNAAACAjAABAAAyVrAA+GZrvWp07co6FgB/cwMCAABkBAgAAJARIAAAQEaAAAAAGQECAABkrGABhM6+/jS6drW3s39PgHfkBgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMhYwQLYwapVqFFb5xxdu9p7Hess3xOAx9yAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGStYAE/YWn86u9HVqVkrVa/6PQG4cwMCAABkBAgAAJARIAAAQEaAAAAAGQECAABkrGABPGF0/Wlr5Wnv52z9ftV5toyef29HOw/AK3ADAgAAZAQIAACQESAAAEBGgAAAABkBAgAAZKxgARzAq65j7W3vlSprVwDzuQEBAAAyAgQAAMgIEAAAICNAAACAjAABAAAyVrAAQnuvSI0+f9Y61pajrWnNeq91LICfcwMCAABkBAgAAJARIAAAQEaAAAAAGQECAABkrGABPGHWytPoqtLoetXoc2b9ftaa1ujzVz0HgMfcgAAAABkBAgAAZAQIAACQESAAAEBGgAAAABkrWAA7mLWqNGulatXK1qhV5997tQyAOzcgAABARoAAAAAZAQIAAGQECAAAkBEgAABAxgoWwIGtWluatRY1+vzR955l3QuAOzcgAABARoAAAAAZAQIAAGQECAAAkBEgAABAxgoWwBNmrULtbXR1atbzt77PrO92lu8PwJ0bEAAAICNAAACAjAABAAAyAgQAAMgIEAAAIGMFC2AHs9alRq1ahZr13tE1rb1tvXfV/xfgFbgBAQAAMgIEAADICBAAACAjQAAAgIwAAQAAMlawAEJ7r0WNGl15mrVSteo5R1vZAnhHbkAAAICMAAEAADICBAAAyAgQAAAgI0AAAICMFSwAvlm1CjW67jW6djXrvQD8nBsQAAAgI0AAAICMAAEAADICBAAAyAgQAAAgYwUL4I1trT/NWpcaNfreWecfXf2ymgXwc25AAACAjAABAAAyAgQAAMgIEAAAICNAAACAjBUsgNDR1pOOtnY16zmz1q4AmM8NCAAAkBEgAABARoAAAAAZAQIAAGQECAAAkLGCBbCDd1tbGl2jmrWydbTnAPCYGxAAACAjQAAAgIwAAQAAMgIEAADICBAAACBjBQvgCWdfT3q3FamznBPglbkBAQAAMgIEAADICBAAACAjQAAAgIwAAQAAMgIEAADICBAAACAjQAAAgIwAAQAAMgIEAADICBAAACAjQAAAgIwAAQAAMgIEAADICBAAACAjQAAAgIwAAQAAMpfr9XpbfQgAAOA9uAEBAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMgIEAAAICNAAACAjAABAAAyAgQAAMj8AVDxGBTzDcHDAAAAAElFTkSuQmCC'

    // マーカーを取得
    error_i = 2
    // let marker = await get_marker(browser, qr);

    // test
    // await up_test(browser, qr);

    return qr;

  } catch(error) {
    console.log(`error_i: ${error_i}`);
    console.log(error);
  } finally {
    // ブラウザを閉じる
    browser.close();
  }

}

// upload test
async function up_test(browser, qr) {
  // ページを作成
  const page = await browser.newPage();

  // QR生成サイトにアクセス
  error_code = 1
  await page.goto('http://localhost:5000/pupeteer_test.html');

  // データ入力フォームのレンダリング待機
  error_code = 2
  await page.waitForSelector('#input_test');

  // フォームにuidを入力
  error_code = 3
  await page.type('#input_test', qr);

  // 入力欄のテキストを確認
  var test = await page.$eval('#input_test', selector => selector.value);
  console.log('input_test => ', test);
}

// QRを作成
async function get_qr(browser, uid) {

  // 戻り値を用意
  let viewSource = null;

  // エラーコードを用意
  var error_q = 0;

  try {

    // ページを作成
    const page = await browser.newPage();

    // QR生成サイトにアクセス
    error_q = 1
    await page.goto('https://qr.quel.jp/text.php');

    // データ入力フォームのレンダリング待機
    error_q = 2
    await page.waitForSelector('#txtdata');

    // フォームにuidを入力
    error_q = 3
    await page.type("#txtdata", uid);

    // 入力欄のテキストを確認
    var value = await page.$eval('#txtdata', selector => selector.value);
    console.log(`#txtdata => ${value}`);

    // QRを作成
    error_q = 4
    await page.click('#btn_make');

    // QRコード出現まで待機
    error_q = 5
    await page.waitForSelector('#qr_img');

    // QR要素を取得
    error_q = 6

    const qr_image = await page.$('#qr_img');
    console.log(`qr_image => ${qr_image}`);

    // QR要素内のsrcを取得
    error_q = 7
    let qr_src = null;
    var count = 1
    while(true) {
      console.log(`count => ${count}`);
      qr_src = await (await qr_image.getProperty("src")).jsonValue();

      if (qr_src.match(/(.png)$/) || count == 30) {
        break;
      }

      count++;
      // 待機
      await page.waitFor(300);
    }
    console.log(`qr_src => ${qr_src}`);
    console.log(`qrsrc(type) => ${typeof qr_src}`);

    // file_nameを生成
    error_q = 8
    const file_name = qr_src.match(/([a-z]|[0-9])+(.png)$/)[0];
    console.log(`file_name => ${file_name}`);
    // console.log(`file_name(type) => ${typeof file_name}`);

    // QRコードのURLを開く
    error_q = 9
    viewSource = await page.goto(qr_src);
    console.log(`viewSource => ${viewSource}`);
    // console.dir(viewSource);

    // スクリーンショットを取得
    error_q = 10
    const ss = await (await page.screenshot({path: file_name, fullPage: true})).toString('base64');
    console.log(`ss => ${ss}`);
    console.log(`ss(type) => ${typeof ss}`);

    //QRファイルをアップロード
    // await sao.upload_qr(file_name, ss);

    return ss;

  } catch(error) {
    console.log(`error_q: ${error_q}`);
    console.log(error);
  }

};

async function get_marker(browser, qr) {

  // エラーコードを用意
  var error_m = 0

  try {

    // ページを作成
    const page = await browser.newPage();

    // ARマーカー生成サイトにアクセス
    error_m = 1
    await page.goto('https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html');

    // #imageContainerのimageタグが出現するまで待機
    error_m = 2
    // await page.waitForXPath('//*[@id="imageContainer"]/img');
    await page.waitForSelector('#fileinput');

    // マーカーを生成
    error_m = 3
    const result = await page.type('#fileinput', `data:image/png;base64,${qr}`);
    // const result = await page.$x('//*[@id="imageContainer"]/img');
    // const result = await page.type('//*[@id="imageContainer"]/img', `data:image/png;base64,${qr}`);
    console.log(`result => ${result}`);
    console.dir(result);


    // 待機
    await page.waitFor(1000 * 60);

  } catch(error) {
    console.log(`error_m: ${error_m}`);
    console.log(error);
  }
}
