"use strict";

/** @type {import('sequelize-cli').Migration} */

const { SpotImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const spotImages = [
  {
    spotId: 1,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-29589886/original/6250f7c4-0869-482e-b763-4f9d73046fb1.jpeg?im_w=1200",
    preview: true,
  },
  {
    spotId: 1,
    url: "https://a0.muscache.com/im/pictures/def834ab-c5fc-4c21-9542-060aab1645bc.jpg?im_w=1200",
    preview: false,
  },
  {
    spotId: 1,
    url: "https://a0.muscache.com/im/pictures/bdf22336-a320-42ad-a21b-2bae07a4407b.jpg?im_w=1200",
    preview: false,
  },
  {
    spotId: 1,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-29589886/original/57683233-686c-43a6-9747-0a9719e070f9.png?im_w=1200",
    preview: false,
  },
  {
    spotId: 1,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-29589886/original/1eeb1c1d-1b53-42db-a86c-cc9147346b08.jpeg?im_w=1200",
    preview: false,
  },
  {
    spotId: 2,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-42164367/original/260091e1-dc9c-4025-b13f-98a4e5fa74ff.jpeg?im_w=960",
    preview: true,
  },
  {
    spotId: 2,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-42164367/original/770745c2-30ad-4df1-9c68-a000f5bd787f.jpeg?im_w=1200",
    preview: false,
  },
  {
    spotId: 2,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-42164367/original/30c8cc73-adcf-4833-babd-bd1e83c62c17.jpeg?im_w=1200",
    preview: false,
  },
  {
    spotId: 2,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-42164367/original/604acf56-1c12-4ef4-8579-2616a91fc9e7.jpeg?im_w=1200",
    preview: false,
  },
  {
    spotId: 2,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-42164367/original/f2d572d3-acac-4935-8b28-b8b2e3093942.jpeg?im_w=1200",
    preview: false,
  },
  {
    spotId: 3,
    url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6Mjc4MzIwOTU%3D/original/f59e8dd5-d3e9-4ff3-978d-d2ace98fa736.jpeg?im_w=1200",
    preview: true,
  },
  {
    spotId: 3,
    url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6Mjc4MzIwOTU%3D/original/d9632827-bdaf-4b70-a6aa-3d7cb7bdb0ea.jpeg?im_w=1200",
    preview: false,
  },
  {
    spotId: 3,
    url: "https://a0.muscache.com/im/pictures/13c10027-0845-4d39-9361-ccc11e582115.jpg?im_w=1200",
    preview: false,
  },
  {
    spotId: 3,
    url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6Mjc4MzIwOTU%3D/original/573a737b-8d1c-44fc-ae60-40673637c0db.jpeg?im_w=1200",
    preview: false,
  },
  {
    spotId: 3,
    url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6Mjc4MzIwOTU%3D/original/da9c5fe5-0f92-4da1-8e74-03b0e64c08ac.jpeg?im_w=1200",
    preview: false,
  },
  {
    spotId: 4,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-994705019179094048/original/63567164-da95-4cad-aea0-25c33bdf1ba3.jpeg?im_w=960",
    preview: true,
  },
  {
    spotId: 4,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-994705019179094048/original/c465fa9d-1043-462c-a898-846027d7cd4b.jpeg?im_w=1200",
    preview: false,
  },
  {
    spotId: 4,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-994705019179094048/original/fc2e038d-853b-4534-ad55-df60d3942f34.jpeg?im_w=1200",
    preview: false,
  },
  {
    spotId: 4,
    url: "https://a0.muscache.com/im/pictures/4eea9afb-4df0-4adc-8cd4-737d9711c43b.jpg?im_w=1200",
    preview: false,
  },
  {
    spotId: 4,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-994705019179094048/original/e1c4dd75-6474-41a8-a812-2a774711b6b7.jpeg?im_w=1200",
    preview: false,
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/6f23833f-a42b-4e99-8205-7a22b1da4d66.jpg?im_w=960",
    preview: true,
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/70e9b636-29ba-406d-bcb1-e11d783e135b.jpg?im_w=1200",
    preview: false,
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/a4c20667-1fd8-47dd-bedd-f91c025c1a5a.jpg?im_w=1200",
    preview: false,
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/55a2213c-922f-4ba4-b6e7-19f83fe2302d.jpg?im_w=1200",
    preview: false,
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/0e162efd-3fc3-49ac-bcb6-25251b17fc69.jpg?im_w=1200",
    preview: false,
  },
  {
    spotId: 6,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-886278728116055542/original/c92f5261-1093-4a24-922b-a4a6d85879a4.jpeg?im_w=1200",
    preview: true,
  },
  {
    spotId: 6,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-886278728116055542/original/889a2ab2-f5cf-488e-9ac9-cb3a8d91c221.jpeg?im_w=1200",
    preview: false,
  },
  {
    spotId: 6,
    url: "https://a0.muscache.com/im/pictures/be9e9e34-9ff7-4146-b3bf-09235c2d3333.jpg?im_w=1200",
    preview: false,
  },
  {
    spotId: 6,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-886278728116055542/original/e2392c34-10b7-41fa-9ba5-619c99d9444c.jpeg?im_w=1200",
    preview: false,
  },
  {
    spotId: 6,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-886278728116055542/original/a5b91b57-712e-4a79-9b86-5e5eb23ccf6a.jpeg?im_w=1200",
    preview: false,
  },
  {
    spotId: 7,
    url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE2MDI1MjE0MjMxMzgxMzI1MA%3D%3D/original/8543766e-08ee-4401-9c8c-5a32c213a5f5.jpeg?im_w=1200",
    preview: true,
  },
  {
    spotId: 7,
    url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE2MDI1MjE0MjMxMzgxMzI1MA%3D%3D/original/9903f8a9-63a3-4138-b680-8df92c859ce2.jpeg?im_w=1200",
    preview: false,
  },
  {
    spotId: 7,
    url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE2MDI1MjE0MjMxMzgxMzI1MA%3D%3D/original/0ae11aa5-1312-4929-881e-a36d7757d65d.jpeg?im_w=1200",
    preview: false,
  },
  {
    spotId: 7,
    url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE2MDI1MjE0MjMxMzgxMzI1MA%3D%3D/original/3aa2f5b9-2c13-4f33-a590-fc6914189a0e.jpeg?im_w=1200",
    preview: false,
  },
  {
    spotId: 7,
    url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE2MDI1MjE0MjMxMzgxMzI1MA%3D%3D/original/6c539622-75db-4fdc-819b-d0a8cd6ed1e7.jpeg?im_w=1200",
    preview: false,
  },
  {
    spotId: 8,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-923862125538251337/original/33eb5ffc-c3c1-4bac-8050-8a7d4a9b2376.jpeg?im_w=1200",
    preview: true,
  },
  {
    spotId: 8,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-34444025/original/e45468ce-0827-48d6-8514-bbd7c3d6b857.jpeg?im_w=1200",
    preview: false,
  },
  {
    spotId: 8,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-34444025/original/1959e567-1c4f-4282-a622-2ef34f345364.jpeg?im_w=1200",
    preview: false,
  },
  {
    spotId: 8,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-34444025/original/9631c8e7-5e10-4949-b672-4f28115f26df.jpeg?im_w=1200",
    preview: false,
  },
  {
    spotId: 8,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-923862125538251337/original/08b8b614-4906-49f4-b442-b633772c327d.jpeg?im_w=1200",
    preview: false,
  },
];
module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(spotImages, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, spotImages, {});
  },
};
