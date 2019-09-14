const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Comment = sequelize.define('Comment', {
        content: {
            type: Sequelize.TEXT,
            allowNull: false,
            required: true
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
            required: true,
            defaultValue: Sequelize.NOW
        }
    });
    Comment.associate = (models) => {
        Comment.belongsTo(models.User, {
            foreignKey: 'authorId',
            targetKey: 'id'
        });
        Comment.belongsTo(models.Article, {
            foreignKey: 'articleId',
            targetKey: 'id'
        });
    };
    return Comment;
};
