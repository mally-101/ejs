// Require mongoose
// From m ongoose, we would use a method called Schema. This defines the structure of the document that we would store in the collection. model is used to warp the schema and then sends it to the DB

const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const taskSchema = new Schema({
    name: { type: String,
           required: true
         },
    title:{
        type :String,
        required:true
    },
    task:{
        type :String,
        required: true
    }
},{timestamps:true})

// Lets create our model(Model is what surrounds the Schema ans provides us with an interface by which to communicate with our database)

const Tasks = mongoose.model('Task', taskSchema);
module.exports = Tasks
