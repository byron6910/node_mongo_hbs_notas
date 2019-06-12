const router=require('express').Router();
const Note=require('../models/notes');

router.get('/notes',async (req,res)=>{
    const notes=await Note.find().sort({date:-1});

    res.render('notes/all-notes',{notes});
});

router.get('/notes/add',(req,res)=>{
    res.render('notes/add');
});
router.post('/notes/add',async (req,res)=>{
    const {title,description} =req.body;
    const errors=[];
    if(!title){
        errors.push({text:'Por favor ingrese el titulo'});
    }
    if(!description){
        errors.push({text:'Por favor ingrese description'})
    }
    if(errors.length>0){
        res.render('notes/add',{
            errors,title,description
        });
    }else{
        const newNote=new Note({title,description});
        console.log(newNote);
        await newNote.save();
        req.flash('success_msg','Nota agregada exitosamente');
        res.redirect('/notes');

    }

});

router.get('/notes/edit/:id',async (req,res)=>{
    
    const note=await Note.findById(req.params.id);
    res.render('notes/edit-notes',{note})
});

router.put('/notes/edit/:id',async (req,res)=>{
    const {title,description}=req.body;
    const newNote=await Note.findByIdAndUpdate(req.params.id,{title,description});
    req.flash('success_msg','Nota Actualizada Satisfactoriamente')
    res.redirect('/notes');
});

router.delete('/notes/delete/:id',async(req,res)=>{
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Eliminado Satisfactoriamente')
    res.redirect('/notes');
});

module.exports=router;