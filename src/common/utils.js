
function routerWrap(router) {
    let localRouter = router;
    return app => app.use('/', localRouter);
}

module.exports.routerWrap = routerWrap;
