module.exports = (sequelize, DataTypes) =>{

    const Comments = sequelize.define("Comments", {
        commentBody: {
            type: DataTypes.STRING,
            allowNull: false /** NOT NULL*/
        },
    })

    Comments.associate = (models) => {
        Comments.belongsTo(models.Posts, {
            foreignKey: "postId",
        });
    };


    return Comments
}