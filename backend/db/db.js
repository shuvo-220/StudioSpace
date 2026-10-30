const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('database connected')
}).catch(()=>{
    console.log('database error')
})