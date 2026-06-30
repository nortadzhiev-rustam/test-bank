'use strict';

const DEPARTMENTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'History',
  'Computer Science',
  'Geography',
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert(
      'department',
      DEPARTMENTS.map((name) => ({ name, createdAt: now, updatedAt: now })),
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'department',
      { name: { [Sequelize.Op.in]: DEPARTMENTS } },
      {}
    );
  },
};
