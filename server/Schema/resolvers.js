const { AuthenticationError } = require('apollo-server-express');
const { User, Order, Product } = require('../models');
const { signToken } = require('../utils/auth');

const { searchAmazon } = require('../utils/scrape/searchAmazon');
const { searchWal } = require('../utils/scrape/searchWal');
const { searchLoblaws } = require('../utils/scrape/searchLoblaws');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },

    products: async () => {
      const productData = await Product.find();
      return productData;
    },
    getProductById: async (parent, { _id }) => { 
      return await Product.findById(_id );
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
    },

    appendCompetitiorPriceHistory: async (parent, { productId }, context) => {
      const amazonLink = await Product.findOne({ _id: productId }).select('AmazonHistory.link');
      const walmartLink = await Product.findOne({ _id: productId }).select('WalmartHistory.link');
      const loblawsLink = await Product.findOne({ _id: productId }).select('LoblawsHistory.link');

      const amazonPrice = await searchAmazon(amazonLink.AmazonHistory.link);
      console.log(amazonPrice);
      const walmartPrice = await searchWal(walmartLink.WalmartHistory.link);
      console.log(walmartPrice);
      const loblawsPrice = await searchLoblaws(loblawsLink.LoblawsHistory.link);
      console.log(loblawsPrice);

      // find one and add
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: productId },
        {
          $addToSet: {
            "AmazonHistory.priceHistory": { price: amazonPrice },
            "WalmartHistory.priceHistory": { price: walmartPrice },
            "LoblawsHistory.priceHistory": { price: loblawsPrice }
          }
        },
        { new: true });

      return updatedProduct;

    }
  }
};

module.exports = resolvers;
