module.exports=function(sequelize,DataTypes){

    let alias="publication";

    let cols={
        id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        image:{type: DataTypes.TEXT, allowNull: false, unique: true},
        description:{type: DataTypes.TEXT, allowNull:false, unique:true},
        user_id:{type: DataTypes.INTEGER, allowNull:false, unique:true}
    }
    let config={
        tableName:"publication",
        timestamps:false   
    }
    let publication=sequelize.define(alias,cols,config)
    
    publication.associate=function(models){
        publication.belongsTo(models.users,{
            as:"users",
            foreignKey:"user_id"
        })
    }

    return publication
}