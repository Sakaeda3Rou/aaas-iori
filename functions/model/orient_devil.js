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

const puppeteer = require('puppeteer');

exports.pup_test = async() => {
  // const browser = await puppeteer.launch({
  //   args: [
  //     '--no-sandbox',
  //     '--disable-setuid-sandbox'
  //
  //   ]
  // });
  //
  // try {
  //   const page = await browser.newPage();
  //   await page.goto('http://google.com');
  //
  // } catch(error) {
  //   console.log('pien');
  // } finally {
  //   browser.close();
  // }

  return 'guaa';
}
