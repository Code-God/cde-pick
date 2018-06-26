const mysql = require('mysql');
const dbConfing = require('../conf/database_dev');
const log4js = require('log4js');
const logger = log4js.getLogger('info');

/*使用连接池*/
const pool = mysql.createPool(dbConfing.mysql);

/*对query执行的结果自定义返回json结果*/
function responseDoReturn(result) {
  if(typeof(result) === 'undefined') {
    logger.info("result：" + JSON.stringify(result));
  } else {
    logger.info("执行成功 => result：" + JSON.stringify(result));
  }
  return result
}

/*封装query之sql不带占位符function*/
function query(sql,callback) {
  pool.getConnection((err, connection) => {
    connection.query(sql, (err,rows) => {
      callback(err,rows);
      connection.release();
    })
  })
}

/*封装query之sql带占位符function*/
function queryArgs(sql,args,callback) {
  pool.getConnection((err,connection) => {
    if(err){
      logger.info("数据库连接异常："+ err);
    }
    connection.query(sql,args, (err,rows) => {
      callback(err,rows);
      connection.release();
    })
  })
};

/*单连接*/
const conn =  mysql.createConnection(dbConfing.mysql);

/*连接数据库*/
function connect(){
  //连接错误，2秒重试
  conn.connect(function (err) {
      if (err) {
          logger.info('数据库连接错误自动重连：', err);
          setTimeout(handleError , 2000);
          connect();
      }
  });
}

/*监听当前连接*/
function handleError () {
    conn.on('error', function (err) {
      if(err){
        logger.info("连接断开,自动重连...");
        connect();
      }
    });
}

/*执行数据库操作*/
function connectToDb(sql,args,callback){
  handleError();
  conn.query(sql,args, function (err, rows) {
    if (err) {
      logger.info("操作数据库异常："+err);
    }
    callback(err,rows);
  });
}


/*exports*/
module.exports = {
  query: query,
  queryArgs: queryArgs,
  doReturn: responseDoReturn,
  connectToDb: connectToDb
};
