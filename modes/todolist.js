const mongoose = require('mongoose');

const todolistSchema = new mongoose.Schema({
    task:{
        type:String,
    },
    status:{
        type:Boolean,
        default: false,
    }
})

const todo = mongoose.model("todo", todolistSchema);
module.exports = todo;