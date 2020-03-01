'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  return app.model.define(
    'user',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: STRING,
      },
      email: {
        type: STRING,
      },
      password: {
        type: STRING,
      },
      image: {
        type: STRING,
      },
    },
    {
      timestamps: true,
    }
  );
};
