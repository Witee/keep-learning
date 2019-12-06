const restify = require('restify');
const i18n = require('./i18n');

const server = restify.createServer();

const languages = ['zh', 'en'];
const defaultLanguage = 'en';
const langs = { en: { token: 'xxx' }, zh: { token: 'Token 错误' } };

const pre = [
  (req, res, next) => {
    console.log('pre chain: ', req.href());
    next();
  },
];

const user = (req, res, next) => {
  console.log('use chain -> user');

  const cfg = { language: 'en' };

  req.user = cfg;
  next();

  console.log('return user');
};
const i18nMiddle = i18n.middleWare(languages, defaultLanguage, langs);

server.pre(pre);

server.use(user);
server.use(i18nMiddle);

const chains = [
  function(req, res, next) {
    console.log('pass get /');

    return next(new restify.errors.BadRequestError('token'));
  },
];

server.get('/', chains);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
