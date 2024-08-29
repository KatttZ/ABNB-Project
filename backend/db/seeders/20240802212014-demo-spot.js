'use strict';

/** @type {import('sequelize-cli').Migration} */
const {Spot} = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const spots = [
  {
    ownerId: 1,
    address: "123 Disney Lane",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 37.7645358,
    lng: -122.4730327,
    name: "App Academy",
    description: "Place where web developers are created, We are Pet Friendly!!!!!!!Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis posuere magna, vel posuere sem. Vivamus aliquam faucibus tortor, ac posuere nulla vehicula pretium. Suspendisse tincidunt justo et risus dapibus tempor. Donec risus nibh, gravida a nunc eget, ullamcorper mattis nisi. ",
    price: 140,
  },
  {
    ownerId: 1,
    address: "456 Disney Lane",
    city: "Los Angeles",
    state: "California",
    country: "United States of America",
    lat: 40.7645358,
    lng: -120.4730327,
    name: "Bpp Academy",
    description: "We are Pet Friendly!!!!!Place where web developers are createdLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis posuere magna, vel posuere sem. Vivamus aliquam faucibus tortor, ac posuere nulla vehicula pretium. Suspendisse tincidunt justo et risus dapibus tempor. Donec risus nibh, gravida a nunc eget, ullamcorper mattis nisi. ",
    price: 140,
  },
  {
    ownerId: 1,
    address: "789 Disney Lane",
    city: "San Diego",
    state: "California",
    country: "United States of America",
    lat: 50.7645358,
    lng: -100.4730327,
    name: "Cpp Academy",
    description: "We are Pet Friendly!!!!Place where web developers are createdLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis posuere magna, vel posuere sem. Vivamus aliquam faucibus tortor, ac posuere nulla vehicula pretium. Suspendisse tincidunt justo et risus dapibus tempor. Donec risus nibh, gravida a nunc eget, ullamcorper mattis nisi. ",
    price: 140,
  },
  {
    ownerId: 2,
    address: "123 Tracy St",
    city: "Houston",
    state: "Texas",
    country: "United States of America",
    lat: 33.7645358,
    lng: -34.4730327,
    name: "Dpp Academy",
    description: "We are Pet Friendly!!!!!Place where web developers are createdLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis posuere magna, vel posuere sem. Vivamus aliquam faucibus tortor, ac posuere nulla vehicula pretium. Suspendisse tincidunt justo et risus dapibus tempor. Donec risus nibh, gravida a nunc eget, ullamcorper mattis nisi. ",
    price: 200,
  },
  {
    ownerId: 2,
    address: "456 Tracy St",
    city: "Dallas",
    state: "Texas",
    country: "United States of America",
    lat: 21.7645358,
    lng: -39.4730327,
    name: "Epp Academy",
    description: "We are Pet Friendly!!!!!!!Place where web developers are createdLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis posuere magna, vel posuere sem. Vivamus aliquam faucibus tortor, ac posuere nulla vehicula pretium. Suspendisse tincidunt justo et risus dapibus tempor. Donec risus nibh, gravida a nunc eget, ullamcorper mattis nisi. ",
    price: 210,
  },
  {
    ownerId: 2,
    address: "789 Tracy St",
    city: "Austin",
    state: "Texas",
    country: "United States of America",
    lat: 63.7645358,
    lng: -80.4730327,
    name: "Fpp Academy",
    description: "Place where web developers are createdLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis posuere magna, vel posuere sem. Vivamus aliquam faucibus tortor, ac posuere nulla vehicula pretium. Suspendisse tincidunt justo et risus dapibus tempor. Donec risus nibh, gravida a nunc eget, ullamcorper mattis nisi. ",
    price: 230,
  },
  {
    ownerId: 3,
    address: "123 Vivian",
    city: "San Jose",
    state: "California",
    country: "United States of America",
    lat: 35.7645358,
    lng: -36.4730327,
    name: "Gpp Academy",
    description: "We are Pet Friendly!!!!!!!Welcome to the brand new Hygge Hideaway!Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis posuere magna, vel posuere sem. Vivamus aliquam faucibus tortor, ac posuere nulla vehicula pretium. Suspendisse tincidunt justo et risus dapibus tempor. Donec risus nibh, gravida a nunc eget, ullamcorper mattis nisi. ",
    price: 123,
  },
  {
    ownerId: 3,
    address: "456 Vivian",
    city: "Chicago",
    state: "Illinois",
    country: "United States of America",
    lat: 85.7645358,
    lng: -106.4730327,
    name: "Hpp Academy",
    description: "We are Pet Friendly!!!!!!!Welcome to the brand new Hygge Hideaway!Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis posuere magna, vel posuere sem. Vivamus aliquam faucibus tortor, ac posuere nulla vehicula pretium. Suspendisse tincidunt justo et risus dapibus tempor. Donec risus nibh, gravida a nunc eget, ullamcorper mattis nisi. ",
    price: 123,
  },
  {
    ownerId: 3,
    address: "789 Vivian",
    city: "Miami",
    state: "Florida",
    country: "United States of America",
    lat: 75.7645358,
    lng: -116.4730327,
    name: "Ipp Academy",
    description: "We are Pet Friendly!!!!!!!Welcome to the brand new Hygge Hideaway!Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis posuere magna, vel posuere sem. Vivamus aliquam faucibus tortor, ac posuere nulla vehicula pretium. Suspendisse tincidunt justo et risus dapibus tempor. Donec risus nibh, gravida a nunc eget, ullamcorper mattis nisi. ",
    price: 123,
  },
  {
    ownerId: 4,
    address: "441 Vivian",
    city: "Orlando",
    state: "Florida",
    country: "United States of America",
    lat: 71.7645358,
    lng: -106.4730327,
    name: "Jpp Academy",
    description: "We are Pet Friendly!!!!!!!Welcome to the brand new Hygge Hideaway!Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis posuere magna, vel posuere sem. Vivamus aliquam faucibus tortor, ac posuere nulla vehicula pretium. Suspendisse tincidunt justo et risus dapibus tempor. Donec risus nibh, gravida a nunc eget, ullamcorper mattis nisi. ",
    price: 123,
  },
  {
    ownerId: 4,
    address: "442 Vivian",
    city: "Tampa",
    state: "Florida",
    country: "United States of America",
    lat: 71.7645358,
    lng: -106.4730327,
    name: "Kpp Academy",
    description: "We are Pet Friendly!!!!!!!Welcome to the brand new Hygge Hideaway!Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis posuere magna, vel posuere sem. Vivamus aliquam faucibus tortor, ac posuere nulla vehicula pretium. Suspendisse tincidunt justo et risus dapibus tempor. Donec risus nibh, gravida a nunc eget, ullamcorper mattis nisi. ",
    price: 123,
  },
  {
    ownerId: 4,
    address: "443 Vivian",
    city: "Seattle",
    state: "Washington",
    country: "United States of America",
    lat: 71.7645358,
    lng: -106.4730327,
    name: "Lpp Academy",
    description: "We are Pet Friendly!!!!!!!Welcome to the brand new Hygge Hideaway!Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis posuere magna, vel posuere sem. Vivamus aliquam faucibus tortor, ac posuere nulla vehicula pretium. Suspendisse tincidunt justo et risus dapibus tempor. Donec risus nibh, gravida a nunc eget, ullamcorper mattis nisi. ",
    price: 123,
  },
]
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate(spots,{validate:true});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,{
      country:'United States of America'
    }, {});
  //  await queryInterface.bulkDelete('Spots',{},{})

  }
};
