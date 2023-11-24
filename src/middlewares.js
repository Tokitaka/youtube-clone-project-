export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user || {};
    next();
};
// not logged-in cannot access to 'private page'
export const protectorMiddleware = (req, res, next) => {
    if(!req.session.loggedIn) {
        return res.redirect("/login");
    }
    next();
};
// session은 프로젝트 전역에서 접근 가능 
// logged-in cannot access to 'login' 'join'
export const publicOnlyMiddleware = (req, res, next) => {
    if(req.session.loggedIn) {
        return res.redirect("/");
    }
    next();
};