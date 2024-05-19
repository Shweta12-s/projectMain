const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground  = require('../views/models/campground');

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
            author: '6602f4d63db63a460d20fcf0',
                location: `${cities[random1000].city}, ${cities[random1000].state}`,
                title: `${sample(descriptors)} ${sample(places)}`,
                
                description: 'hello this is my first project of my web development bootcamp related to campgrounds i am going to have different description for each text and image and it will be super unique for every picture',
                price,
                images:  [
                    {
                      url: 'https://res.cloudinary.com/duumzw5ww/image/upload/v1712731346/yelpCamp/opvyr6j5rx82dpdefplw.png',
                      filename: 'yelpCamp/opvyr6j5rx82dpdefplw',
                      
                    },
                    {
                      url: 'https://res.cloudinary.com/duumzw5ww/image/upload/v1712731347/yelpCamp/mbsul8bbbpaxjzwfj7i8.png',
                      filename: 'yelpCamp/mbsul8bbbpaxjzwfj7i8',
                      
                    },
                    {
                      url: 'https://res.cloudinary.com/duumzw5ww/image/upload/v1712731347/yelpCamp/mcuxyg4cfzdufcmmst68.png',
                      filename: 'yelpCamp/mcuxyg4cfzdufcmmst68',
                      
                    },
                    {
                      url: 'https://res.cloudinary.com/duumzw5ww/image/upload/v1712731347/yelpCamp/oif7kucvkmzw9otgr0km.png',
                      filename: 'yelpCamp/oif7kucvkmzw9otgr0km',
                      
                    },
                    {
                      url: 'https://res.cloudinary.com/duumzw5ww/image/upload/v1712731348/yelpCamp/jqpa8akfp12fttwb5itx.png',
                      filename: 'yelpCamp/jqpa8akfp12fttwb5itx',
                      
                    }
                  ]
            })
            await camp.save();
        }
          
    }
    seedDB().then(
        ()=>{
            mongoose.connection.close();
        }
    )