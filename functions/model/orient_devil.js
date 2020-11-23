// const {Builder, By, Key, until} = require('selenium-webdriver');
// const chrome = require('selenium-webdriver/chrome');
//
// const options = new chrome.Options();
//
// exports.chrome_test = async () => {
//   let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
//
//   try {
//     console.log('driver => ', driver);
//
//     // 3秒待機
//     // await sleep(3000)
//
//     return "guaa";
//   } catch(error) {
//     console.log('driver error');
//   } finally {
//     await driver.quit();
//   }
//
//   return "pien";
//
//   function sleep(time) {
//     const d1 = new Date();
//     while(true) {
//       const d2 = new Date();
//       if (d2 - d1 > time) {
//         return;
//       }
//     }
//   };
// }

//*[@id="gb"]/div[2]/div[3]/div[1]/div/div[1]/a



const puppeteer = require('puppeteer');
const sao = require('./sao.js');

exports.pup_test = async() => {
  // 入力用テキストを用意
  let text = `https://test`;

  // ブラウザを開く
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });

  // 確認：エラーコード設定
  error = 0

  try {

    // テスト用
    // タブを作成
    const page = await browser.newPage();

    // QR生成サイトにアクセス
    error = 1
    await page.goto('https://qr.quel.jp/url.php');
    // await page.goto('http://localhost:5000/pupeteer_test.html');

    // データ入力フォームのレンダリング待機
    error = 2
    await page.waitForSelector('#txtdata');
    // await page.waitForSelector('#input_test');

    // フォームにuidを入力
    error = 3
    await page.type("#txtdata", text);
    // await page.type('#input_test', text);

    // 入力欄のテキストを確認
    // var test = await page.$eval('#input_test', selector => selector.value);
    // console.log('input_test => ', test);
    var value = await page.$eval('#txtdata', selector => selector.value);
    console.log(`#txtdata => ${value}`);

    // 待機
    // await page.waitFor(1000 * 2);

    // フォームを送信
    await page.click('#btn_make');



  } catch(error) {
    console.log(`error: ${error}`);
  } finally {
    browser.close();
  }

  return 'guaa';
}
