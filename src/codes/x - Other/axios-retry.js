/**
  axios retry

  @author Witee<github.com/Witee>
  @date   2019-08-19
*/

const axios = require('axios');
const _ = require('lodash');
const async = require('async');

const axiosRetry = {
  post: (url, data, config) => {
    const api = (cb) => {
      axios
        .post(url, data, config)
        .then(
          (res) => {
            console.log('post success');
            cb(null, res);
          },
          (failed) => {
            console.log('post failed');
            cb(failed);
          }
        )
        .catch((err) => {
          console.log('post error');
          cb(err);
        });
    };

    return new Promise((resolve, reject) => {
      const retryOpt = {
        times: 3,
        errorFilter: (err) => {
          const status = _.parseInt(_.get(err, 'response.status', 500)); // 只重试指定返回码的请求
          return status >= 500;
        },
      };

      async.retry(retryOpt, api, (err, result) => {
        if (err) reject(err);

        resolve(result);
      });
    });
  },
};

(async () => {
  const res = await axiosRetry.post('http://127.0.0.1:9527/test');

  console.log('res: ', res.data);
})();
