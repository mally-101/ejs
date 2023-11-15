const express = require("express");
const app = express();
const port = process.env.PORT || 5050;
const morgan = require('morgan')
const mongoose = require('mongoose');
const connect = require('./db/mongoDB')
const taskRouter = require('./router/taskRouter')
require('dotenv/config')
const TASKS = require('./model/taskModel')


// custom middlewares
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true })); // to parse the incoming requests with url encoded payloads


// app.use((req,res,next)=>{
//     console.log('new request made');
//     console.log('host:', req.hostname);
//     console.log('path', req.path);
//     console.log('method',req.method);
//     next()
// })

// Testing our model and database 
// .save method is a mongoose method for saving data to database
app.get('/post-task',async(req,res)=>{
 const testData = new TASKS({
    name: 'leewhy',
    title: 'NodeMon Tuts',
    task: 'create a web dev'

 })
 try{
      const newTask = await testData.save()
      res.status(201).send(newTask)
 }catch(error){
    console.log(error);
 }

})

// .find method is a mongoose method for finding data to database

app.get('/get-post', async(req,res)=>{
    try{
        const getTasks = await TASKS.find();
        res.status(200).send(getTasks)
    }catch(error){
        console.log(error);
    }
})


// .findById method is a mongoose method for finding a specific data from our database
   app.get ('/single-task', async (req,res)=>{
    try{
        const singleTask = await TASKS.findById("65522842710c25d38420ac47");
        res.status(200).send(singleTask)
    }catch(error){
        console.log(error);
    }
   })
// end of database test

app.use(morgan('dev'))
app.use(express.static('public'))

// // routes
// app.get("/", (req, res) => {
// res.send("Welcome home")

// })

// const tasks =[
//     // {name:'Halimat',title:'halimats clothing', task:'client deliveries this morning'},
//     // {name:'Chimelu',title:'I.T experience', task:'to give my instructor my log book'},
//     // {name:'Leewhy',title:'Leewhy Concept', task:'Trading and general contracts'}
// ]


//api
app.use('/api/v1',taskRouter)
//page routes
app.get('/', async(req,res)=>{
    try{
        const result = await TASKS.find();
        res.render('index', {title:'Home || Page', tasks:result})
    }catch(error){
        console.log(error);
    }
})

app.get('/about', (req,res)=>{
    res.render('about',{title:'About || Page' })
})

app.get('/tasks', (req,res)=>{
    res.render('tasks',{title:'Task || Page' })
})

app.use( (req,res)=>{
    res.render('404',{title:'404 || Page' })
})

//db connection
connect()
.then(()=>{
    try{
      
app.listen(port, ()=>{
    console.log(`Server connected to http://localhost:${port}`);

})
    }catch(error){
        console.log('cannot connect to the server');
    }
})
.catch((error)=>{
    console.log('invalid database connection...!',error);
})