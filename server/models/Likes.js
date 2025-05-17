module.exports = (sequelize, DataTypes) => {

    const Likes = sequelize.define("Likes")

    Likes.associate = (models) => {
        Likes.belongsTo(models.Posts, {
            foreignKey: "PostId",
        });

        Likes.belongsTo(models.Users, {
            foreignKey: "UserId",
        });
    };

    return Likes
}