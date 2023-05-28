const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    profilePicture: {
      type: String,
      default: ""
    },
    coverPicture: {
      type: String,
      default: ""
    },
    followers: {
      type: Array,
      default: []

    },
    following: {
      type: Array,
      fedault: []
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      default: ""
    },
    city: {
      type: String,
      max: 50
    },
    from: {
      type: String,
      max: 50
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3]
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
