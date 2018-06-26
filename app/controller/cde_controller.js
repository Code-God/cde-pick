const puppeteer = require('puppeteer');
const {timeout} = require('../common/tools/tools.js');
const cdeService = require('../service/cde_service.js');
const logger = require('../../app/conf/logs/logConfig').logger;

//需要爬取的数据
let num = 500;

//主程序
function start(req, res, next) {
  gitPic();
  res.send("欢迎使用CDE信息采集系统！")
}

async function gitPic() {
  /*puppeteer程序*/
  puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']}).then(async browser => {
      let page = await browser.newPage();
      page.setViewport({width: 1200, height: 900});

      /** 1. 进入cde临床试验列表页 **/
      try {
          logger.info("==========cde信息采集开始==========");
          await page.goto('http://www.chinadrugtrials.org.cn/eap/clinicaltrials.searchlist');
          logger.info("=====已进入cde临床试验列表主页=====");
          await timeout(5000);

          /** 2. 进入cde临床试验详细信息 **/
          let page_1 = await page.$('.Tab > tbody > tr:nth-child(2) > td:nth-child(2) > a');
          await page_1.click();
          logger.info("====已进入cde临床试验详细信息页====");
          await timeout(5000);
      } catch (e) {
        logger.info("进入页面异常" + e);
      }

      /** 3. 抓取数据 **/
      try {
        cdeService.getData(page);
        await timeout(3000);
        for (let i = 1; i < num; i++) {
          const page_2 = await page.$('.next_test');
          await page_2.click();
          await timeout(5000);
          cdeService.getData(page);
          await timeout(3000);
        }
      } catch (e) {
        logger.info("抓取数据异常信息：" + e);
      }

      let flag = cdeService.getFlag();
      if (flag === 0) {
        logger.info("~~~~~~~~当前暂无可更新信息~~~~~~~~~");
      } else {
        cdeService.setFlag();
        logger.info("~~~~~~~~cde信息采集完成,已更新或新增:"+flag+"条数据~~~~~~~~~");
      }
      await page.close();
      browser.close()
  })
}

module.exports = {
  start: start
};
