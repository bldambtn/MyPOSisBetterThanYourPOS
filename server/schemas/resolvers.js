const { Item, User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    hello: () => "Hello, World!",
    getItems: async () => {
      try {
        return await Item.find();
      } catch (err) {
        console.error("❌ Error fetching items:", err);
        return [];
      }
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user;
      }

      throw new AuthenticationError("Not authenticated");
    },
  },
  Mutation: {
    addUser: async (parent, { firstName, lastName, username, organization, email, password }) => {
      const user = await User.create({ firstName, lastName, username, organization, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
