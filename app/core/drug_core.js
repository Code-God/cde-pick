const db = require('../common/basicConnection');
const sqlCommand = require('../common/sqlCommand');
const logger = require('../../app/conf/logs/logConfig').logger;


/*查询研究中心表*/
function queryDrugInformation(param,cb) {
  // 执行query
  db.queryArgs(sqlCommand.querDrugInformation.queryByCtrId, param,
    function(err,result) {
      if(err) {
        logger.info("查询研究中心异常信息：" + err);
      }
      cb(result);
  })
}

/*add研究中心信息*/
function addDrugInformation(param) {
  // 执行query
  db.queryArgs(sqlCommand.addDrugInformation.insertOne, param,
    function(err,result) {
      if(!err) {
        result = {
          code: 200,
          msg: 'successful'
        };
        logger.info("新增研究中心数据信息成功："+ JSON.stringify(result));
      }else{
        logger.info("异常信息：" + err);
      }
  })
}

/*exports*/
module.exports = {
  queryDrugInformation: queryDrugInformation,
  addDrugInformation: addDrugInformation
};
