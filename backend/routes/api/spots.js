const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { where, Op } = require('sequelize');
const { UPDATE } = require('sequelize/lib/query-types');
const router = express.Router();

//added validation of spot
const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage("Country is required"),
    check('lat')
        .exists({ checkFalsy: true })
        .isFloat({ min: -90, max: 90 })
        .withMessage("Latitude is not valid"),
    check('lng')
        .exists({ checkFalsy: true })
        .isFloat({ min: -180, max: 180 })
        .withMessage("Longitude is not valid"),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage("Name must be less than 50 characters")
        .isLength({ max: 50 })
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .isFloat({ min: 0 })
        .withMessage("Price per day must be a positive number"),
    handleValidationErrors
];

const spotsInfo = async (spots) => {
    const res = [];
    for (let i = 0; i < spots.length; i++) {
      // check reviews
      const spot = spots[i];
      const reviews = await Review.findAll({ where: { spotId: spot.id } });
      const totalRating = reviews.reduce((acc, el) => acc + el.stars, 0);
      const avgStarRating = totalRating / reviews.length;
  
      // check images
      const img = await SpotImage.findOne({
        where: { spotId: spot.id, preview: true },
      });
  
      let previewImage = null;
      if (img) {
        previewImage = img.url;
      }
  
      res.push({
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        numReviews: reviews.length,
        avgStarRating, //placeholder
        previewImage, //placeholder
        // SpotImages: spot.SpotImages,
        // Owner: spot.User,
      });
    }
    return res;
  };
//Get all Spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll({

        include: [
            {model: Review, attributes:['stars'],},
            {model: SpotImage, attributes:['url']}
        ]      
    });

    return res.json({
        Spots: await spotsInfo(spots)
    })

});

//Get all Spots owned by the Current User
router.get('/current', async (req, res) => {
    const id = req.user.id;
    const currentSpots = await Spot.findAll({
        where: { id }
    })
    

    return res.json({
        Spots: await spotsInfo(currentSpots)
    })

});

//Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params;

    const spot = await Spot.findByPk(spotId)

    if (!spot){
        return res.status(404).json(
            {
                message: "Spot couldn't be found"
              }
        )
    }

    const reviews = await Review.findAll({ where: { spotId: spot.id } });
    const totalRating = reviews.reduce((acc, el) => acc + el.stars, 0);
    const avgStarRating = totalRating / reviews.length;

    // check images
    const img = await SpotImage.findOne({
      where: { spotId: spot.id, preview: true },
    });

    let previewImage = null;
    if (img) {
      previewImage = img.url;
    }


    const newSpot ={
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        numReviews: reviews.length,
        avgStarRating, //placeholder
        previewImage, //placeholder
        SpotImages: spot.SpotImages,
        Owner: spot.User,
      };


    return res.json(newSpot)
});


//Create a Spot
router.post('/', requireAuth, validateSpot, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = await Spot.create({
        ownerId: req.user.id,
        address, city, state, country, lat, lng, name, description, price
    })

    return res.status(201).json(spot)

});

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res)=>{
    const {spotId} = req.params;
    const spot = await Spot.findByPk(spotId);

    if (!spot){
        return res.status(404).json(
            {
                message: "Spot couldn't be found"
              }
        )
    }

    const currentId = req.user.id;
    if (currentId !== spot.ownerId){
        return res.status(403).json({
            message:'Forbidden'
        })

    }

    const {url, preview} = req.body;

    const newImage = await SpotImage.create({
        id:spotId,
        url:url,
        preview:preview
    })

    return res.status(201).json(newImage)
})

//Edit a Spot
router.put('/:spotId', requireAuth, async (req, res)=>{
    const {spotId} = req.params;
    const spot = await Spot.findByPk(spotId);
    if (!spot){
        return res.status(404).json(
            {
                message: "Spot couldn't be found"
              }
        )
    }

    const currentId = req.user.id;
    if (currentId !== spot.ownerId){
        return res.status(403).json({
            message:'Forbidden'
        })
    }

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

   if(address) spot.address = address;
   if(city) spot.city = city;
   if(state) spot.state = state;
   if(country) spot.country = country;
   if(lat) spot.let = lat;
   if(lng) spot.lng = lng;
   if(name) spot.name = name;
   if(description) spot.description = description;
   if(price) spot.price = price;

   await spot.save();
   return res.status(200).json(spot)
})

router.delete('/:spotId',requireAuth, async (req, res)=>{

    const {spotId} = req.params;
    const spot = await Spot.findByPk(spotId);
    if (!spot){
        return res.status(404).json(
            {
                message: "Spot couldn't be found"
              }
        )
    }

    const currentId = req.user.id;
    if (currentId !== spot.ownerId){
        return res.status(403).json({
            message:'Forbidden'
        })
    }

    await spot.destroy();

    return res.status(200).json(
        {
            message: "Successfully deleted"
          }
    )
})
module.exports = router;