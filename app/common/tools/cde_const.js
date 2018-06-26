/**
 * cde页面标签选择器
 */
const consts = {
  EL_CTR_ID:'#div_open_close_01 > table > tbody > tr:nth-child(1) > td:nth-child(2)',//登记号
  EL_CDE_NAME:'#div_open_close_01 > table > tbody > tr:nth-child(7) > td:nth-child(2)',//药物名称
  EL_CDE_INTRODUCTION: '#div_open_close_01 > table > tbody > tr:nth-child(3) > td:nth-child(2)',//试验通俗题目
  EL_PROFILE: '#div_open_close_01 > table > tbody > tr:nth-child(4) > td:nth-child(2)',//试验专业题目
  EL_PUBLISH_DATE: '.cxtj_tm > table > tbody > tr:nth-child(2) > td:nth-child(4)',//首次公示日期
  EL_ADAPTATION: '#div_open_close_01 > table > tbody > tr:nth-child(2) > td:nth-child(2)',//适应症
  EL_DICMEDICINE_TYPE: '#div_open_close_01 > table > tbody > tr:nth-child(8) > td:nth-child(2)',//药物类型
  EL_PURPOSE: '#div_open_close_01 > table:nth-child(12) > tbody > tr:nth-child(2) > td',//试验目的
  EL_STAGE: '#div_open_close_01 > table:nth-child(12) > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(2) > td:nth-child(3)',//试验分期
  EL_DESIGN_TYPE: '#div_open_close_01 > table:nth-child(12) > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(3) > td:nth-child(3)',//设计类型
  EL_RANDOMIZE: '#div_open_close_01 > table:nth-child(12) > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(4) > td:nth-child(3)',//随机化
  EL_BLIND_METHOD: '#div_open_close_01 > table:nth-child(12) > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(5) > td:nth-child(3)',//盲法
  EL_SPONSORINFO: '.cxtj_tm > table > tbody > tr:nth-child(3) > td:nth-child(2)',//申办者名称
  EL_STATE: '#div_open_close_01 > table:nth-child(32) > tbody > tr > td'//试验状态
};

/*exports*/
module.exports = {
  el: consts
};
