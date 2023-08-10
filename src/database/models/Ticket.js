module.exports = (sequelize, dataTypes) => {
    let alias = "Tickets";
    let cols = {
        id:{
         type: dataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
        },
        fecha:{
         type: dataTypes.DATE
        },
        usuario_id:{
         type: dataTypes.BIGINT
        },
        estado:{
        type: dataTypes.STRING
        },
        deletedAT:{
            type: dataTypes.DATE
           }
        
    };
    let config = {
        tableName: "Tickets",
        timestamps: true
    }
    
    const Ticket = sequelize.define(alias, cols, config);

    Ticket.associate = function(models){
        Ticket.belongsTo(models.Productos_tickets, {
            as: "Productos_tickets",
            foreignKey: "id_ticket"
        })
    }

    Ticket.associate = function(models){
        Ticket.belongsTo(models.Usuarios, {
            as: "Usuarios",
            foreignKey: "usuario_id"
        })
    }

    return Ticket;
}