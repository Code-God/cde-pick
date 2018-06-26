const {timeout} = require('./tools/tools.js');
const consts = require('./tools/cde_const.js');

function grabDataCde(page){
  return new Promise(resolve => {
    resolve(grabData_cde(page));
  })
}

/**数据抓取**/
async function grabData_cde(page){
  let ctrId = (await page.$eval(consts.el.EL_CTR_ID, ele => ele.innerHTML)).trim(); //登记号
  let dicDiseaseName = (await page.$eval(consts.el.EL_CDE_NAME, ele => ele.innerHTML)).trim();//药物名称
  let dicDiseaseIntroduction = (await page.$eval(consts.el.EL_CDE_INTRODUCTION, ele => ele.innerHTML)).trim();//实验通俗题目
  let dicDiseaseProfile = (await page.$eval(consts.el.EL_PROFILE, ele => ele.innerHTML)).trim();//试验专业题目
  let publishDate = (await page.$eval(consts.el.EL_PUBLISH_DATE, ele => ele.innerHTML)).trim();//首次公示日期
  let adaptation = (await page.$eval(consts.el.EL_ADAPTATION, ele => ele.innerHTML)).trim();//适应症
  let dicMedicinetType = (await page.$eval(consts.el.EL_DICMEDICINE_TYPE, ele => ele.innerHTML)).trim();//药物类型
  let designPurpose = (await page.$eval(consts.el.EL_PURPOSE, ele => ele.innerHTML)).trim();//实验目的
  let designStage = (await page.$eval(consts.el.EL_STAGE, ele => ele.innerHTML)).trim();//实验分期
  let designType = (await page.$eval(consts.el.EL_DESIGN_TYPE, ele => ele.innerHTML)).trim();//设计类型
  let randomize = (await page.$eval(consts.el.EL_RANDOMIZE, ele => ele.innerHTML)).trim();//随机化
  let blindMethod = (await page.$eval(consts.el.EL_BLIND_METHOD, ele => ele.innerHTML)).trim();//盲法
  //入选标准
  const result_1 = await page.evaluate(() => {
    let arr = document.querySelectorAll('#stTable');
    let elements = arr[0].querySelectorAll('#stTable td');
    let title = "";
    for (let element of elements){ // 循环
      title = title + element.innerText.trim() + " ";
    }
    return title; // 返回数据
  });
  //排除标准
  const result_2 = await page.evaluate(() => {
    let arr = document.querySelectorAll('#stTable');
    let elements = arr[1].querySelectorAll('#stTable td');
    let title = "";
    for (let element of elements){ // 循环
      title = title + element.innerText.trim() + " ";
      }
    return title; // 返回数据
  });
  //对照药
  const result_3 = await page.evaluate(() => {
    let elements = document.querySelectorAll('#div_open_close_01 > table:nth-child(12) > tbody > tr:nth-child(15) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td');
    let title = "";
    for (let element of elements){ // 循环
      title = title + element.innerText.trim() + " ";
    }
    return title; // 返回数据
  });

  //申办者名称
  let sponsorinfo = (await page.$eval(consts.el.EL_SPONSORINFO, ele => ele.innerHTML)).trim();

  //试验状态
  let state = (await page.$eval(consts.el.EL_STATE, ele => ele.innerHTML)).trim();
  //替换所有的换行符
  state = state.replace(/\r\n/g,"")
  state = state.replace(/\n/g,"");
  //替换所有的空格（中文空格、英文空格都会被替换）
  state = state.replace(/\s/g,"");


  if('进行中（尚未招募）'.indexOf(state) !== -1) {
    state = 1;
  }else if ('进行中（招募中）'.indexOf(state) !== -1) {
    state = 2;
  }else if ('进行中（招募完成）'.indexOf(state) !== -1) {
    state = 3;
  }else if ('已完成'.indexOf(state) !== -1) {
    state = 4;
  }else if ('主动暂停'.indexOf(state) !== -1) {
    state = 5;
  }

  let data = [
    ctrId,
    dicDiseaseName,
    dicDiseaseIntroduction,
    dicDiseaseProfile,
    publishDate,
    adaptation,
    dicDiseaseIntroduction,
    dicDiseaseProfile,
    dicMedicinetType,
    designPurpose,
    designStage,
    designType,
    randomize,
    blindMethod,
    result_1,
    result_2,
    result_3,
    sponsorinfo,
    state
  ];
  return data;
}

/**数据抓取**/
function grabDataDrug(page){
  return new Promise(resolve => {
    resolve(grabData_drug(page));
  })
}

/**各参加架构信息**/
async function grabData_drug(page){
  let dataDrug = await page.evaluate(() => {
    let data = [];
    let trElements = document.querySelectorAll('#hspTable tr');
    // 循环
    for (let trElement of trElements){
      let tdElements = trElement.querySelectorAll('#hspTable tr td');
      let data_1 = [];
      // 循环
      for (let tdElement of tdElements){
        data_1.push(tdElement.innerText.trim());
      }
      data.push(data_1);
      console.log(data)
    }
    return data;
  });
  return dataDrug;
}



/*exports*/
module.exports = {
  grabDataCde: grabDataCde,
  grabDataDrug: grabDataDrug
};
