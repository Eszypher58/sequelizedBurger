module.exports = function(sequelize, DataType) {

    var Customer = sequelize.define("customer", {

        name: {

            type: DataType.STRING,
            allowNull: false,
            validate: {

                notEmpty: true,

            }

        },

        eaten_burger: {

            type: DataType.STRING,
            validate: {

                notEmpty: true,

            }

        }


    });

    return Customer;

}