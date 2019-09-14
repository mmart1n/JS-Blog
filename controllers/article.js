const Article = require('../models').Article;
const User = require('../models').User;
const Comment = require('../models').Comment;
const Sequelize = require('sequelize');

module.exports = {
    details: (req, res)=>{
        let id = req.params.id;
        Article.findById(id, {include: [
                {
                    model: User
                },
                {
                    model: Comment,
                    order: [['updatedAt', 'ASC']],
                    limit: 5,
                    offset: 0,
                    include: [{model: User}],
                }
            ],
            }).then(article => [
            res.render('article/details', article.dataValues)
        ])
    },
    createGet: (req, res) =>{
        res.render('article/create');
    },

    createPost: (req, res) => {
        let articleArgs = req.body;
        let errorMsg = '';

        if(!req.isAuthenticated()){
            errorMsg = 'You should be logged in to make articles!';
        }
        else if(!articleArgs.title){
            errorMsg = 'Invalid Title!';
        }
        else if(!articleArgs.content){
            errorMsg = 'Invalid Content!';
        }
        else if(!articleArgs.image){
            errorMsg = 'Invalid Picture!';
        }

        if(errorMsg){
            return res.render('article/create', {error: errorMsg});
        }

        articleArgs.authorId = req.user.id;

        Article.create(articleArgs).then(article => {
            res.redirect('/');
        }).catch(err => {
            console.log(err.message);
            res.render('article/create', {error: err.message})
        })
    },
    commentAddPost: (req,res) => {
        let errorMsg = '';
        let commentArgs = req.body;
        let articleId = req.params.id;
        let comment = {
            content: commentArgs.content,
            authorId: req.user.id,
            articleId: articleId
        };
        if(!req.isAuthenticated()){
            errorMsg = 'You should be logged in to post comments!';
        }
        else if(!commentArgs.content){
            errorMsg = 'Invalid Content!';
        }
        if(errorMsg){
            return res.render('article/create', {error: errorMsg});
        }
        Comment.create(comment).then(() => {
            res.redirect(`/article/details/${articleId}`);
        }).catch(err => {
            console.log(err.message);
            res.render('/', {error: err.message})
        })
    },
};

