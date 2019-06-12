const express =require('express');
const path=require('path');
const exphbs=require('express-handlebars');
const methodOverride=require('method-override');
const session=require('express-session');
const flash=require('connect-flash');//envio de mensajes entre vistas

 
//inicializaciones
const app=express();
require('./database');


//settings
app.set('port',process.env.PORT || 2000);
app.set('views',path.join(__dirname,'./views'));
app.engine('.hbs',exphbs({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs',
    helpers:''

}));
    


app.set('view engine','.hbs');

//middleware

app.use(express.urlencoded({extended:false}));//cuando un formulario envie los datos
app.use(express.json());
app.use(methodOverride('_method'));//formulario envie otro tipos de metodso como put o delete
app.use(session({
    secret:'mysecretapp',
    resave:true,
    saveUninitialized:true
}));

app.use(flash());

//global variables

app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');

    next();
});


//routes
app.use(require('./routes/index'));
app.use(require('./routes/note'));
app.use(require('./routes/users'));



//archivos estaticos
app.use(express.static(path.join(__dirname,'public')));


//inicio servidor


app.listen(app.get('port'),()=>{
    console.log('Server running on port',app.get('port'));
    
});