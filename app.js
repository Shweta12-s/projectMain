if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}






const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors(
    {
        origin: ["https://deploy-mern-1whq.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
    ));
const path = require('path');

mongoose.connect('mongodb+srv://<username>:<shweta@1>@cluster0.3z07bqf.mongodb.net/shweta?retryWrites=true&w=majority&appName=Cluster0

const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const Joi = require('joi'); 
const {campgroundSchema, reviewSchema} = require('./schemas.js');
const catchAsync=  require('./utils/catchAsync');




const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');



const userRoutes = require('./routes/users');
const Campground  = require('./views/models/campground');
const Review = require('./views/models/review');
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews.js');


const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./views/models/user');
// mongoose.connect('mongodb://localhost:27017/yelp-camp',{
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// });









mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("Database connected")
    })
    .catch(err => {
        console.log("connection error:")
        console.log(err)
    })
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));










const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }

}
app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{
    console.log(req.session)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes);

app.use('/campgrounds/:id/reviews', reviewRoutes);
app.get('/', (req,res)=>{
    res.render('home')
});

// app.get('/fakeUser', async(req, res)=>{
//     const user= new User({email: 'shweta@gmail.com', username: 'shwetaaa'})
//    const newUser = await  User.register(user, 'chicken')
//    res.send(newUser);
// })









app.all('*', (req,res,next)=>{
   
    next(new ExpressError('Page not found', 404))
})


app.use((err,req,res,next)=>{
    const {statusCode= 500, message='Something went wrong'}= err;
    if(!err.message) err.message = 'Ohhhhh no something went wrong!'
    res.status(statusCode).render('error', {err});
    // res.send("Oh boy! Something went wrong!!!")
})

app.listen(3000, ()=>{
    console.log("Serving on port 3000")
})

