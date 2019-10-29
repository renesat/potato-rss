
const routerWrap = (router) => {
  return (app) => app.use('/', router);
};

module.exports.routerWrap = routerWrap;
