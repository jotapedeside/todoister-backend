const mongoose = require('mongoose');

mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("Connected with MongoDB!");
}).catch((error) => {
    console.log(error);
    console.log("Error: Cannot Connect to MongoDB!!!");
});

var taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: false
    }
},  {
    collection: 'tasks',
    timestamps: true
    }
);

module.exports = {Mongoose: mongoose, taskSchema: taskSchema}