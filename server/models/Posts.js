module.exports = (sequelize, DataTypes) => {

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

    Posts.associate = (models) => {
        // Posts 1 - N Comments
        Posts.hasMany(models.Comments, {
            onDelete: "cascade", /* Se elimino un post elimino tutti i commenti associati ad esso */
        })

        // Posts 1 - N Likes
        Posts.hasMany(models.Likes, {
            onDelete: "cascade",
        })
    }

    return Posts
}