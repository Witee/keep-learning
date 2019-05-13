/**
  async.retry 用法

  api 为异步函数，
  成功时调用 cb 函数，将第一个参数设置为 null，第二个参数为数据；
  失败时第一个参数设置为出错信息，即可实现重试

  @author Witee<github.com/Witee>
  @date   2019-05-10
*/

const async = require('async');

const api = (cb) => {
  const timeOut = Math.random() * 2;
  setTimeout(() => {
    if (timeOut < 1) {
      console.log('call success');
      cb(null, '200 OK');
    } else {
      console.log('call failed');
      cb('api error');
    }
  }, timeOut * 1000);
};

const retryOpt = {
  times: 3,
  errorFilter: (err) => {
    const status = _.parseInt(_.get(err, 'response.status', 500)); // 只重试指定返回码的请求
    return status >= 500;
  },
};
async.retry(retryOpt, api, (err, result) => {
  if (err) {
    console.log('err: ', err);
  } else {
    console.log('result: ', result);
  }
});
