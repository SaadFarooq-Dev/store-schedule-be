'use strict';
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: uuidv4(),
          name: "Dev User",
          email: "dev@dev.com",
          password: await bcrypt.hash("123456", bcrypt.genSaltSync(10)),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { validate: true, individualHooks: true }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  }
};
