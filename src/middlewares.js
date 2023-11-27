import multer from "multer";

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
// logged-in cannot access to 'login' 'join'
export const publicOnlyMiddleware = (req, res, next) => {
    if(req.session.loggedIn) {
        return res.redirect("/");
    }
    next();
};
export const avatarUpload = multer({dest: "uploads/avatars/", limits:{
    fileSize: 3000000,
}});
export const videoUpload = multer({dest: "uploads/videos/", limits:{
    fileSize: 10000000,
}});
