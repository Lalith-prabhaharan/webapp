const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv')
const app = express();

// Middleware
dotenv.config()
const connect=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Mongo Connected")
    }
    catch(error){
        console.log(error)
    }
}
mongoose.connection.on("disconnected",()=>{
    console.log("Mongo Disconnected")
})
app.use(express.json());
app.use(cors());
app.options('*',cors());

// Routes
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/courses',require('./routes/courseRoute'))
app.use('/api/feedback',require('./routes/feedbackRoute'))
app.use('/api/quiz',require('./routes/quizRoute'))

app.listen(8000, () => {
    connect()
    console.log(`Server running on port 8000`)
});
