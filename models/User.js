const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    // TODO: create username field
    username: [
      {
        type: String,
        required: true,
        unique: true,
        trimmed: true,
      },
    ],

    // TODO: create email field
    email: [
      {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function (v) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
          },
          message: "Please enter a valid email",
        },
      },
    ],
    
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
