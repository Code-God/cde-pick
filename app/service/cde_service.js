const {timeout} = require('../common/tools/tools.js');
const consts = require('../common/tools/cde_const.js');
const cdeCore = require('../core/cde_core');
const drugCore = require('../core/drug_core');
const dataToGrab = require('../common/dataToGrab');
const logger = require('../../app/conf/logs/logConfig').logger;

//更新记录
let flag = 0;

async function getData(page){
  //登记号
  let ctrId = (await page.$eval(consts.el.EL_CTR_ID, ele => ele.innerHTML)).trim();

  //试验状态
  let state = (await page.$eval(consts.el.EL_STATE, ele => ele.innerHTML)).trim();
  //替换所有的换行符
  state = state.replace(/\r\n/g,"");
  state = state.replace(/\n/g,"");
  //替换所有的空格（中文空格、英文空格都会被替换）
  state = state.replace(/\s/g,"");

  //数据转换
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

  let cdeParam = [ctrId];
  // logger.info("CDE数据检索中..."+ ctrId);
  //访问cde数据库
  let state_1 = await queryCdeInfo(cdeParam);
  //定义CDE空数组
  let dataCde = [];
  //定义研究中心空数组
  let dataDrug = [];

  //根据state_1状态来更新或新增cde信息
  if(state_1 !== "" && state_1 !== state){
    ++flag;
    logger.info(flag + "--CDE数据更新--");
    let options = [state,ctrId];
    //updata
    updateCdeInformation(options);
  }else if(state_1 === ""){
    ++flag;
    logger.info(flag + "--CDE数据新增--");
    //抓取cde数据
    dataCde = await dataToGrab.grabDataCde(page);
    dataDrug = await dataToGrab.grabDataDrug(page);
    if(dataDrug !== ""){
      for(let i = 1; i < dataDrug.length; i++){
        let param = [
          ctrId,
          dataDrug[i][1],
          dataDrug[i][2],
          dataDrug[i][3],
          dataDrug[i][4],
          dataDrug[i][5]
        ];
        //新增研究中心数据
        addDrugInformation(param);
      }
    }
    //add cde信息
    addCdeInformation(dataCde);
  }else {
    // logger.info("CDE数据检索完成！");
  }
}

/*访问cde数据库*/
function queryCdeInfo(options){
  return new Promise((resolve,reject) => {
    cdeCore.queryCdeInformation(options,function(data){
      //定义试验状态
      let state_1 = "";
      //序列化返回数据
      let result = JSON.stringify(data);
      result = JSON.parse(result);
      //获取数据库返回的试验状态
      if(result !== undefined && result.length > 0){
        console.log(result[0]);
        state_1 = result[0].state;
      }
      resolve(state_1);
    })
  });
}

/*add cde*/
function addCdeInformation(param){
  cdeCore.addCdeInformation(param);
}

/*update cde*/
function updateCdeInformation(param){
  cdeCore.updateCdeInformation(param);
}

/*add drug*/
function addDrugInformation(param){
  drugCore.addDrugInformation(param);
}

function getFlag(){
  return flag;
}

function setFlag(){
  flag = 0;
}

/*exports*/
module.exports = {
  getData: getData,
  getFlag: getFlag,
  setFlag: setFlag
};
