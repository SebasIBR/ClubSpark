module.exports=function(sequelize,DataTypes){

    let alias="users";

    let cols={
        id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        username:{type: DataTypes.TEXT, allowNull: false, unique: true},
        email:{type: DataTypes.TEXT, allowNull: false, unique: true},
        password:{type: DataTypes.TEXT, allowNull: false, unique: true},
        type:{type: DataTypes.TEXT, allowNull: false, unique: true},
        image:{type: DataTypes.TEXT, allowNull: false, unique: true}
    }
    let config={
        tableName:"user",
        timestamps:false   
    }
    let users=sequelize.define(alias,cols,config)

    users.associate=function(models){
        users.hasMany(models.publication,{
            as:"publications",
            foreignKey:"user_id"
        })
    }

    return users
}