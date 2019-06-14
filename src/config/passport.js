const passport =require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/users');
passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
},async(email,password,done)=>{
    const user=await User.findOne({email:email});
    if(!user){
        return done(null,false,{message:'Usuario no encontrado'});
    }
    else{
        const match=await user.matchPassword(password);
        if(match){
            return done(null,user)
        }else{
            return done(null,false,{message:'Password Incorrecto'});
        }
    }
}));


passport.serializeUser((user,done)=>{//
    done(null,user.id);
});//toma usuario y genera un id

passport.deserializeUser((id,done)=>{//toma un id y genera un usuario  
    User.findById(id,(err,user)=>{
        done(err,user);
    });
});

