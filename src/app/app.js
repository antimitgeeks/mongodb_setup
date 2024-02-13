const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const userRoutes = require('../routes/userRoutes');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/user');


//passport 
const session = require('express-session');  // session middleware
const passport = require('passport');  // authentication

//validate password 
const validPassword = require('../lib/passwordUtils').validPassword;



//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// session
app.use(session({
  secret: process.env.secret,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));
app.use(passport.initialize());
app.use(passport.session());




passport.use('local-signup', new LocalStrategy(
  {
    usernameField: 'userName',
    passwordField: 'email',
  },
  async (userName, password, done) => {
    try {

      const user = await User.findOne({ userName: userName });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      const isValid = validPassword(password, user.hash, user.salt);
      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    } catch (err) {
      console.log("Error:", err);
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findOne({ _id: userId });
    console.log('login users ', user);
    done(null, user);
  } catch (err) {
    done(err);
  }
});



// Use user routes
app.use('/api/v1', userRoutes);


module.exports = app;