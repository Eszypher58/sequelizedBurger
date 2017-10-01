module.exports = function(sequelize, DataType) {

    var Customer = sequelize.define("customer", {

        name: {

            type: DataType.STRING,

        },

        eaten_burger: {

            type: DataType.STRING,

        }


    });

    return Customer;

}