const { Schema, model } = require("mongoose");

const postSchema = new Schema(
    {
        userID: {
            type: String,
            required: [true],
        },
        desc: {
            type: String,
            max: 500,
            default: ""
        },
        img: {
            type: String,
        },
        likes: {
            type: Array,
            default: []
        }
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

const Post = model("Post", postSchema);

module.exports = Post;
