const router=require('express').Router();
const User=require('../models/users');
const passport=require('passport');

router.get('/users/signin',(req,res)=>{
    res.render('users/signin');
});

router.post('/users/signin',passport.authenticate('local',{
    successRedirect:'/notes',
    failureRedirect:'/users/signin',
    failureFlash:true
}));

router.get('/users/signup',(req,res)=>{
    res.render('users/signup');

});

router.post('/users/signup',async (req,res)=>{
    const {name,email,password,confirm_password}=req.body;
    let errors=[];
    if(name.length<=0){
        errors.push({text:'Ingrese Nombre'});
    }
    if(password!=confirm_password){
        errors.push({text:'Error de contrasenas, no coinciden'})
    }
    if(password.length<4){
        errors.push({text:'La contrasena debe ser minimo 4 caracteres'})
    }
    if(errors.length>0){
        res.render('users/signup',{errors,name,email,password,confirm_password})
    }else
    { 
        const emailUser=await User.findOne({email:email});
        if(emailUser){
            req.flash('error_msg','El email: '+emailUser.email+'esta en uso');
            res.redirect('/users/signup');
        }else{
        const newUser=new User({name,email,password});
        newUser.password=await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg','Tu estas registrado');
        res.redirect('/users/signin');
        } 

    }
});

router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/');
});


module.exports=router;