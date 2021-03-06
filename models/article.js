const Sequelize = require('sequelize');

module.exports = function(sequelize){
    const Article = sequelize.define('Article', {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            required: true
        },
        image:{
            type: Sequelize.TEXT,
            allowNull: false,
            required: true,
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false,
            required: true
        },
        date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            required: true,
            defaultValue: Sequelize.NOW
        }
    });
    Article.associate = function(models) {
        Article.belongsTo(models.User, {
            foreignKey: 'authorId',
            targetKey: 'id'
        });
        Article.hasMany(models.Comment, {
            foreignKey: 'articleId',
            sourceKey: 'id',
            onDelete: 'CASCADE'
        });
    };

    return Article;
};