const mongoose = require('mongoose');

mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("Connected with MongoDB!");
}).catch((error) => {
    console.log("Error: Cannot Connect to MongoDB!!!");
});
