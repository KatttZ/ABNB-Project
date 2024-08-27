'use strict';

/** @type {import('sequelize-cli').Migration} */

const {SpotImage} = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const spotImages = [
  {
    spotId:1,
    url:'https://placehold.co/200X150',
    preview:true
  },
  {
    spotId:2,
    url:'https://placehold.co/200X150',
    preview:true
  },
  {
    spotId:3,
    url:'https://placehold.co/200X150',
    preview:true
  },
  {
    spotId: 4,
    url: 'https://placehold.co/200X150',
    preview: true
  },
  {
    spotId: 5,
    url: 'https://placehold.co/200X150',
    preview: true
  },
  {
    spotId: 6,
    url: 'https://placehold.co/200X150',
    preview: true
  },
  {
    spotId: 7,
    url: 'https://placehold.co/200X150',
    preview: true
  },
  {
    spotId: 8,
    url: 'https://placehold.co/200X150',
    preview: true
  },
  {
    spotId: 9,
    url: 'https://placehold.co/200X150',
    preview: true
  },
  {
    spotId: 10,
    url: 'https://placehold.co/200X150',
    preview: true
  },
  {
    spotId: 11,
    url: 'https://placehold.co/200X150',
    preview: true
  },
  {
    spotId: 12,
    url: 'https://placehold.co/200X150',
    preview: true
  },
]
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate(spotImages, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, spotImages, {});

  }
};
