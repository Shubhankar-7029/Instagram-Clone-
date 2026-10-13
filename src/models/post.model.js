const monogoose = require('mongoose');



const postSchema = new monogoose.Schema({   
    caption: {
        type: String,
       default: ""
    },
    imageUrl: {
        type: String,
        required: [true, "Image is required"]
    },
    user: {
        type: monogoose.Schema.Types.ObjectId,
        ref: "Users",
        required: [true, "User is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = monogoose.model("Post", postSchema);
