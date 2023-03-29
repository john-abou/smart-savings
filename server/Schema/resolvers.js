const { AuthenticationError } = require('apollo-server-express');
const { User, Order } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
        return userData;
      }
      throw new AuthenticationError('Not logged in');
    }
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { orders: { products } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addProduct: async (parent, { name, description, price, category }, context) => {
      if (context.user) {
        const updatedOrder = await Order.findOneAndUpdate(
          { _id: context.order._id },
          { $push: { products: { name, description, price, category } } },
          { new: true }
        );
        return updatedOrder;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeProduct: async (parent, { productId }, context) => {
      if (context.user) {
        const updatedOrder = await Order.findOneAndUpdate(
          { _id: context.order._id },
          { $pull: { products: { _id: productId } } },
          { new: true }
        );
        return updatedOrder;
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;
