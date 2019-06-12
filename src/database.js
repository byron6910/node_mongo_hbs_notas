const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/note-db-app',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
}).then(db=>console.log('DB connected'))
.catch(err=>console.error(err));