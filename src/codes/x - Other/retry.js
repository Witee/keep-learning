/**
  async.retry 用法

  api 为异步函数，
  成功时调用 callback 函数，将第一个参数设置为 null，第二个参数为数据；
  失败时第一个参数设置为出错信息，即可实现重试

  @author Witee<github.com/Witee>
  @date   2019-05-10
*/

const async = require('async');
const _ = require('lodash');
const retryOpt = {
  times: 3,
  errorFilter: (err) => {
    const status = _.parseInt(_.get(err, 'response.status', 500)); // 只重试指定返回码的请求
    return status >= 500;
  },
};

const api = (callback) => {
  const timeOut = Math.random() * 2;
  setTimeout(() => {
    if (timeOut < 1) {
      console.log('call success');
      callback(null, '200 OK');
    } else {
      console.log('call failed');
      callback('api error');
    }
  }, timeOut * 1000);
};

async.retry(retryOpt, api, (err, result) => {
  if (err) {
    console.log('err: ', err);
  } else {
    console.log('result: ', result);
  }
});

// 如果 api 返回 promise，则会报 TypeError: callback is not a function
// 此时需要使用 promise 的 then() 方法定义 api

const api2 = (callback) => {
  const timeOut = Math.random() * 2;
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (timeOut < 1) {
        resolve();
      } else {
        reject();
      }
    }, timeOut * 1000);
  })
    .then(() => {
      console.log('api2 call success');
      callback(null, 'api2 200 OK');
    })
    .catch(() => {
      console.log('api2 call failed');
      callback('api2 api error');
    });
};

async.retry(retryOpt, api2, (err, result) => {
  if (err) {
    console.log('err: ', err);
  } else {
    console.log('result: ', result);
  }
});
