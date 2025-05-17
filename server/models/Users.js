module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false /** NOT NULL*/
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false /** NOT NULL*/
        },
    });

    Users.associate = (models) => {
        // User 1 - N Posts
        Users.hasMany(models.Posts, {
            onDelete: "cascade", /* Se elimino un post elimino tutti i commenti associati ad esso */
        })

        // User 1 - N Likes
        Users.hasMany(models.Likes, {
            onDelete: "cascade",
        })
    }

    return Users
}