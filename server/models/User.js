const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// validator is a library that helps validate strings
const validator = require('validator');
const Order = require('./Order');

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: false,
    trim: true
  },
  lastName: {
    type: String,
    required: false,
    trim: true
  },
  admin: {
    // type changed from Boolean to String
    type: String,
    // enum used to define a list of possible values for the field
    // ['regular', 'admin'] to distinguish between admin and user accounts.
    enum: ['regular', 'admin'],
    required: false,
    default: 'regular'
  },  
  email: {
    type: String,
    required: true,
    unique: true,
    // validate: [validator.isEmail, 'Please enter a valid email address'] used to validate email
    // error message is displayed if validation fails
    validate: [validator.isEmail, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  orders: [Order.schema]
});

userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
