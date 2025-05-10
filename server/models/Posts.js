const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) =>{

    const Posts = sequelize.define("Posts", {
        title: {
            type: DataTypes.STRING,
            allowNull: false /** NOT NULL*/
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false /** NOT NULL*/
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false /** NOT NULL*/
        },
    })

    return Posts
}