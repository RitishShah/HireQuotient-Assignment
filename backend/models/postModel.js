const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    caption: {
        type:String,
    },
    images: [
        {
            public_id: {
                type:String,
                required:true
            },
            url: {
                type:String,
                require:true
            }
        }
    ],
    numOfComments: {
        type:Number,
        default:0
    },
    comments:[
        {
            user: {
                type:mongoose.Schema.ObjectId,
                ref:'User',
                required:true
            },
            name: {
                type:String,
                required:true
            },
            comment: {
                type:String
            },
            time: {
                type:Date,
                default:Date.now()
            }
        }
    ],
    user: {
        type:mongoose.Schema.ObjectId,
        ref:'Users',
        // required:true
    },
    createdAt: {
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('Post', postSchema);