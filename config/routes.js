const userController = require('../controllers').user;
const homeController = require('../controllers').home;
const articleController = require('../controllers').article;

module.exports = (app) =>{
    app.get('/',homeController.index);

    app.get('/user/register', userController.registerGet);
    app.post('/user/register', userController.registerPost);
    app.get('/user/login',userController.loginGet);
    app.post('/user/login',userController.loginPost);
    app.get('/article/create', articleController.createGet);
    app.post('/article/create', articleController.createPost);
    app.get('/article/details/:id', articleController.details);
    app.post('/article/details/:id/comment/add', articleController.commentAddPost);
    app.get('/user/articles', userController.articlesGet);
    app.get('/user/logout',userController.logout);
    app.get('/article/delete/:id', userController.articleDeleteGet);
    app.get('/article/edit/:id', userController.articleEditGet);
    app.post('/article/edit/:id', userController.articleEditPost);
};
