module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define("Company", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      linkedCompanies: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      requests: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
  
    return Company;
  };