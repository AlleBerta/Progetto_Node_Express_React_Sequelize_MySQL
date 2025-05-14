module.exports = (sequelize, DataTypes) =>{
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

    // 1 User can have many Posts
    Users.associate = (models) => {
        Users.hasMany(models.Posts, {
            onDelete: "cascade", /* Se elimino un post elimino tutti i commenti associati ad esso */
        })
    }

    return Users
}