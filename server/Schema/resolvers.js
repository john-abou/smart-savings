const { AuthenticationError } = require('apollo-server-express');
const { User, Order, Product } = require('../models/index');
const { signToken } = require('../utils/auth');

const { searchAmazon } = require('../utils/scrape/searchAmazon');
const { searchWal } = require('../utils/scrape/searchWal');
const { searchLoblaws } = require('../utils/scrape/searchLoblaws');

const stripe = require('stripe')('sk_test_51N8755L91T6XpsIhJ7fwddYdsIIjVUmCsLe00ECx1vrYFBEVaDXbU0J7CUyrgTccjWwlvJncmom551xtKSa8sgZ900BXygd0we');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      try {
          const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
          console.log('After if');
          return userData;
      } catch (error) {
        console.log(error);
      }
      // throw new AuthenticationError('Not logged in');
    },

    products: async () => {
      const productData = await Product.find();
      return productData;
    },
    getProductById: async (parent, { _id }) => { 
      return await Product.findById(_id );
    },
    users: async () => {
      const userData = await User.find();
      return userData; 
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const { products } = await order.populate('products');
      const line_items = [];

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`]
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: 'cad',
        }); 

        console.log('stripe price', price);
        console.log('stripe product', product);

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    }
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      console.log('User object returned from logging in', user)
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const { firstName, _id } = user;
      const token = signToken({ firstName, email, _id });
      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const { firstName, email, _id } = user;
      const token = signToken({ firstName, email, _id });
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
    addProduct: async (parent, args) => {
  
        const addProduct = await Product.create(args);
        return addProduct;
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
    updateUser:
      async (parent, { _id, isAdmin }, context) => {
        console.log('Update user', context.user)
        /*
        const { firstName, lastName, email, password } = user;
        console.log('resolver login', user);
        const token = signToken({ firstName, lastName, email, password}); */
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id },
            { $set: { admin: isAdmin } },
            { new: true }
          );
          return updatedUser;
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

    },

    updateProduct: async (parent, { productId, name, description, price, quantity }, context) => {

      const updatedProduct = await Product.findOneAndUpdate(
        { _id: productId },
        { $set: { name, description, price, quantity } },
        { new: true }
      );
      return updatedProduct;
    },

    deleteProduct: async (parent, { productId }, context) => {
      const deleteProduct = await Product.findOneAndDelete(
        { _id: productId },
        { new: true }
      );
      return deleteProduct;
    }

  }
};

module.exports = resolvers;
