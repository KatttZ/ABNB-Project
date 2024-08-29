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
    name: "BeachFront Loft",
    description: "We are Pet Friendly!!!!!!! On BackBeach. Stunning sunsets & spectacular views up the River Teign 2 Dartmoor. Step outside to beach, swimming. Ask to use: Kayak; small boat mooring; firepit & Bar-B-Q. Logburner Oct- thru April. Shared private patio, people watching. Award winning restaurant steps away. Ship Inn, sailing school doors away. Tranquil/vibrant depending on season. Front beach 5 minutes walk. Shaldon Ferry, Arts Quarter, town centre, a few minutes walk. Trains 10 mins walk. Dartmoor National Park under 20 miles. ",
    price: 150,
  },
  {
    ownerId: 1,
    address: "456 Disney Lane",
    city: "Los Angeles",
    state: "California",
    country: "United States of America",
    lat: 40.7645358,
    lng: -120.4730327,
    name: "Glass cottage",
    description: "We are Pet Friendly!!!!!",
    price: 160,
  },
  {
    ownerId: 2,
    address: "123 Tracy St",
    city: "Houston",
    state: "Texas",
    country: "United States of America",
    lat: 33.7645358,
    lng: -34.4730327,
    name: "Cotswolds",
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
    name: "Pinhoti Peak",
    description: "We are Pet Friendly!!!!!!!Place where web developers are createdLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis posuere magna, vel posuere sem. Vivamus aliquam faucibus tortor, ac posuere nulla vehicula pretium. Suspendisse tincidunt justo et risus dapibus tempor. Donec risus nibh, gravida a nunc eget, ullamcorper mattis nisi. ",
    price: 210,
  },
  {
    ownerId: 3,
    address: "123 Vivian",
    city: "San Jose",
    state: "California",
    country: "United States of America",
    lat: 35.7645358,
    lng: -36.4730327,
    name: "Villa Edge",
    description: "We are Pet Friendly!!!!!!!Welcome to the brand new Hygge Hideaway!Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis posuere magna, vel posuere sem. Vivamus aliquam faucibus tortor, ac posuere nulla vehicula pretium. Suspendisse tincidunt justo et risus dapibus tempor. Donec risus nibh, gravida a nunc eget, ullamcorper mattis nisi. ",
    price: 180,
  },
  {
    ownerId: 3,
    address: "456 Vivian",
    city: "Chicago",
    state: "Illinois",
    country: "United States of America",
    lat: 85.7645358,
    lng: -106.4730327,
    name: "Villa Irina",
    description: "We are Pet Friendly!!!!!!!Welcome to the brand new Hygge Hideaway!Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis posuere magna, vel posuere sem. Vivamus aliquam faucibus tortor, ac posuere nulla vehicula pretium. Suspendisse tincidunt justo et risus dapibus tempor. Donec risus nibh, gravida a nunc eget, ullamcorper mattis nisi. ",
    price: 190,
  },
  {
    ownerId: 4,
    address: "441 Vivian",
    city: "Orlando",
    state: "Florida",
    country: "United States of America",
    lat: 71.7645358,
    lng: -106.4730327,
    name: "Luxury Apartment ",
    description: "We are Pet Friendly!!!!!!!Welcome to the brand new Hygge Hideaway!Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis posuere magna, vel posuere sem. Vivamus aliquam faucibus tortor, ac posuere nulla vehicula pretium. Suspendisse tincidunt justo et risus dapibus tempor. Donec risus nibh, gravida a nunc eget, ullamcorper mattis nisi. ",
    price: 220,
  },
  {
    ownerId: 4,
    address: "442 Vivian",
    city: "Tampa",
    state: "Florida",
    country: "United States of America",
    lat: 71.7645358,
    lng: -106.4730327,
    name: "The WonderINN",
    description: "We are Pet Friendly!!!!!!!Welcome to the brand new Hygge Hideaway!Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis posuere magna, vel posuere sem. Vivamus aliquam faucibus tortor, ac posuere nulla vehicula pretium. Suspendisse tincidunt justo et risus dapibus tempor. Donec risus nibh, gravida a nunc eget, ullamcorper mattis nisi. ",
    price: 240,
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
