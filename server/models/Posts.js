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

    
    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            onDelete: "cascade", /* Se elimino un post elimino tutti i commenti associati ad esso */
            
        })
    }

    return Posts
}