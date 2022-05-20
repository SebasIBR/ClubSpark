module.exports=function(sequelize,DataTypes){

    let alias="users";

    let cols={
        id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        username:{type: DataTypes.TEXT, allowNull: false},
        email:{type: DataTypes.TEXT, allowNull: false, unique: true},
        password:{type: DataTypes.TEXT},
        type:{type: DataTypes.TEXT},
        image:{type: DataTypes.TEXT}
    }
    let config={
        tableName:"user",
        timestamps:false   
    }
    let users=sequelize.define(alias,cols,config)

    users.associate=function(models){
        users.hasMany(models.publication,{
            as:"users",
            foreignKey:"user_id"
        })
    }

    return users
}