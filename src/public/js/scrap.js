const puppeteer = require('puppeteer')
const find = "cali";
const testModule = "esa es papi";
(async () => {
   const browser = await puppeteer.launch();

   const page = await browser.newPage();

   await loadUrl(page, "https://www.google.com/search?q="+find, browser)
})();

async function loadUrl(page, url, browser) {
   await page.goto(url,{waitUntil :['load','domcontentloaded','networkidle0','networkidle2']});

   
   const info = await page.$eval("div.UDZeY.OTFaAf", el=>el.innerText);
  
   console.log(info)

   await browser.close();
   return info
}