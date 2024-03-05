const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground  = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("Database connected")
    })
    .catch(err => {
        console.log("connection error:")
        console.log(err)
    });

const sample = array => array[Math.floor(Math.random() * array.length)];








    const seedDB = async() =>{
        await Campground.deleteMany({});
        for (let i = 0; i < 50; i++){
            const random1000 = Math.floor(Math.random() * 1000);
            const price = Math.floor(Math.random() *20) + 10;
           const camp =  new Campground({
                location: `${cities[random1000].city}, ${cities[random1000].state}`,
                title: `${sample(descriptors)} ${sample(places)}`,
                image: 'http://source.unsplash.com/collection/484351',
                description: 'hello this is my first project of my web development bootcamp related to campgrounds i am going to have different description for each text and image and it will be super unique for every picture',
                price
            })
            await camp.save();
        }
          
    }
    seedDB().then(
        ()=>{
            mongoose.connection.close();
        }
    )