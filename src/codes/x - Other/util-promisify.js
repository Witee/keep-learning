/**
  util.promisify 与 async.mapLimit 结合使用

  @author Witee<github.com/Witee>
  @date   2019-08-28
*/

const { promisify } = require('util');
const { mapLimit } = require('async');

const asyncMapLimit = promisify(mapLimit);

(async () => {
  const ids = [1, 2, 3, 4];

  const task = async (id) => {
    console.log('id: ', `${new Date().toLocaleString()} - ${id}`);

    // 可返回 promise
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(id);
      }, 1000);
    });

    // 或直接返回值
    // return id;
  };

  const newIds = await asyncMapLimit(ids, 2, task);

  console.log('newIds: ', newIds);
})();
