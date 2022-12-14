module.exports=function(sequelize,DataTypes){

    let alias="publication";

    let cols={
        id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        image:{type: DataTypes.TEXT},
        description:{type:DataTypes.TEXT},
        user_id:{type: DataTypes.INTEGER}
    }
    let config={
        tableName:"publication",
        timestamps:false   
    }
    let publication=sequelize.define(alias,cols,config)
    
    publication.associate=function(models){
        publication.belongsTo(models.users,{
            as:"publications",
            foreignKey:"user_id"
        })
    }

    return publication
}