const db = require('../common/basicConnection');
const sqlCommand = require('../common/sqlCommand');
const logger = require('../../app/conf/logs/logConfig').logger;


/*查询drug_disease_dict表*/
function queryCdeInformation(param,cb) {
  // 执行query
  db.queryArgs(sqlCommand.querCdeInformation.queryByCtrId, param,
    function(err,result) {
      if(err) {
        logger.info("查询CDE异常信息：" + err);
      }
      cb(result);
  })
}

/*addCDE信息*/
function addCdeInformation(param) {
  // 执行query
  db.queryArgs(sqlCommand.addCdeInformation.insertOne, param,
    function(err,result) {
      if(!err) {
        result = {
          code: 200,
          msg: 'successful'
        };
        logger.info("新增CDE信息成功："+ JSON.stringify(result));
      }else{
        logger.info("异常信息：" + err);
      }
  })
}

/*UPDATE CDE信息*/
function updateCdeInformation(param) {
  // 执行query
  db.queryArgs(sqlCommand.updateCdeInformation.updateByCtrId, param,
    function(err,result) {
      if(!err) {
        result = {
          code: 200,
          msg: 'successful'
        };
        logger.info("更新CDE信息成功："+ JSON.stringify(result));
      }else{
        logger.info("异常信息：" + err);
      }
  })
}

/*exports*/
module.exports = {
  queryCdeInformation: queryCdeInformation,
  addCdeInformation: addCdeInformation,
  updateCdeInformation: updateCdeInformation
};
