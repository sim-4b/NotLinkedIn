module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyFK: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      requests: {
        type: DataTypes.STRING,
        allowNull: true,
      },

    });
  
    return Users;
  };