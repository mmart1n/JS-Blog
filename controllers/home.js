const Home = require('../models').Home;
const Article = require('../models').Article;
const User = require('../models').User;
const Sequelize = require('sequelize');

module.exports = {
    index: (req, res) => {
        Article.findAll({order: Sequelize.literal('updatedAt DESC'), limit: 6, include: [{
            model: User
        }]}).then(articles=>{
            res.render('home/index', {articles: articles});
        })
    }
};




